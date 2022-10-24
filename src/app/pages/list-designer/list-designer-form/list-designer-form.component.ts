import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ListDTO} from '../../../dtos/list/list-dto';
import {ListComponentFieldDTO} from 'app/dtos/list/list-component-field-d-t-o';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {PageComponent} from '../../page/page-component';
import {ComponentPersistEntityFieldDTO} from '../../../dtos/component/component-persist-entity-field-dto';
import {ComponentPersistEntityDTO} from '../../../dtos/component/component-persist-entity-dto';
import {Location} from '@angular/common';
import {ListActionButton} from '../../../dtos/list/list-action-button';
import {ListDesignerService} from '../../../services/crud/list-designer.service';
import {TableComponentDesignerService} from '../../../services/crud/table-component-designer.service';
import {FormScript} from '../../../dtos/form/form-script';
import {FormCss} from '../../../dtos/form/form-css';
import {ListCssDTO} from '../../../dtos/list/list-css-dto';
import {ListScriptDTO} from '../../../dtos/list/list-script-dto';
import {BaseDTO} from '../../../dtos/common/base-dto';
import {AccessControlDto} from '../../../dtos/security/access-control-dto';
import {RoleService} from '../../../services/crud/role.service';
import 'brace';
import 'brace/mode/javascript';
import 'brace/mode/css';
import 'brace/mode/text';
import 'brace/theme/github';
import 'brace/theme/chrome';
import {AceConfigInterface} from 'ngx-ace-wrapper';
import {BusinessUnitDesignerService} from '../../../services/crud/business-unit-designer.service';
import {BusinessUnitDTO} from '../../../dtos/business-unit/business-unit-dto';

@Component({
  selector: 'app-list-designer-form',
  templateUrl: './list-designer-form.component.html',
  styleUrls: ['./list-designer-form.component.css']
})
export class ListDesignerFormComponent extends PageComponent implements OnInit {

  public aceJavascriptEditorConfig: AceConfigInterface = {
    mode: 'javascript',
    theme: 'github',
    readOnly: false
  };

  public aceCSSEditorConfig: AceConfigInterface = {
    mode: 'css',
    theme: 'chrome',
    readOnly: false
  };

  public components: any;
  public businessUnitsList: Array<BusinessUnitDTO>;
  public selectedFilterField: ListComponentFieldDTO;

  public dto: ListDTO;
  showAllFieldsDiv: Boolean = false;

  shortOrder = 0;
  public tableExists = false;

  public mode: string;
  title = 'appBootstrap';

  public visibleSection = 'settings';
  public roles: any;
  public isCollapsed = false;
  public selectedListScript: ListScriptDTO;
  public selectedListCss: ListCssDTO;
  public selectedActionButton: ListActionButton;
  public selectedListComponentActionField: ListComponentFieldDTO;
  private selectedSecurityRow: AccessControlDto;

  constructor(private activatedRoute: ActivatedRoute,
              private tableComponentService: TableComponentDesignerService,
              private service: ListDesignerService,
              private router: Router,
              private location: Location,
              private roleService: RoleService,
              private navigatorService: CommandNavigatorService,
              private businessUnitDesignerService: BusinessUnitDesignerService) {
    super();
  }

  ngOnInit(): void {
    this.selectedFilterField = new ListComponentFieldDTO();

    this.initNav(this.activatedRoute);

    let id = '0';
    this.dto = new ListDTO();
    this.mode = 'new-record';

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.service.getById(id).subscribe(data => {
        this.dto = data;
        this.partsFromBase64();
        this.cleanIdsIfCloneEnabled();
      });
    } else {
      this.setDefaults();
    }

