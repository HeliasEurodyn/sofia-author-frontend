import {Component, OnInit} from '@angular/core';
import {ListComponentFieldDTO} from '../../../dtos/sofia/list/list-component-field-d-t-o';
import {ListDTO} from '../../../dtos/sofia/list/list-dto';
import {ListScriptDTO} from '../../../dtos/sofia/list/list-script-dto';
import {ListCssDTO} from '../../../dtos/sofia/list/list-css-dto';
import {ListActionButton} from '../../../dtos/sofia/list/list-action-button';
import {AccessControlDto} from '../../../dtos/sofia/security/access-control-dto';
import {ActivatedRoute, Router} from '@angular/router';
import {TableComponentDesignerService} from '../../../services/crud/table-component-designer.service';
import {ListDesignerService} from '../../../services/crud/list-designer.service';
import {Location} from '@angular/common';
import {RoleService} from '../../../services/crud/role.service';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {ComponentPersistEntityDTO} from '../../../dtos/sofia/component/component-persist-entity-dto';
import {ComponentPersistEntityFieldDTO} from '../../../dtos/sofia/component/component-persist-entity-field-dto';
import {FormScript} from '../../../dtos/sofia/form/form-script';
import {FormCss} from '../../../dtos/sofia/form/form-css';
import {BaseDTO} from '../../../dtos/common/base-dto';
import {PageComponent} from '../../page/page-component';
import {LanguageService} from '../../../services/crud/language.service';
import {LanguageDTO} from '../../../dtos/sofia/language/language-dto';
import {ListTranslationDTO} from '../../../dtos/sofia/list/translation/list-translation-dto';
import {ListActionButtonTranslationDTO} from '../../../dtos/sofia/list/translation/list-action-button-translation-dto';
import {ListComponentFieldTranslationDTO} from '../../../dtos/sofia/list/translation/list-component-field-translation-dto';

@Component({
  selector: 'app-list-designer-translation-form',
  templateUrl: './list-designer-translation-form.component.html',
  styleUrls: ['./list-designer-translation-form.component.css']
})
export class ListDesignerTranslationFormComponent extends PageComponent implements OnInit {

  public components: any;
  public selectedFilterField: ListComponentFieldDTO;

  public languages: LanguageDTO[];
  language: LanguageDTO;
  translation: ListTranslationDTO;

  public dto: ListDTO;
  showAllFieldsDiv: Boolean = false;

  shortOrder = 0;
  public tableExists = false;

  public mode: string;
  title = 'appBootstrap';

