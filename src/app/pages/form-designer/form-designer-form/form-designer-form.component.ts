import {Component, OnInit} from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {FormDto} from '../../../dtos/form/form-dto';
import {FormTabDto} from '../../../dtos/form/form-tab-dto';
import {BaseDTO} from '../../../dtos/common/base-dto';
import {FormArea} from '../../../dtos/form/form-area';
import {FormControlFieldDTO} from '../../../dtos/form/form-control-field-d-t-o';
import {ComponentPersistEntityDTO} from '../../../dtos/component/component-persist-entity-dto';
import {ComponentPersistEntityFieldDTO} from '../../../dtos/component/component-persist-entity-field-dto';
import {FormControlDto} from '../../../dtos/form/form-control-dto';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {FormScript} from '../../../dtos/form/form-script';
import {ActivatedRoute} from '@angular/router';
import {FormControlTableDTO} from '../../../dtos/form/form-control-table-d-t-o';
import {FormControlTableControlDTO} from '../../../dtos/form/form-control-table-control-d-t-o';
import {
  ComponentPersistEntityFieldAssignmentDTO
} from '../../../dtos/component/component-persist-entity-field-assignment-dto';
import {Location} from '@angular/common';
import {FormDesignerService} from '../../../services/crud/form-designer.service';
import {TableComponentDesignerService} from '../../../services/crud/table-component-designer.service';
import {FormControlButtonDTO} from '../../../dtos/form/form-control-button-dto';
import {FormPopupDto} from '../../../dtos/form/form-popup-dto';
import {FormActionButton} from '../../../dtos/form/form-action-button';
import {FormCss} from '../../../dtos/form/form-css';
import {UserService} from '../../../services/crud/user.service';
import {AccessControlDto} from '../../../dtos/security/access-control-dto';
import {RoleService} from '../../../services/crud/role.service';
import 'brace';
import 'brace/mode/javascript';
import 'brace/mode/css';
import 'brace/mode/text';
import 'brace/theme/github';
import 'brace/theme/chrome'
import {AceConfigInterface} from 'ngx-ace-wrapper';
import {TagDesignerService} from '../../../services/crud/tag-designer.service';
import {TagDTO} from '../../../dtos/tag/tag-dto';


@Component({
  selector: 'app-form-designer-form',
  templateUrl: './form-designer-form.component.html',
  styleUrls: ['./form-designer-form.component.css']
})
export class FormDesignerFormComponent extends PageComponent implements OnInit {

  public aceJavascriptEditorConfig: AceConfigInterface = {
    mode: 'javascript',
    theme: 'github',
    readOnly : false
  };

  public aceCSSEditorConfig: AceConfigInterface = {
    mode: 'css',
    theme: 'chrome',
    readOnly : false
  };

  public mode: string;
  public dto: FormDto;
  public description: string;
  public selectedFormSection: any;
  public selectedFormArea: FormArea = new FormArea();
  public selectedformScript: FormScript;
  public selectedformCss: FormCss;
  public selectedFormControl: FormControlDto = new FormControlDto();
  public selectedTableFormControl: FormControlDto = new FormControlDto();
  public selectedTableVisibleComponentPersistEntityList: ComponentPersistEntityDTO[] = [];
  public selectedComponentPersistEntityField: ComponentPersistEntityFieldDTO = new ComponentPersistEntityFieldDTO();
  public selectedTableComponentPersistEntityField: ComponentPersistEntityFieldDTO = new ComponentPersistEntityFieldDTO();
  public selectedComponentPersistEntity: ComponentPersistEntityDTO = new ComponentPersistEntityDTO();
  public selectedFormControlTableControl: FormControlTableControlDTO = new FormControlTableControlDTO();
  public components: any;
  public tagsList: Array<TagDTO>;
  public roles: any;
  public visibleSection = 'settings';
  public selectedTableButtonFormControl: FormControlTableControlDTO = new FormControlTableControlDTO();
  public selectedTblFormControlButton: FormControlButtonDTO = new FormControlButtonDTO();
  public selectedTblButtonFormControl: FormControlDto = new FormControlDto();
  public selectedButtonFormControl: FormControlDto = new FormControlDto();
  public selectedActionButton: FormActionButton
  private selectedSecurityRow: AccessControlDto;