    this.refreshComponents();
    this.refreshBusinessUnit();
  }

  setDefaults() {
    this.dto.hasPagination = false;
    this.dto.hasMaxSize = false;
    this.dto.autoRun = false;
    this.dto.filterVisible = false;
    this.dto.listVisible = false;
    this.dto.autoRun = true;
    this.dto.defaultPage = 'list';
    this.dto.headerFilters = true;
    this.dto.exportExcel = false;

    this.dto.listActionButtons = [];
    const dto = new ListActionButton();
    dto.editor = 'FORM[LOCATE:(ID=0)]';
    dto.visible = true;
    dto.description = 'New';
    dto.cssClass = 'btn-outline-success';
    dto.shortOrder = this.genNextShortOrder(this.dto.listActionButtons);
    dto.code = 'ab_' + dto.shortOrder;
    dto.icon = 'fa-plus-circle';
    this.dto.listActionButtons.push(dto);
  }

  cleanIdsIfCloneEnabled() {
    if (this.params.has('TYPE')) {
      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {

        this.dto.id = null;
        this.dto.version = null;
        this.dto.instanceVersion = 0;

        for (const row of this.dto.listActionButtons) {
          row.id = null;
          row.version = null;
          if (row.listActionButtons != null) {
            for (const row2 of this.dto.listActionButtons) {
              row2.id = null;
              row2.version = null;
            }
          }
        }

        for (const row of this.dto.listComponentColumnFieldList) {
          row.id = null;
          row.version = null;
        }

        for (const row of this.dto.listComponentFilterFieldList) {
          row.id = null;
          row.version = null;
        }

        for (const row of this.dto.listComponentLeftGroupFieldList) {
          row.id = null;
          row.version = null;
        }

        for (const row of this.dto.listComponentTopGroupFieldList) {
          row.id = null;
          row.version = null;
        }

        for (const row of this.dto.listComponentOrderByFieldList) {
          row.id = null;
          row.version = null;
        }

        for (const row of this.dto.listComponentActionFieldList) {
          row.id = null;
          row.version = null;
          if (row.listComponentActionFieldList != null) {
            for (const row2 of row.listComponentActionFieldList) {
              row2.id = null;
              row2.version = null;
            }
          }
        }

        for (const row of this.dto.listScripts) {
          row.id = null;
          row.version = null;
        }

        for (const row of this.dto.listCssList) {
          row.id = null;
          row.version = null;
        }

        for (const row of this.dto.accessControls) {
          row.id = null;
          row.version = null;
        }

        this.mode = 'new-record';
      }
    }
  }

  refreshComponents() {
    this.tableComponentService.get().subscribe(data => {
      this.components = data;
    });

    this.roleService.get().subscribe(data => {
      this.roles = data;
    });
  }

  refreshBusinessUnit() {
      this.businessUnitDesignerService.get().subscribe(data => {
        this.businessUnitsList = data;
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

  save() {
    this.updateShortOrders();

    const dtoToBeSaved: ListDTO = JSON.parse(JSON.stringify(this.dto));
    this.partsToBase64(dtoToBeSaved);

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

  updateShortOrders() {
    this.dto.listComponentColumnFieldList.forEach((x, index) => {
      x.shortOrder = index;
    });

    this.dto.listComponentFilterFieldList.forEach((x, index) => {
      x.shortOrder = index;
    });

    this.dto.listComponentLeftGroupFieldList.forEach((x, index) => {
      x.shortOrder = index;
    });

    this.dto.listComponentTopGroupFieldList.forEach((x, index) => {
      x.shortOrder = index;
    });

    this.dto.listComponentOrderByFieldList.forEach((x, index) => {
      x.shortOrder = index;
    });

    this.dto.listComponentActionFieldList.forEach((x, index) => {
      x.shortOrder = index;
    });
  }

  partsToBase64(dto: ListDTO) {
    dto.listScripts.forEach(listScript => {
      const encodedScrypt = btoa(listScript.script);
      listScript.script = encodedScrypt;
    });

    dto.listCssList.forEach(listScript => {
      const encodedScrypt = btoa(listScript.script);
      listScript.script = encodedScrypt;
    });

    if (dto.listComponentColumnFieldList != null) {
      dto.listComponentColumnFieldList.forEach(x => {
        x.editor = btoa((x.editor === null ? '' : x.editor));
      });
    }

    if (dto.listComponentFilterFieldList != null) {
      dto.listComponentFilterFieldList.forEach(x => {
        x.editor = btoa((x.editor === null ? '' : x.editor));
      });
    }

    if (dto.listComponentLeftGroupFieldList != null) {
      dto.listComponentLeftGroupFieldList.forEach(x => {
        x.editor = btoa((x.editor === null ? '' : x.editor));

      });
    }

    if (dto.listComponentTopGroupFieldList != null) {
      dto.listComponentTopGroupFieldList.forEach(x => {
        x.editor = btoa((x.editor === null ? '' : x.editor));
      });
    }
  }

  partsFromBase64() {
    this.dto.listScripts.forEach(listScript => {
      const decodedScrypt = atob(listScript.script);
      listScript.script = decodedScrypt;
    });

    this.dto.listCssList.forEach(listScript => {
      const decodedScrypt = atob(listScript.script);
      listScript.script = decodedScrypt;
    });

    this.dto.listComponentColumnFieldList.forEach(f => {
      const decodedEditor = atob(f.editor);
      f.editor = decodedEditor;
    });

    this.dto.listComponentTopGroupFieldList.forEach(f => {
      const decodedEditor = atob(f.editor);
      f.editor = decodedEditor;
    });

    this.dto.listComponentLeftGroupFieldList.forEach(f => {
      const decodedEditor = atob(f.editor);
      f.editor = decodedEditor;
    });

    this.dto.listComponentFilterFieldList.forEach(f => {
      const decodedEditor = atob(f.editor);
      f.editor = decodedEditor;
    });
  }

  delete() {
    this.service.delete(this.dto.id).subscribe(data => {
      this.navigatorService.closeAndBack(this.pageId);
    });
  }

  selectComponent(selectedComponent) {
    this.dto.component = selectedComponent;
    this.dto.listComponentActionFieldList = [];
    this.dto.listComponentColumnFieldList = [];
    this.dto.listComponentFilterFieldList = [];
    this.dto.listComponentLeftGroupFieldList = [];
    this.dto.listComponentOrderByFieldList = [];
    this.dto.listComponentTopGroupFieldList = [];
  }

  selectBusinessUnit(selectedBusinessUnit: BusinessUnitDTO) {
    this.dto.businessUnit = selectedBusinessUnit?.title;
  }

  hideChildren(item) {
    item.showFieldList = false;
  }

  showChildren(item) {
    item.showFieldList = true;
  }

  addFieldToColumns(row: ComponentPersistEntityDTO, field: ComponentPersistEntityFieldDTO) {
    const dto = new ListComponentFieldDTO();
    dto.editor = field.editor;
    dto.componentPersistEntity = row;
    dto.componentPersistEntityField = field;
    dto.visible = true;
    dto.required = false;
    dto.editable = false;
    dto.headerFilter = true;
    if (['varchar', 'text'].includes(field.persistEntityField.type)) {
      dto.operator = 'like';
    } else {
      dto.operator = '=';
    }
    dto.description = field.persistEntityField.name;
    dto.type = 'field';
    dto.shortOrder = this.genNextShortOrder(this.dto.listComponentColumnFieldList);
    dto.code = this.genNextComponentCode(this.dto.listComponentColumnFieldList, 'cf_' + field.persistEntityField.name);
    dto.formulaType = 'column';
    this.dto.listComponentColumnFieldList.push(dto);
  }

  // addFormulaFieldToFilters() {
  //   const dto = new ListComponentFieldDTO();
  //   dto.editor = '';
  //   dto.componentPersistEntity = null
  //   dto.componentPersistEntityField = null;
  //   dto.visible = true;
  //   dto.editable = false;
  //   dto.required = false;
  //   dto.description = '';
  //   dto.type = '';
  //   dto.shortOrder = this.genNextShortOrder(this.dto.listComponentFilterFieldList);
  //   dto.code = 'f_' + dto.shortOrder;
  //   dto.bclass = 'col-12';
  //   this.dto.listComponentFilterFieldList.push(dto);
  // }

  addCommandFormulaFieldToColumns() {
    const dto = new ListComponentFieldDTO();
    dto.editor = '';
    dto.componentPersistEntity = null
    dto.componentPersistEntityField = null;
    dto.visible = true;
    dto.editable = false;
    dto.required = false;
    dto.description = '';
    dto.type = '';
    dto.shortOrder = this.genNextShortOrder(this.dto.listComponentColumnFieldList);
    dto.code = 'command_field' + dto.shortOrder;
    dto.formulaType = 'command';
    this.dto.listComponentColumnFieldList.push(dto);
  }

  addSqlFormulaFieldToColumns() {
    const dto = new ListComponentFieldDTO();
    dto.editor = '';
    dto.componentPersistEntity = null
    dto.componentPersistEntityField = null;
    dto.visible = true;
    dto.editable = true;
    dto.required = false;
    dto.headerFilter = false;
    dto.operator = '=';
    dto.description = '';
    dto.type = '';
    dto.shortOrder = this.genNextShortOrder(this.dto.listComponentColumnFieldList);
    dto.code = 'sqlf_' + dto.shortOrder;
    dto.formulaType = 'sql';
    this.dto.listComponentColumnFieldList.push(dto);
  }

  addSqlFormulaFieldToLeftGroup() {
    const dto = new ListComponentFieldDTO();
    dto.editor = '';
    dto.componentPersistEntity = null
    dto.componentPersistEntityField = null;
    dto.visible = true;
    dto.editable = true;
    dto.required = false;
    dto.headerFilter = false;
    dto.operator = '=';
    dto.description = '';
    dto.type = '';
    dto.shortOrder = this.genNextShortOrder(this.dto.listComponentLeftGroupFieldList);
    dto.code = 'sqlgf_' + dto.shortOrder;
    dto.formulaType = 'sql';
    this.dto.listComponentLeftGroupFieldList.push(dto);
  }

  addSqlFormulaFieldToTopGroup() {
    const dto = new ListComponentFieldDTO();
    dto.editor = '';
    dto.componentPersistEntity = null
    dto.componentPersistEntityField = null;
    dto.visible = true;
    dto.editable = true;
    dto.required = false;
    dto.headerFilter = false;
    dto.operator = '=';
    dto.description = '';
    dto.type = '';
    dto.shortOrder = this.genNextShortOrder(this.dto.listComponentTopGroupFieldList);
    dto.code = 'sqltgf_' + dto.shortOrder;
    dto.formulaType = 'sql';
    this.dto.listComponentTopGroupFieldList.push(dto);
  }

  addActionField(listComponentActionFieldList: ListComponentFieldDTO[]) {
    if (listComponentActionFieldList == null) {
      listComponentActionFieldList = [];
    }
    const dto = new ListComponentFieldDTO();
    dto.editor = '';
    dto.componentPersistEntity = null
    dto.componentPersistEntityField = null;
    dto.visible = true;
    dto.editable = false;
    dto.required = false;
    dto.description = '';
    dto.type = 'list';
    dto.shortOrder = this.genNextShortOrder(listComponentActionFieldList);
    dto.code = 'af_' + dto.shortOrder;
    dto.defaultValue = 'fa-search';
    dto.bclass = 'btn-outline-success';
    listComponentActionFieldList.push(dto);
    return listComponentActionFieldList;
  }

  addActionButton(listActionButtons: ListActionButton[]) {
    if (listActionButtons == null) {
      listActionButtons = [];
    }
    const dto = new ListActionButton();
    dto.editor = '';
    dto.visible = true;
    dto.description = '';
    dto.cssClass = 'btn-outline-success';
    dto.shortOrder = this.genNextShortOrder(listActionButtons);
    dto.code = 'ab_' + dto.shortOrder;
    dto.icon = 'fa-search';
    listActionButtons.push(dto);

    return listActionButtons;
  }

  addFieldToFilters(row: ComponentPersistEntityDTO, field: ComponentPersistEntityFieldDTO) {
    const dto = new ListComponentFieldDTO();
    dto.editor = field.editor;
    dto.componentPersistEntity = row;
    dto.componentPersistEntityField = field;
    dto.visible = true;
    dto.editable = false;
    dto.required = false;
    dto.operator = '=';
    dto.description = field.persistEntityField.name;
    dto.type = field.persistEntityField.type;
    dto.shortOrder = this.genNextShortOrder(this.dto.listComponentFilterFieldList);
    dto.code = this.genNextComponentCode(this.dto.listComponentFilterFieldList, 'ft_' + field.persistEntityField.name);
    dto.bclass = 'col-12';

    this.dto.listComponentFilterFieldList.push(dto);
  }

  genNextComponentCode(componentsList: any[], newCode: string) {
    let prefixCount = 0;
    let code = newCode;

    while (true) {
      let codeAlreadyExists = false;
      for (const currentComponent of componentsList) {
        if (currentComponent.code === code) {
          codeAlreadyExists = true;
        }
      }

      if (codeAlreadyExists === false) {
        return code;
      }
      prefixCount++;
      code = newCode + '_' + prefixCount;
    }
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

  addFieldToLeftGrouping(row: ComponentPersistEntityDTO, field: ComponentPersistEntityFieldDTO) {
    const dto = new ListComponentFieldDTO();
    dto.editor = field.editor;
    dto.componentPersistEntity = row;
    dto.componentPersistEntityField = field;
    dto.visible = true;
    dto.editable = true;
    dto.description = field.description
    dto.type = field.persistEntityField.type;
    dto.shortOrder = this.genNextShortOrder(this.dto.listComponentLeftGroupFieldList);
    dto.code = this.genNextComponentCode(this.dto.listComponentLeftGroupFieldList, 'gf_' + field.persistEntityField.name);
    this.dto.listComponentLeftGroupFieldList.push(dto);
  }

  addFieldToTopGrouping(row: ComponentPersistEntityDTO, field: ComponentPersistEntityFieldDTO) {
    const dto = new ListComponentFieldDTO();
    dto.editor = field.editor;
    dto.componentPersistEntity = row;
    dto.componentPersistEntityField = field;
    dto.visible = true;
    dto.editable = true;
    dto.description = field.description
    dto.type = field.persistEntityField.type;
    dto.shortOrder = this.genNextShortOrder(this.dto.listComponentTopGroupFieldList);
    dto.code = this.genNextComponentCode(this.dto.listComponentTopGroupFieldList, 'tgf_' + field.persistEntityField.name);
    this.dto.listComponentTopGroupFieldList.push(dto);
  }

  addFieldToOrderBy(row: ComponentPersistEntityDTO, field: ComponentPersistEntityFieldDTO) {
    const dto = new ListComponentFieldDTO();
    dto.editor = field.editor;
    dto.componentPersistEntity = row;
    dto.componentPersistEntityField = field;
    dto.visible = true;
    dto.editable = false;
    dto.description = field.description
    dto.type = field.persistEntityField.type;
    dto.shortOrder = this.genNextShortOrder(this.dto.listComponentOrderByFieldList);
    dto.code = this.genNextComponentCode(this.dto.listComponentOrderByFieldList, 'of_' + field.persistEntityField.name);
    this.dto.listComponentOrderByFieldList.push(dto);
  }

  showHideAllFields() {
    if (this.showAllFieldsDiv === false) {
      this.showAllFieldsDiv = true;
    } else {
      this.showAllFieldsDiv = false;
    }
  }

  removeColumn(column: ListComponentFieldDTO) {
    this.dto.listComponentColumnFieldList =
      this.dto.listComponentColumnFieldList.filter(item => item !== column);
  }

  removeFilter(column: ListComponentFieldDTO) {
    if (this.dto !== undefined) {
      this.dto.listComponentFilterFieldList =
        this.dto.listComponentFilterFieldList.filter(item => item !== column);
    }
  }

  removeLeftGroupField(column: ListComponentFieldDTO) {
    if (this.dto !== undefined) {
      this.dto.listComponentLeftGroupFieldList =
        this.dto.listComponentLeftGroupFieldList.filter(item => item !== column);
    }
  }

  removeTopGroupField(column: ListComponentFieldDTO) {
    if (this.dto !== undefined) {
      this.dto.listComponentTopGroupFieldList =
        this.dto.listComponentTopGroupFieldList.filter(item => item !== column);
    }
  }

  setSelectedFilterField(column: ListComponentFieldDTO) {
    this.selectedFilterField = column;
  }

  generateDefaultFilterStructure() {
    let firstItteration = true;
    for (const listComponentFilterField of this.dto.listComponentFilterFieldList) {
      if (firstItteration) {
        this.dto.filterFieldStructure = '$' + listComponentFilterField.code;
      } else {
        this.dto.filterFieldStructure += ' AND $' + listComponentFilterField.code;
      }
      firstItteration = false;
    }
  }

  removeActionField(column: ListComponentFieldDTO) {
    this.dto.listComponentActionFieldList =
      this.dto.listComponentActionFieldList.filter(item => item !== column);
  }

  removeActionButton(listActionButtons: ListActionButton[], column: ListActionButton) {
    listActionButtons =
      listActionButtons.filter(item => item !== column);
    return listActionButtons;
  }

  removeOrderByField(column: ListComponentFieldDTO) {
    this.dto.listComponentOrderByFieldList =
      this.dto.listComponentOrderByFieldList.filter(item => item !== column);
  }

  moveUp(selectedItem: any, list: any[]) {
    let position = 0;
    for (const listItem of list) {
      if (selectedItem === listItem && position > 0) {
        const prevItem = list[position - 1];
        list[position] = prevItem;
        list[position - 1] = listItem;
      }
      position++;
    }

    let shortOrder = 0;
    for (const listItem of list) {
      listItem.shortOrder = shortOrder;
      shortOrder++;
    }
  }

  moveDown(selectedItem: any, list: any[]) {
    let position = 0;
    for (const listItem of list) {
      if (selectedItem === listItem && (position + 1) < list.length) {
        const nextItem = list[position + 1];
        list[position] = nextItem;
        list[position + 1] = listItem;
        break;
      }
      position++;
    }

    let shortOrder = 0;
    for (const listItem of list) {
      listItem.shortOrder = shortOrder;
      shortOrder++;
    }
  }

  defineComponentCode(list: any[], field: any) {
    const filteredList = list.filter(listField => listField !== field);
    return this.genNextComponentCode(filteredList, field.code);
  }

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }

  public addScript() {
    if (this.dto.listScripts == null) {
      this.dto.listScripts = [];
    }
    const listScript = new ListScriptDTO();
    listScript.shortOrder = this.getNextShortOrder(this.dto.listScripts);
    listScript.name = 'Script' + listScript.shortOrder;
    this.dto.listScripts.push(listScript);
    this.setDefaultSelectedListScript();
  }

  addCss() {
    if (this.dto.listCssList == null) {
      this.dto.listCssList = [];
    }
    const listCss = new ListCssDTO();
    listCss.shortOrder = this.getNextShortOrder(this.dto.listCssList);
    listCss.name = 'Css Script ' + listCss.shortOrder;
    this.dto.listCssList.push(listCss);
    this.setDefaultSelectedListCss();
  }

  setDefaultSelectedListScript() {
    if (this.selectedListScript != null) {
      return;
    }
    if (this.dto.listScripts != null && this.dto.listScripts.length > 0) {
      this.selectedListScript = this.dto.listScripts[0];
    }
  }

  setDefaultSelectedListCss() {
    if (this.selectedListCss != null) {
      return;
    }
    if (this.dto.listCssList != null && this.dto.listCssList.length > 0) {
      this.selectedListCss = this.dto.listCssList[0];
    }
  }

  setSelectedFormScript(listScript: ListScriptDTO) {
    this.selectedListScript = listScript;
  }

  setSelectedFormCss(listCss: ListCssDTO) {
    this.selectedListCss = listCss;
  }

  removeListScriptByField(formScript: FormScript) {
    this.dto.listScripts =
      this.dto.listScripts.filter(item => item !== formScript);
  }

  removeListCssByField(formCss: FormCss) {
    this.dto.listCssList =
      this.dto.listCssList.filter(item => item !== formCss);
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

  setSelectedListScript(listScript: ListScriptDTO) {
    this.selectedListScript = listScript;
  }

  setSelectedListCss(listCss: ListScriptDTO) {
    this.selectedListCss = listCss;
  }

  setSelectedActionButton(actionButton: ListActionButton) {
    this.selectedActionButton = actionButton;
  }

  setSelectedListComponentActionFieldList(listComponentActionField: ListComponentFieldDTO) {
    this.selectedListComponentActionField = listComponentActionField;
  }

  removeListComponentActionField(listComponentActionFieldList: ListComponentFieldDTO[], column: ListComponentFieldDTO) {
    listComponentActionFieldList =
      listComponentActionFieldList.filter(item => item !== column);
    return listComponentActionFieldList;
  }

  addSecurityButton(securityList: AccessControlDto[]) {
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

  setSelectedSecurityRow(securityRow: AccessControlDto) {
    this.selectedSecurityRow = securityRow;
  }

  removeAccessControl(securityList: AccessControlDto[], column) {
    securityList =
      securityList.filter(item => item !== column);
    return securityList;
  }

  selectRole(selectedUserGroup) {
    this.selectedSecurityRow.role = selectedUserGroup;
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
    dto.type = 'list';
    dto.entityId = this.dto.id;

    securityList.push(dto);

    return securityList;
  }

}