  public visibleSection = 'general';
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
              private languageService: LanguageService
  ) {
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
        this.scriptsFromBase64();
        this.fixLanguages();
      });
    } else {
      this.setDefaults();
    }

    this.refreshComponents();

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

  refreshComponents() {
    this.tableComponentService.get().subscribe(data => {
      this.components = data;
    });

    this.roleService.get().subscribe(data => {
      this.roles = data;
    });

    this.languageService.get().subscribe(data => {
      this.languages = data;
    });
  }

  fixLanguages() {

    if (this.dto.translations == null) {
      return;
    }

    for (const translation of this.dto.translations) {
      this.fixLanguage(translation.language);
    }
  }

  fixLanguage(language: LanguageDTO) {

    this.dto.listActionButtons
      .forEach(addActionButton => {

        if (addActionButton.translations == null) {
          addActionButton.translations = [];
        }

        const translationsCount =
          addActionButton.translations
            .filter(translation => translation.language.id === language.id).length;

        if (translationsCount === 0) {
          const listActionButtonTranslationDTO = new ListActionButtonTranslationDTO();
          listActionButtonTranslationDTO.language = language;
          listActionButtonTranslationDTO.description = addActionButton.description;

          addActionButton.translations.push(listActionButtonTranslationDTO);
        }

      });

    this.dto.listComponentColumnFieldList
      .concat(this.dto.listComponentFilterFieldList)
      .concat(this.dto.listComponentLeftGroupFieldList)
      .concat(this.dto.listComponentTopGroupFieldList)
      .concat(this.dto.listComponentOrderByFieldList)
      .concat(this.dto.listComponentActionFieldList)
      .forEach(listComponentField => {

        if (listComponentField.translations == null) {
          listComponentField.translations = [];
        }

        const translationsCount =
          listComponentField.translations
            .filter(translation => translation.language.id === language.id).length;

        if (translationsCount === 0) {
          const listComponentFieldTranslationDTO = new ListComponentFieldTranslationDTO();
          listComponentFieldTranslationDTO.language = language;
          listComponentFieldTranslationDTO.description = listComponentField.description;
          listComponentField.translations.push(listComponentFieldTranslationDTO);
        }


      });

    this.dto.listComponentActionFieldList
      .forEach(actionField => {
        actionField.listComponentActionFieldList.forEach(actionSubField => {

          if (actionSubField.translations == null) {
            actionSubField.translations = [];
          }

          const translationsCount =
            actionSubField.translations
              .filter(translation => translation.language.id === language.id).length;

          if (translationsCount === 0) {
            const listComponentFieldTranslationDTO = new ListComponentFieldTranslationDTO();
            listComponentFieldTranslationDTO.language = language;
            listComponentFieldTranslationDTO.description = actionSubField.description;
            actionSubField.translations.push(listComponentFieldTranslationDTO);
          }

        });
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

    const dtoToBeSaved = JSON.parse(JSON.stringify(this.dto));
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

  scriptsFromBase64() {
    this.dto.listScripts.forEach(listScript => {
      const decodedScrypt = atob(listScript.script);
      listScript.script = decodedScrypt;
    });

    this.dto.listCssList.forEach(listScript => {
      const decodedScrypt = atob(listScript.script);
      listScript.script = decodedScrypt;
    });
  }

  delete() {
    this.service.delete(this.dto.id).subscribe(data => {
      this.navigatorService.closeAndBack(this.pageId);
    });
  }

  addLanguage(language: LanguageDTO) {

    if (this.dto.translations == null) {
      this.dto.translations = [];
    }

    for (const translation of this.dto.translations) {
      if (translation.language.id === language.id) {
        return;
      }
    }

    const listTranslationDTO = new ListTranslationDTO();
    listTranslationDTO.language = language;
    listTranslationDTO.headerTitle = this.dto.headerTitle;
    listTranslationDTO.headerDescription = this.dto.headerDescription;
    listTranslationDTO.title = this.dto.title;
    listTranslationDTO.description = this.dto.description;
    listTranslationDTO.groupingTitle = this.dto.groupingTitle;
    listTranslationDTO.groupingDescription = this.dto.groupingDescription;
    this.dto.translations.push(listTranslationDTO);

    this.dto.listActionButtons
      .forEach(addActionButton => {
        if (addActionButton.translations == null) {
          addActionButton.translations = [];
        }

        const listActionButtonTranslationDTO = new ListActionButtonTranslationDTO();
        listActionButtonTranslationDTO.language = language;
        listActionButtonTranslationDTO.description = addActionButton.description;
        addActionButton.translations.push(listActionButtonTranslationDTO);
      });

    this.dto.listComponentColumnFieldList
      .concat(this.dto.listComponentFilterFieldList)
      .concat(this.dto.listComponentLeftGroupFieldList)
      .concat(this.dto.listComponentTopGroupFieldList)
      .concat(this.dto.listComponentOrderByFieldList)
      .concat(this.dto.listComponentActionFieldList)
      .forEach(listComponentField => {
        if (listComponentField.translations == null) {
          listComponentField.translations = [];
        }

        const listComponentFieldTranslationDTO = new ListComponentFieldTranslationDTO();
        listComponentFieldTranslationDTO.language = language;
        listComponentFieldTranslationDTO.description = listComponentField.description;
        listComponentField.translations.push(listComponentFieldTranslationDTO);
      });

    this.dto.listComponentActionFieldList
      .forEach(actionField => {
        actionField.listComponentActionFieldList.forEach(actionSubField => {
          if (actionSubField.translations == null) {
            actionSubField.translations = [];
          }

          const listComponentFieldTranslationDTO = new ListComponentFieldTranslationDTO();
          listComponentFieldTranslationDTO.language = language;
          listComponentFieldTranslationDTO.description = actionSubField.description;
          actionSubField.translations.push(listComponentFieldTranslationDTO);

        });
      });
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

  addFormulaFieldToFilters() {
    const dto = new ListComponentFieldDTO();
    dto.editor = '';
    dto.componentPersistEntity = null
    dto.componentPersistEntityField = null;
    dto.visible = true;
    dto.editable = false;
    dto.required = false;
    dto.description = '';
    dto.type = '';
    dto.shortOrder = this.genNextShortOrder(this.dto.listComponentFilterFieldList);
    dto.code = 'f_' + dto.shortOrder;
    dto.bclass = 'col-12';
    this.dto.listComponentFilterFieldList.push(dto);
  }

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

  addFieldToGrouping(row: ComponentPersistEntityDTO, field: ComponentPersistEntityFieldDTO) {
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

  removeTranslation(language: LanguageDTO) {
    this.dto.translations = this.dto.translations.filter(item => item.language.id !== language.id);

    this.dto.listActionButtons
      .forEach(addActionButton => {
        addActionButton.translations = addActionButton.translations.filter(item => item.language.id !== language.id);
      });

    this.dto.listComponentColumnFieldList
      .concat(this.dto.listComponentFilterFieldList)
      .concat(this.dto.listComponentLeftGroupFieldList)
      .concat(this.dto.listComponentTopGroupFieldList)
      .concat(this.dto.listComponentOrderByFieldList)
      .concat(this.dto.listComponentActionFieldList)
      .forEach(listComponentField => {
        listComponentField.translations = listComponentField.translations.filter(item => item.language.id !== language.id);
      });
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

  selectLanguage(language: LanguageDTO) {
    this.language = language;

    if (this.visibleSection === 'general') {
      this.visibleSection = 'header_descriptions';
    }

    for (const translation of this.dto.translations) {
      if (translation.language.id === language.id) {
        this.translation = translation;
      }
    }
  }

}