  constructor(private service: FormDesignerService,
              private tableComponentService: TableComponentDesignerService,
              private userService: UserService,
              private roleService: RoleService,
              private navigatorService: CommandNavigatorService,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private tagDesignerService: TagDesignerService) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.dto = new FormDto();
    this.mode = 'new-record';

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.service.getById(id).subscribe(dto => {
        this.dto = dto;
        this.cleanIdsIfCloneEnabled();
        this.setAssignmentsToComponents();
        this.assignComponentFieldsToFormFields();
        this.setDefaultSelectedTabs();
        this.setDefaultSelectedFormScript();
        this.setDefaultSelectedFormCss();
        this.formScriptsFromBase64();

      });
    } else {
      this.addFormTab();
      this.addFormArea(this.selectedFormSection);
      this.setDefaultSelectedTabs();
      this.setDefaultSelectedFormScript();
      this.setDefaultSelectedFormCss();
      this.formScriptsFromBase64();
      this.setDefaultActionButtons();
    }

    this.refreshComponents();

  }



  cleanIdsIfCloneEnabled() {
    if (this.params.has('TYPE')) {
      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {

        this.dto.id = null;
        this.dto.version = null;
        this.dto.instanceVersion = 0;

        this.cleanAssignmentIdsIfCloneEnabled(this.dto.component.componentPersistEntityList);

        for (const row of this.dto.formScripts) {
          row.id = null;
          row.version = null;
        }

        for (const row of this.dto.formCssList) {
          row.id = null;
          row.version = null;
        }

        for (const row of this.dto.formActionButtons) {
          row.id = null;
          row.version = null;
          for (const row2 of row.formActionButtons) {
            row2.id = null;
            row2.version = null;
          }
        }

        const formSections = this.dto.formTabs.concat(this.dto.formPopups);
        for (const formTab of formSections) {
          formTab.id = null;
          formTab.version = null;
          for (const formArea of formTab.formAreas) {
            formArea.id = null;
            formArea.version = null;
            for (const formControl of formArea.formControls) {
              formControl.id = null;
              formControl.version = null;
              if (formControl.type === 'field') {
                formControl.formControlField.id = null;
                formControl.formControlField.version = null;
              } else if (formControl.type === 'button') {
                formControl.formControlButton.id = null;
                formControl.formControlButton.version = null;
              } else if (formControl.type === 'table') {
                formControl.formControlTable.id = null;
                formControl.formControlTable.version = null;
                for (const formControlButton of formControl.formControlTable.formControlButtons) {
                  formControlButton.id = null;
                  formControlButton.version = null;
                  formControlButton.formControlButton.id = null;
                  formControlButton.formControlButton.version = null;
                }
                for (const tblFormControl of formControl.formControlTable.formControls) {
                  tblFormControl.id = null;
                  tblFormControl.version = null;
                  tblFormControl.formControlField.id = null;
                  tblFormControl.formControlField.version = null;

                }
              }

            }
          }
        }

        this.mode = 'new-record';
      }
    }
  }

  cleanAssignmentIdsIfCloneEnabled(componentPersistEntityList: ComponentPersistEntityDTO[]) {

    if (componentPersistEntityList == null) {
      return;
    }

    for (const cpe of componentPersistEntityList) {
      for (const cpef of cpe.componentPersistEntityFieldList) {
        cpef.assignment.id = null;
        cpef.assignment.version = null;
      }

      if (cpe.componentPersistEntityList != null) {
        this.cleanAssignmentIdsIfCloneEnabled(cpe.componentPersistEntityList);
      }
    }
  }

  assignComponentFieldsToFormFields() {
    const formSections = this.dto.formTabs.concat(this.dto.formPopups);
    for (const formTab of formSections) {
      for (const formArea of formTab.formAreas) {
        for (const formControl of formArea.formControls) {
          if (formControl.type === 'field') {
            const componentPersistEntityField =
              this.getComponentPersistEntityFieldByCodeOnTree(this.dto.component.componentPersistEntityList,
                formControl.formControlField.componentPersistEntityField.id);
            formControl.formControlField.componentPersistEntityField = componentPersistEntityField;
          } else if (formControl.type === 'table') {
            this.assignControlToFormControlTable(formControl);
          }
        }
      }
    }
  }

  assignControlToFormControlTable(formControlDto: FormControlDto) {
    for (const componentPersistEntity of this.dto.component.componentPersistEntityList) {
      if (componentPersistEntity.id === formControlDto.formControlTable.componentPersistEntity.id) {
        formControlDto.formControlTable.componentPersistEntity = componentPersistEntity;
        formControlDto.formControlTable.componentPersistEntity.multiDataLine = true;
      }
    }
  }

  getComponentPersistEntityFieldByCodeOnTree(componentPersistEntityList: ComponentPersistEntityDTO[], fieldId) {
    for (const componentPersistEntity of componentPersistEntityList) {
      for (const componentPersistEntityField of componentPersistEntity.componentPersistEntityFieldList) {
        if (componentPersistEntityField.id === fieldId) {
          return componentPersistEntityField;
        }
      }
      if (componentPersistEntity.componentPersistEntityList != null) {
        const componentPersistEntityField =
          this.getComponentPersistEntityFieldByCodeOnTree(componentPersistEntity.componentPersistEntityList, fieldId);
        if (componentPersistEntityField != null) {
          return componentPersistEntityField;
        }
      }
    }
    return null;
  }

  refreshComponents() {
    this.tableComponentService.get().subscribe(data => {
      this.components = data;
    });

    this.roleService.get().subscribe(data => {
      this.roles = data;
    });

    this.tagDesignerService.get().subscribe(data => {
      this.tagsList = data;
    });
  }

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }

  newTabKeyDown(event: KeyboardEvent, description: string) {
    if (event.key === 'Enter' && this.description !== '') {
      this.addFormTab();
      this.description = '';
    }
  }

  addFormTab() {
    this.selectedFormSection = new FormTabDto();
    this.selectedFormSection.shortOrder = this.getNextShortOrder(this.dto.formTabs);
    this.selectedFormSection.description = 'Tab' + this.selectedFormSection.shortOrder;
    this.selectedFormSection.editable = true;
    this.dto.formTabs.push(this.selectedFormSection);
  }

  addFormPopup() {
    this.selectedFormSection = new FormPopupDto();
    this.selectedFormSection.shortOrder = this.getNextShortOrder(this.dto.formPopups);
    this.selectedFormSection.description = 'popup' + this.selectedFormSection.shortOrder;
    this.selectedFormSection.code = 'popup' + this.selectedFormSection.shortOrder;
    this.selectedFormSection.editable = true;
    if (this.dto.formPopups == null) {
      this.dto.formPopups = [];
    }
    this.dto.formPopups.push(this.selectedFormSection);
  }

  selectFormSection(formTab: FormTabDto) {
    this.selectedFormSection = formTab;
  }

  setDefaultSelectedTabs() {
    this.selectedFormSection = null;
    this.selectedFormArea = null;

    if (this.dto.formTabs.length > 0) {
      this.selectedFormSection = this.dto.formTabs[0];
    } else {
      return;
    }

    if (this.selectedFormSection.formAreas.length > 0) {
      this.selectedFormArea = this.selectedFormSection.formAreas[0];
    }
  }

  setDefaultSelectedPopups() {
    this.selectedFormSection = null;
    this.selectedFormArea = null;

    if (this.dto.formPopups.length > 0) {
      this.selectedFormSection = this.dto.formPopups[0];
    } else {
      return;
    }

    if (this.selectedFormSection.formAreas.length > 0) {
      this.selectedFormArea = this.selectedFormSection.formAreas[0];
    }
  }


  removeFormTabs(dto: FormTabDto) {
    if (dto !== undefined && this.dto.formTabs !== undefined) {
      this.dto.formTabs =
        this.dto.formTabs.filter(item => item !== dto);
    }
    this.setDefaultSelectedTabs();
  }

  removeFormPopups(dto: FormPopupDto) {
    if (dto !== undefined && this.dto.formPopups !== undefined) {
      this.dto.formPopups =
        this.dto.formPopups.filter(item => item !== dto);
    }
    this.setDefaultSelectedPopups();
  }


  removeFormAreas(dto: any) {
    if (dto !== undefined && this.selectedFormSection.formAreas !== undefined) {
      this.selectedFormSection.formAreas =
        this.selectedFormSection.formAreas.filter(item => item !== dto);
    }
  }

  getNextShortOrder(baseDTOs: BaseDTO[]) {
    if (baseDTOs === null
      || baseDTOs === undefined
      || baseDTOs.length === 0) {
      return 1;
    }

    const curShortOrderObject = baseDTOs.reduce(function (prev, curr) {
      return prev.shortOrder < curr.shortOrder ? curr : prev;
    });

    return (curShortOrderObject.shortOrder + 1);
  }

  defineShortOrders(baseDTOs: BaseDTO[]) {
    if (baseDTOs === null
      || baseDTOs === undefined
      || baseDTOs.length === 0) {
      return;
    }
    let shortOrder = 1;
    baseDTOs.forEach(baseDTO => {
      baseDTO.shortOrder = shortOrder;
      shortOrder++;
    });
  }

  addFormArea(formTab: any) {
    this.selectedFormArea = new FormArea();
    this.selectedFormArea.shortOrder = this.getNextShortOrder(formTab.formAreas);
    this.selectedFormArea.title = 'Area' + this.selectedFormArea.shortOrder;
    this.selectedFormArea.cssclass = 'col-12';
    formTab.formAreas.push(this.selectedFormArea);
  }

  selectFormArea(formArea: FormArea) {
    this.selectedFormArea = formArea;
  }

  hideChildren(item) {
    item.showFieldList = false;
  }

  showChildren(item) {
    item.showFieldList = true;
  }

  selectComponent(selectedComponent) {
    this.tableComponentService.getById(selectedComponent.id).subscribe(data => {
      this.dto.component = data;
      this.setAssignmentsToComponents();
    });
  }

  selectTag(selectedTag: TagDTO) {
   // const tag: TagDTO = new TagDTO(selectedTag.title, selectedTag.color);
    if(this.dto.tags == null){
      this.dto.tags = [];
    }
    this.dto.tags.push(selectedTag);
  }

  selectRole(role) {
    this.selectedSecurityRow.role = role;
  }

  setAssignmentsToComponents() {
    if (this.dto.component !== null) {
      this.setAssignmentsToComponentsTree(this.dto.component.componentPersistEntityList);
    }
  }

  setAssignmentsToComponentsTree(componentPersistEntityList: ComponentPersistEntityDTO[]) {
    componentPersistEntityList.forEach(componentPersistEntity => {
      componentPersistEntity.componentPersistEntityFieldList.forEach(componentPersistEntityField => {
        if (componentPersistEntityField.assignment === null) {
          componentPersistEntityField.assignment = new ComponentPersistEntityFieldAssignmentDTO();
          componentPersistEntityField.assignment.type = componentPersistEntityField.persistEntityField.type;
        }
        if (componentPersistEntity.componentPersistEntityList != null) {
          this.setAssignmentsToComponentsTree(componentPersistEntity.componentPersistEntityList);
        }
      });
    });
  }

  addTable(row: ComponentPersistEntityDTO) {
    const formControlTableDTO = new FormControlTableDTO();
    const formControlDto = new FormControlDto();
    formControlDto.formControlField = null;
    formControlDto.formControlButton = null;
    formControlDto.formControlTable = formControlTableDTO;
    formControlDto.formControlTable.componentPersistEntity = row;
    formControlDto.formControlTable.visible = true;
    formControlDto.formControlTable.editable = true;
    formControlDto.formControlTable.required = false;
    formControlDto.formControlTable.description = row.code;
    formControlDto.type = 'table';

    formControlDto.shortOrder = this.getNextShortOrder(this.selectedFormArea.formControls);
    formControlDto.cssclass = 'col-12';
    this.selectedFormArea.formControls.push(formControlDto);
  }

  addField(componentPersistEntity: ComponentPersistEntityDTO, componentPersistEntityField: ComponentPersistEntityFieldDTO) {
    const formControlFieldDTO = new FormControlFieldDTO();
    formControlFieldDTO.editable = true;
    formControlFieldDTO.visible = true;
    formControlFieldDTO.required = false;
    const formControlDto = new FormControlDto();
    formControlDto.formControlTable = null;
    formControlDto.formControlButton = null;
    formControlDto.formControlField = formControlFieldDTO;
    formControlDto.formControlField.componentPersistEntity = componentPersistEntity;
    formControlDto.formControlField.componentPersistEntityField = componentPersistEntityField;
    formControlDto.formControlField.description = formControlDto.formControlField.componentPersistEntityField.persistEntityField.name;
      formControlDto.type = 'field';
    formControlDto.shortOrder = this.getNextShortOrder(this.selectedFormArea.formControls);
    formControlDto.cssclass = 'col-12';
    this.selectedFormArea.formControls.push(formControlDto);
  }

  addButton() {
    const formControlButton = new FormControlButtonDTO();
    formControlButton.icon = 'fa-search';
    formControlButton.visible = true;
    formControlButton.code = '';
    formControlButton.description = 'Button';
    formControlButton.editor = '';
    formControlButton.cssClass = 'btn-outline-success';
    const formControlDto = new FormControlDto();
    formControlDto.formControlTable = null;
    formControlDto.formControlField = null;
    formControlDto.formControlButton = formControlButton;
    formControlDto.type = 'button';
    formControlDto.shortOrder = this.getNextShortOrder(this.selectedFormArea.formControls);
    formControlDto.cssclass = 'col-2';
    this.selectedFormArea.formControls.push(formControlDto);
  }

  save() {
    const dtoToBeSaved = JSON.parse(JSON.stringify(this.dto));

    this.defineShortOrders(dtoToBeSaved.formTabs);
    this.defineShortOrders(dtoToBeSaved.form);
    const formSections = dtoToBeSaved.formTabs.concat(dtoToBeSaved.formPopups);
    formSections.forEach(formSection => {
      this.defineShortOrders(formSection.formAreas);
      formSection.formAreas.forEach(formArea => {
        this.defineShortOrders(formArea.formControls);
        formArea.formControls.forEach(formControl => {
          if (formControl.type === 'table') {
            this.defineShortOrders(formControl.formControlTable.formControls);
            this.defineShortOrders(formControl.formControlTable.formControlButtons);
          }
        });
      });
    });

    this.formScriptsToBase64(dtoToBeSaved);

    if (this.mode === 'edit-record') {
      this.service.update(dtoToBeSaved).subscribe(data => {
        this.location.back();
      });
    } else {
      this.service.save(dtoToBeSaved).subscribe(data => {
        this.location.back();
      });
    }
  }

  formScriptsToBase64(dto) {
    dto.formScripts.forEach(formScript => {
      const encodedScrypt = btoa(formScript.script);
      formScript.script = encodedScrypt;
    });

    dto.formCssList.forEach(formScript => {
      const encodedScrypt = btoa(formScript.script);
      formScript.script = encodedScrypt;
    });

  }

  formScriptsFromBase64() {
    this.dto.formScripts.forEach(formScript => {
      const decodedScrypt = atob(formScript.script);
      formScript.script = decodedScrypt;
    });

    this.dto.formCssList.forEach(formScript => {
      const decodedScrypt = atob(formScript.script);
      formScript.script = decodedScrypt;
    });
  }


  delete() {
    this.service.delete(this.dto.id).subscribe(data => {
      this.navigatorService.closeAndBack(this.pageId);
    });
  }

  showPreviousPageButton() {
    if (this.previousPage === null) {
      return false;
    } else {
      return true;
    }
  }

  navigateToPreviousPage() {
    this.navigatorService.navigateToPreviousPage(this.pageId);
  }

  navigateToNextPage() {
    this.navigatorService.navigateToNextPage(this.pageId);
  }

  showNextPageButton() {
    if (this.nextPage === null) {
      return false;
    } else {
      return true;
    }
  }

  addScript() {
    const formScript = new FormScript();
    formScript.shortOrder = this.getNextShortOrder(this.dto.formScripts);
    formScript.name = 'Script' + formScript.shortOrder;
    this.dto.formScripts.push(formScript);
    this.setDefaultSelectedFormScript();
  }

  addCss() {
    if (this.dto.formCssList == null) {
      this.dto.formCssList = [];
    }
    const formCss = new FormCss();
    formCss.shortOrder = this.getNextShortOrder(this.dto.formCssList);
    formCss.name = 'Css Script ' + formCss.shortOrder;
    this.dto.formCssList.push(formCss);
    this.setDefaultSelectedFormCss();
  }


  removeEntityFormList(entity: any, list: any[]) {
    list =
      list.filter(item => item !== entity);
    return list;
  }

  removeFormScriptByField(formScript: FormScript) {
    this.dto.formScripts =
      this.dto.formScripts.filter(item => item !== formScript);
  }

  removeFormCssByField(formCss: FormCss) {
    this.dto.formCssList =
      this.dto.formCssList.filter(item => item !== formCss);
  }

  setDefaultActionButtons() {
    this.dto.formActionButtons = [];

    let dto = new FormActionButton();
    dto.editor = '#saveAndBack#';
    dto.visible = true;
    dto.editable = true;
    dto.description = 'Save';
    dto.cssClass = 'btn-outline-success';
    dto.shortOrder = this.genNextShortOrder(this.dto.formActionButtons);
    dto.code = 'ab_' + dto.shortOrder;
    dto.icon = 'fa-save';
    this.dto.formActionButtons.push(dto);

    dto = new FormActionButton();
    dto.editor = '#delete#';
    dto.visible = true;
    dto.editable = true;
    dto.description = 'Delete';
    dto.cssClass = 'btn-outline-danger';
    dto.shortOrder = this.genNextShortOrder(this.dto.formActionButtons);
    dto.code = 'ab_' + dto.shortOrder;
    dto.icon = 'fa-times';
    this.dto.formActionButtons.push(dto);
  }

  setDefaultSelectedFormScript() {
    if (this.selectedformScript != null) {
      return;
    }
    if (this.dto.formScripts != null && this.dto.formScripts.length > 0) {
      this.selectedformScript = this.dto.formScripts[0];
    }
  }

  setDefaultSelectedFormCss() {
    if (this.selectedformCss != null) {
      return;
    }
    if (this.dto.formCssList != null && this.dto.formCssList.length > 0) {
      this.selectedformCss = this.dto.formCssList[0];
    }
  }


  setSelectedFormScript(formScript: FormScript) {
    this.selectedformScript = formScript;
  }

  setSelectedFormCss(formCss: FormCss) {
    this.selectedformCss = formCss;
  }

  moveUp(baseDTO: BaseDTO, baseDTOs: BaseDTO[]): any {
    let position = 0;
    for (const listBaseDTO of baseDTOs) {
      if (baseDTO === listBaseDTO && position > 0) {
        const prevItem = baseDTOs[position - 1];
        baseDTOs[position] = prevItem;
        baseDTOs[position - 1] = listBaseDTO;
      }
      position++;
    }

    let shortOrder = 0;
    for (const listBaseDTO of baseDTOs) {
      listBaseDTO.shortOrder = shortOrder;
      shortOrder++;
    }

    return baseDTOs;
  }

  moveDown(baseDTO: BaseDTO, baseDTOs: BaseDTO[]): any[] {
    let position = 0;
    for (const listBaseDTO of baseDTOs) {
      if (baseDTO === listBaseDTO && (position + 1) < baseDTOs.length) {
        const nextItem = baseDTOs[position + 1];
        baseDTOs[position] = nextItem;
        baseDTOs[position + 1] = listBaseDTO;
        break;
      }
      position++;
    }

    let shortOrder = 0;
    for (const listBaseDTO of baseDTOs) {
      listBaseDTO.shortOrder = shortOrder;
      shortOrder++;
    }

    return baseDTOs;
  }

  setSelectedTableParentFormControl(formControlDto: FormControlDto) {
    this.selectedTableFormControl = formControlDto;
    this.selectedTableVisibleComponentPersistEntityList = [];
    this.selectedTableVisibleComponentPersistEntityList.push(this.selectedTableFormControl.formControlTable.componentPersistEntity);
  }

  setSelectedFormControl(formControlDto: FormControlDto) {

    this.selectedFormControl = formControlDto;
    this.setSelectedComponentPersistEntityField(formControlDto.formControlField.componentPersistEntityField);
    this.setSelectedComponentPersistEntity(formControlDto.formControlField.componentPersistEntity);
  }

  setSelectedComponentPersistEntityField(componentPersistEntityField: ComponentPersistEntityFieldDTO) {
    this.selectedComponentPersistEntityField = componentPersistEntityField;
  }

  setSelectedComponentPersistEntity(componentPersistEntity: ComponentPersistEntityDTO) {
    this.selectedComponentPersistEntity = componentPersistEntity;
  }

  setSelectedTableFormControl(selectedFormControlTableControl: FormControlTableControlDTO) {
    this.selectedFormControlTableControl = selectedFormControlTableControl;
    this.selectedTableComponentPersistEntityField =
      selectedFormControlTableControl.formControlField.componentPersistEntityField;
    this.setSelectedComponentPersistEntity(selectedFormControlTableControl.formControlField.componentPersistEntity);
  }

  addFieldToTable(componentPersistEntity: ComponentPersistEntityDTO, componentPersistEntityField: ComponentPersistEntityFieldDTO) {
    const formControlFieldDTO = new FormControlFieldDTO();
    formControlFieldDTO.editable = true;
    formControlFieldDTO.visible = true;
    formControlFieldDTO.required = false;
    formControlFieldDTO.headerFilter = false;

    const formControlDto = new FormControlTableControlDTO();
    formControlDto.formControlButton = null;
    formControlDto.formControlField = formControlFieldDTO;
    formControlDto.formControlField.componentPersistEntity = componentPersistEntity;
    formControlDto.formControlField.componentPersistEntityField = componentPersistEntityField;
    formControlDto.type = 'field';

    formControlDto.shortOrder = this.getNextShortOrder(this.selectedFormControl.formControlTable.formControls);
    formControlDto.cssclass = 'col-12';
    this.selectedTableFormControl.formControlTable.formControls.push(formControlDto);
  }

  addButtonToTable() {
    if (this.selectedTableFormControl.formControlTable.formControlButtons == null) {
      this.selectedTableFormControl.formControlTable.formControlButtons = [];
    }

    const formControlbuttonDTO = new FormControlButtonDTO();
    formControlbuttonDTO.icon = 'fa-search';
    formControlbuttonDTO.visible = true;
    formControlbuttonDTO.code = '';
    formControlbuttonDTO.description = '';
    formControlbuttonDTO.editor = '';
    formControlbuttonDTO.cssClass = 'btn-outline-success';

    const formControlDto = new FormControlTableControlDTO();
    formControlDto.formControlButton = formControlbuttonDTO;
    formControlDto.formControlField = null;
    formControlDto.type = 'button';
    formControlDto.cssclass = 'col-12';
    formControlDto.shortOrder = this.getNextShortOrder(this.selectedFormControl.formControlTable.formControlButtons);

    this.selectedTableFormControl.formControlTable.formControlButtons.push(formControlDto);
  }

  setSelectedTableButtonFormControl(formControlButtonTableControl: FormControlTableControlDTO,
                                    formControlButton: FormControlButtonDTO,
                                    formControlDto: FormControlDto) {
    this.selectedTableButtonFormControl = formControlButtonTableControl;
    this.selectedTblFormControlButton = formControlButton;
    this.selectedTblButtonFormControl = formControlDto;
  }

  setSelectedFormControlButton(formControlDto: FormControlDto) {
    this.selectedButtonFormControl = formControlDto;
  }

  setSelectedButtonFormControl(formControlDto: FormControlDto) {
    this.selectedTblButtonFormControl = formControlDto;
  }

  removeActionButton(formActionButtons: FormActionButton[], column) {
    formActionButtons =
      formActionButtons.filter(item => item !== column);
    return formActionButtons;
  }

  removeAccessControl(securityList: AccessControlDto[], column) {
    securityList =
      securityList.filter(item => item !== column);
    return securityList;
  }

  addActionButton(formActionButtons: FormActionButton[]) {
    if (formActionButtons == null) {
      formActionButtons = [];
    }

    const dto = new FormActionButton();
    dto.editor = '';
    dto.visible = true;
    dto.editable = true;
    dto.description = '';
    dto.cssClass = 'btn-outline-success';
    dto.shortOrder = this.genNextShortOrder(formActionButtons);
    dto.code = 'ab_' + dto.shortOrder;
    dto.icon = 'fa-search';
    formActionButtons.push(dto);
    //  console.log(formActionButtons);
    return formActionButtons;
  }

  addRuleButton(securityList: AccessControlDto[]) {
    if (securityList == null) {
      securityList = [];
    }

    const dto = new AccessControlDto();
    dto.role = null;
    dto.createEntity = false;
    dto.updateEntity = false;
    dto.readEntity = false;
    dto.deleteEntity = false;
    dto.type = 'form';
    dto.entityId = this.dto.id;

    securityList.push(dto);

    return securityList;
  }

  genNextShortOrder(componentsList: any[]) {
    if (componentsList === null
      || componentsList === undefined
      || componentsList.length === 0) {
      return 1;
    }

    const curShortOrderObject = componentsList.reduce(function (prev, curr) {
      return prev.shortOrder < curr.shortOrder ? curr : prev;
    });

    return (curShortOrderObject.shortOrder + 1);
  }

  setSelectedActionButton(actionButton: FormActionButton) {
    this.selectedActionButton = actionButton;
  }

  setSelectedSecurityRow(securityRow: AccessControlDto) {
    this.selectedSecurityRow = securityRow;
  }

  deleteTagChipsLine(tag: TagDTO) {
    this.dto.tags =
      this.dto.tags.filter(item => item !== tag);
  }

  addSampleScript(menu: string) {
      if(menu == 'tblNewLine'){
        this.selectedformScript.script +=
          '\n\nnativeTableButtonNewLineHandler(table, added){\n' +
          '    if(table.componentPersistEntity.code == \'your_persist_entity_code\' && added == false){\n' +
          '                this.formRef.formScriptsService.notificationDialog(\'top\', \'center\', \'alert-info\', \'fa-exclamation-triangle\', \'<b>Empty Fields</b> Field <b> "Your field name" </b> is required, fill it before adding a new line!\');\n' +
          '    }\n' +
          '}';
      } else if (menu == 'tblBtnClick'){
        this.selectedformScript.script +=

          '\n\ntable_btn_`your_button_code`_click(formControlTable, dataLine){\n}';
      } else if(menu == 'btnClick'){
        this.selectedformScript.script +=
          '\n\nbtn_`your_button_code`_click(){\n}';
      } else if(menu == 'headerButtonSave'){
        this.selectedformScript.script +=
          '\n\nbtn_`your_button_code`_click()\n' +
          '{\n' +
          '    /* Required Fields Check */\n'+
          '\n' +
          '    var code= this.getFieldValue(\'your_persist_entity.code\');\n' +
          '    var name= this.getFieldValue(\'your_persist_entity.name\');\n' +
          '    var type= this.getFieldValue(\'your_persist_entity.type_id\');\n' +
          '\n' +
          '    var emptyFieldNames = \'\';  \n' +
          '\n' +
          '    if( code == null || code == \'\' || code == 0 ) {\n' +
          '        var formFields = this.getFormFieldsByCode(\'your_persist_entity.code\');\n' +
          '        formFields [0][\'formControlField\'][\'message\'] = \'<div class="required-empty">* Required Field</div>\';\n' +
          '        emptyFieldNames = \'Code\';\n' +
          '    }\n' +
          '\n' +
          '    if( name == null || name == \'\' || name == 0 ) {\n' +
          '        var formFields = this.getFormFieldsByCode(\'your_persist_entity.name\');\n' +
          '        formFields [0][\'formControlField\'][\'message\'] = \'<div class="required-empty">* Required Field</div>\';\n' +
          '        if(emptyFieldNames == \'\') emptyFieldNames = \'Name\';\n' +
          '        else emptyFieldNames += \' ,Name\';\n' +
          '    }\n' +
          '\n' +
          '    if( type == null || type == \'\' || type == 0 ) {\n' +
          '        var formFields = this.getFormFieldsByCode(\'your_persist_entity.type_id\');\n' +
          '        formFields [0][\'formControlField\'][\'message\'] = \'<div class="required-empty">* Required Field</div>\';\n' +
          '        if(emptyFieldNames == \'\') emptyFieldNames = \'Type\';\n' +
          '        else emptyFieldNames += \' ,Type\';\n' +
          '    }\n' +
          '    \n' +
          '    if(code == null || code == \'\' || code == 0 || \n' +
          '       name == null || name == \'\' || name == 0 ||\n' +
          '       type == null || type == \'\' || type == 0 ) {\n' +
          '       this.notificationDialogRef(\'top\', \'center\', \'alert-danger\', \'fa-exclamation\',\'<b>Empty Filed(s)!</b>&emsp;Fields  [<b>\'+ emptyFieldNames  + \'</b>] are empty, fill them before you Save!\');\n' +
          '        return;\n' +
          '    }\n' +
          '\n' +
          '    /* Save */\n'+
          '\n' +
          '    this.saveFormData(\n' +
          '         (newId) => {\n' +
          '                window.history.back();\n' +
          '        }\n' +
          '    );\n' +
          '}';
      }else if(menu == 'popup_search'){
        this.selectedformScript.script += '';
      } else if (menu == 'filter_ip_on_field_typing'){
        this.selectedformScript.script +=
          '\n\non_field_input(event){\n' +
          '    \n' +
          '    if(event.target.value == null || event.target.value == \'\'){\n' +
          '        return;\n' +
          '    }\n' +
          '    \n' +
          '    var match = event.target.value.match(/([0-9]|\\.)$/g);\n' +
          '    if( match == null ) {\n' +
          '         event.target.value = event.target.value.substring(0, event.target.value.length-1);\n' +
          '    }\n' +
          '}\n' +
          '\n' +
          'on_field_focusout(event){\n' +
          '    var formFields = this.getFormFieldsByCode(\'field\');\n' +
          '    formFields[0][\'formControlField\'][\'message\'] = \'<div>* The ip must be on 000.000.000.000 format.</div>\';\n' +
          '    \n' +
          '    var match = event.target.value.match(/^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$/g);\n' +
          '    if( match == null ) {\n' +
          '        formFields[0][\'formControlField\'][\'message\'] = \'<div class="ip-not-corrent">* The ip format is not correct. The ip must be on 000.000.000.000 format.</div>\';\n' +
          '    } else {\n' +
          '        formFields[0][\'formControlField\'][\'message\'] = \'<div class="ip-corrent">* The ip format is correct.</div>\';\n' +
          '    }\n' +
          '}'
      }

  }

  assignPredifinedFieldType(fieldType: string) {
    if(fieldType == 'combo'){
      this.selectedComponentPersistEntityField.assignment.type = 'combo';
      this.selectedComponentPersistEntityField.assignment.editor = '{"data":[{"value":"null","display": "---"},{"value": "value1","display": "value1"}]}';
    }

    if(fieldType == 'list'){
      this.selectedComponentPersistEntityField.assignment.type = 'list';
      this.selectedComponentPersistEntityField.assignment.editor =
        "{\"COMMAND-TYPE\":\"POPUPLIST\",\"LOCATE\":\"(ID=list_id)\",\"RETURN\":\"cf_id\",\"FOCUS\":\"header-filter-cf_name\",\"DISPLAY\":\"(table_code.name_name)\",\"REFRESH\":\"table_code\",\"HIDE-DELETE\":\"YES\"}";

    }

 }
}
