import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ListDTO} from '../../../../dtos/sofia/list/list-dto';
import {ListService} from '../../../../services/crud/sofia/list.service';
import {PageComponent} from '../../page/page-component';
import {ListResultsData} from '../../../../dtos/sofia/list/list-results-data';
import {CommandNavigatorService} from '../../../../services/system/sofia/command-navigator.service';
import {NotificationService} from '../../../../services/system/sofia/notification.service';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ListActionButton} from '../../../../dtos/sofia/list/list-action-button';
import {TableComponentService} from '../../../../services/crud/sofia/table-component.service';
import {Title} from '@angular/platform-browser';
import {concatMap} from 'rxjs/operators';
import {ListScriptsService} from '../../../../services/system/sofia/list-scripts.service';
import {ListComponentFieldDTO} from '../../../../dtos/sofia/list/list-component-field-d-t-o';
import {DynamicCssScriptLoaderService} from '../../../../services/system/sofia/dynamic-css-script-loader.service';
import {ListSearchService} from '../../../../services/system/sofia/list-search.service';
import {LanguageService} from '../../../../services/system/sofia/language.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends PageComponent implements OnInit, AfterViewInit, OnDestroy {

  public listDto: ListDTO;
  public listResultsData: ListResultsData;
  public groupContent: Array<Map<string, any>>;

  public showPrevPagination = false;
  public showNextPagination = false;

  public listHeaderVisible: Boolean = false;
  public filterHeaderVisible: Boolean = false;

  public filterBodyVisible: Boolean = false;
  public listBodyVisible: Boolean = true;
  public focusedFieldValue: any;

  listSearchSubject;
  languageSelectionSubject;

  public selectedShortCode = '';
  public selectedShortOrder = 'desc';

  constructor(private service: ListService,
              private commandNavigatorService: CommandNavigatorService,
              private notificationService: NotificationService,
              public datepipe: DatePipe,
              private activatedRoute: ActivatedRoute,
              private tableComponentService: TableComponentService,
              private title: Title,
              private listScriptsService: ListScriptsService,
              private dynamicCssScriptLoader: DynamicCssScriptLoaderService,
              private languageService: LanguageService,
              private listSearchService: ListSearchService) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);
    this.refresh();
  }

  ngAfterViewInit() {
    this.applyHeaderSearchFilter();
    this.applyLanguageSelection();
  }

  ngOnDestroy() {
    this.listSearchSubject.unsubscribe();
    this.languageSelectionSubject.unsubscribe();
  }

  applyLanguageSelection() {
    this.languageSelectionSubject = this.languageService.languageSelectionEmmiter.subscribe((languageCode: string) => {
      this.refresh();
    });
  }

  applyHeaderSearchFilter() {
    this.listSearchSubject = this.listSearchService.listSearchEmmiter.subscribe((searchVaule: string) => {
      this.listResultsData?.listContent.forEach(row => {
        let valueFound = false;

        this.listDto?.listComponentColumnFieldList.forEach(column => {
          const cell = row[column.code];
          if (cell != null && column.visible) {
            if (cell.toString().toUpperCase().includes(searchVaule.toUpperCase()) || searchVaule === '') {
              valueFound = true;
            }
          }
        });

        if (valueFound) {
          row['hide-row'] = false;
        } else {
          row['hide-row'] = true;
        }
      });
    });
  }

  refresh(): void {
    const id = this.getLocateParams().get('ID');
    const language = JSON.parse(localStorage.getItem('loggedin_user')).currentLanguage;
    const languageId = language == null ? 0 : language.id;

    this.listDto = new ListDTO();

    this.service.getVersion(id)
      .pipe(concatMap(instanceVersion => this.service.getListById(id, instanceVersion, languageId )))
      .subscribe(dto => {

        localStorage.setItem('cachedList' + id + '-' + languageId, JSON.stringify(dto));
        this.listDto = dto;

        this.listHeaderVisible = this.listDto.listVisible;
        this.filterHeaderVisible = this.listDto.filterVisible;

        this.setDafaultCommandParams();
        this.dynamicCssScriptLoader.addScript(id, 'list');
        this.defineTitle();
        this.focusElement();

        this.listScriptsService.loadWithPromise(this).then(data => {
          if (this.listDto.autoRun) {
            this.getListResultData();
          }
        });
      });
  }

  defineTitle() {
    if (this.commandShowCustomTitle()) {
      this.title.setTitle(this.getWindowCustomTitleFromCommand());
    }
  }

  private setDafaultCommandParams() {
    this.getParams('DEFAULTS')
      .forEach((value: string, key: string) => {
        this.listDto
          .listComponentFilterFieldList
          .filter(x => x.code === key)
          .forEach(x => x.fieldValue = value);

        this.listDto
          .listComponentColumnFieldList
          .filter(x => x.code === key)
          .forEach(x => x.fieldValue = value);
      });
  }


  getListResultData(reloadGrouping = true) {

    let requiredFiledsEmpty = false;
    for (const filterField of this.listDto.listComponentFilterFieldList) {
      if ((filterField.fieldValue == null || filterField.fieldValue === '') && filterField.required) {
        this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-id-card',
          '<b>Filters error</b> Required filter field ' + filterField.description + ' is empty!');
        requiredFiledsEmpty = true;
      }
    }

    if (requiredFiledsEmpty) {
      return;
    }

    const values = new Map();
    const filterFieldList =
      this.listDto.listComponentFilterFieldList
        .concat(this.listDto.listComponentLeftGroupFieldList)
        .concat(this.listDto.listComponentColumnFieldList);

    for (const filterField of filterFieldList) {
      if (filterField.fieldValue != null && filterField.fieldValue !== '') {
        let fieldValue = '';
        if (filterField.type === 'datetime') {
          fieldValue = this.datepipe.transform(filterField.fieldValue, 'yyyyMMddHHmmss', 'UTC');
        } else {
          fieldValue = filterField.fieldValue;
        }
        values.set(filterField.code, fieldValue);
      }
    }

    if (this.selectedShortCode !== '') {
      values.set('sel-sort-code', this.selectedShortCode);
      values.set('sel-sort-order', this.selectedShortOrder);
    }

    this.service.getListResult(values, 0, this.listDto.id).subscribe(data => {
      this.listResultsData = data;
      this.setPaginationSettings();
      if (reloadGrouping) {
        this.getGroupResultData(values);
      }
      this.listScriptsService.triggerListEvent(this.listDto.id, 'onListDataLoaded', data);
    });

  }

  setPaginationSettings() {
    if (!this.listDto.hasPagination) {
      return;
    }

    if (this.listResultsData.currentPage > 0) {
      this.showPrevPagination = true;
    } else {
      this.showPrevPagination = false;
    }

    if (this.listResultsData.currentPage + 1 < this.listResultsData.totalPages) {
      this.showNextPagination = true;
    } else {
      this.showNextPagination = false;
    }
  }

  getGroupResultData(parametersMap: Map<string, string>) {

    if (this.listDto.listComponentLeftGroupFieldList == null) {
      return;
    }

    if (this.listDto.listComponentLeftGroupFieldList.length === 0) {
      return;
    }

    this.service.getGroupResult(parametersMap, this.listDto.id).subscribe(data => {
      this.groupContent = data;
      this.initializeGroupContentVisibility(this.listResultsData.groupContent, false);
      this.initializeGroupContentParrents(this.listResultsData.groupContent);
    });
  }

  private initializeGroupContentParrents(groupContent: Array<Map<string, any>>) {
    if (groupContent == null) {
      return;
    }
    for (const groupContentEntry of groupContent) {
      if (groupContentEntry['children'] !== null) {
        for (const groupContentChildEntry of groupContentEntry['children']) {
          groupContentChildEntry['parrent'] = groupContentEntry;
        }
        this.initializeGroupContentParrents(groupContentEntry['children']);
      }
    }
  }

  private initializeGroupContentVisibility(groupContent: Array<Map<string, any>>, childrenVisible: Boolean) {
    if (groupContent == null) {
      return;
    }

    for (const groupContentEntry of groupContent) {
      groupContentEntry['childrenVisible'] = childrenVisible;

      if (groupContentEntry['children'] !== null) {
        this.initializeGroupContentVisibility(groupContentEntry['children'], childrenVisible);
      }
    }
  }

  listRowButtonClick(row: string[], listDto: ListDTO, field: ListComponentFieldDTO) {

    this.listScriptsService.listNativeRowButtonClickHandler(this.listDto.id, field.code, row);

    let command = field.editor;
    if (command === '#select') {
      this.emitReturningValues(row);
      return;
    }

    if (command.toUpperCase() === 'RETURN') {
      this.emitReturningValues(row);
      return;
    }

    if (command.toUpperCase() !== '') {
      /* Do replacements */
      listDto.listComponentColumnFieldList.forEach((column, index) => {
        command = command.replace('#' + column.code, row[column.code]);
      });
      command = command.replace('$PAGEID', this.pageId);

      this.listDeleteCommandExecute(command);
      this.commandNavigatorService.navigate(command);
    }
  }


  listDeleteCommandExecute(command) {
    const commandParameters: Map<string, string> = this.commandParserService.parse(command);
    const commandType = commandParameters.get('COMMAND-TYPE');

    if (commandType === 'LIST-DELETE' && commandParameters.has('COMPONENT-ID') && commandParameters.has('SELECTION-ID')) {
      this.tableComponentService.deleteComponentData(commandParameters.get('COMPONENT-ID'),
        commandParameters.get('SELECTION-ID')).subscribe(data => {
        this.getListResultData();
      });
    }
  }

  updateVisibility(item) {
    if (item['childrenVisible']) {
      item['childrenVisible'] = false;
    } else {
      item['childrenVisible'] = true;
    }
  }

  filterGroup(item) {
    this.clearValuesToListComponentLeftGroupFieldList();
    this.setValueToListComponentLeftGroupFieldList(item['code'], item['value']);
    if (item['parrent'] != null) {
      this.filterGroupParrent(item['parrent'])
    }
    this.getListResultData(false);
  }

  filterGroupOnField(field: ListComponentFieldDTO) {
    let fieldFound = false;
    let fieldUpdated = false;
    for (const leftGroupingField of this.listDto.listComponentLeftGroupFieldList) {
      if (fieldFound) {
        leftGroupingField.fieldValue = '';
        fieldUpdated = true;
      }
      if (leftGroupingField.id === field.id) {
        fieldFound = true;
      }
    }

    if (fieldUpdated) {
      this.getListResultData(false);
    }
  }

  clearFilterGroup() {
    this.clearValuesToListComponentLeftGroupFieldList();
    this.getListResultData(false);
  }

  filterGroupParrent(item) {
    this.setValueToListComponentLeftGroupFieldList(item['code'], item['value']);
    if (item['parrent'] != null) {
      this.filterGroupParrent(item['parrent'])
    }
  }

  private clearValuesToListComponentLeftGroupFieldList() {
    for (const leftGroupingField of this.listDto.listComponentLeftGroupFieldList) {
      leftGroupingField.fieldValue = '';
    }
  }

  private setValueToListComponentLeftGroupFieldList(code: string, value: any) {
    for (const leftGroupingField of this.listDto.listComponentLeftGroupFieldList) {
      if (leftGroupingField.code === code) {
        leftGroupingField.fieldValue = value;
      }
    }
  }

  isGroupContentDivVisible() {
    if (this.listDto.listComponentLeftGroupFieldList.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  dataExcel() {
    this.service.getListResultDataExcel(this.listDto).subscribe(data => {
      const blob = new Blob([data], {type: 'application/xlsx'});
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'list-data.xlsx';
      link.click();
    });
  }

  columnFilterRefreshData(event: KeyboardEvent, colIndex: number) {

    if (event.shiftKey && event.key === 'ArrowLeft') {
      const tds = document.getElementsByClassName('header-col-' + (colIndex - 1));
      if (tds.length > 0) {
        this.findContorlField((tds[0] as HTMLElement).children);
      }
    }

    if (event.shiftKey && event.key === 'ArrowRight') {
      const tds = document.getElementsByClassName('header-col-' + (colIndex + 1));
      if (tds.length > 0) {
        this.findContorlField((tds[0] as HTMLElement).children);
      }
    }

    if (event.shiftKey && event.key === 'ArrowDown') {
      const tds = document.getElementsByClassName('row-0-col-' + colIndex);
      if (tds.length > 0) {
        this.findContorlField((tds[0] as HTMLElement).children);
      }
    }

    if (event.altKey && event.key === 'Enter') {
      if (this.listResultsData.listContent.length === 1) {
        const row = this.listResultsData.listContent[0];
        this.emitReturningValues(row);
      }
    }

    if (event.key === 'Enter') {
      this.getListResultData(false);
    }

  }

  emitReturningValues(row) {
    if (this.params.has('RETURN')) {
      const emitData: string[] = [];
      const returnCode = this.params.get('RETURN');
      if (returnCode in row) {
        emitData['RETURN'] = row[returnCode];
      }

      const returnDisplayArray: string[] = [];
      const displayValues: Map<string, string> = this.getReturningDisplayValues();
      for (const [displayValueKey, displayValue] of displayValues) {
        if (displayValueKey in row) {
          returnDisplayArray.push(row[displayValueKey]);
        }
      }
      emitData['RETURN-DISLPAY'] = returnDisplayArray.join(' ');
      emitData['EXECUTED'] = true;
      this.selectEmmiter.emit(emitData);
    }
  }

  navigateToPage(page: number) {
    if (page < 0) {
      return;
    }

    if (page > (this.listResultsData.totalPages - 1)) {
      return;
    }

    this.listDto.currentPage = page;

    const values = new Map();
    const filterFieldList =
      this.listDto.listComponentFilterFieldList
        .concat(this.listDto.listComponentLeftGroupFieldList)
        .concat(this.listDto.listComponentColumnFieldList);

    for (const filterField of filterFieldList) {
      if (filterField.fieldValue != null && filterField.fieldValue !== '' && filterField.editable) {
        let fieldValue = '';
        if (filterField.type === 'datetime') {
          fieldValue = this.datepipe.transform(filterField.fieldValue, 'yyyyMMddHHmmss', 'UTC');
        } else {
          fieldValue = filterField.fieldValue;
        }
        values.set(filterField.code, fieldValue);
      }
    }

    if (this.selectedShortCode !== '') {
      values.set('sel-sort-code', this.selectedShortCode);
      values.set('sel-sort-order', this.selectedShortOrder);
    }

    this.service.getListResult(values, page, this.listDto.id).subscribe(data => {
      this.listResultsData = data;
      this.setPaginationSettings();
    });
  }

  setFilterBodyVisible() {
    this.filterBodyVisible = true;
    this.listBodyVisible = false;
  }

  setListBodyVisible() {
    this.filterBodyVisible = false;
    this.listBodyVisible = true;
  }

  showPreviousPageButton() {
    if (this.previousPage === null) {
      return false;
    } else {
      return true;
    }
  }

  navigateToPreviousPage() {
    this.commandNavigatorService.navigateToPreviousPage(this.pageId);
  }

  headerActionButtonClicked(actionButton: ListActionButton) {
    this.listScriptsService.listNativeHeaderButtonClickHandler(this.listDto.id, actionButton.code);
    this.commandNavigatorService.navigate(actionButton.editor);
  }

  showTopHeader() {
    if ((this.listDto.headerIcon == null ? 0 : this.listDto.headerIcon.length) > 0) {
      return true;
    }
    if ((this.listDto.headerTitle == null ? 0 : this.listDto.headerTitle.length) > 0) {
      return true;
    }
    if ((this.listDto.headerDescription == null ? 0 : this.listDto.headerDescription.length) > 0) {
      return true;
    }

    return false;
  }

  groupHasChildred(children: any[]) {
    const childrenCount = children.filter(x => (x.value == null ? '' : x.value) !== '').length;
    if (childrenCount > 0) {
      return true;
    } else {
      return false;
    }
  }

  hasSelections(list: ListComponentFieldDTO[]) {
    const selectionsCount = list.filter(x => (x.fieldValue == null ? '' : x.fieldValue) !== '').length;
    if (selectionsCount > 0) {
      return true;
    } else {
      return false;
    }
  }

  calcColSpan(listComponentActionFieldList: ListComponentFieldDTO[], listComponentColumnFieldList: ListComponentFieldDTO[]) {
    let colspan = 0;
    if (listComponentColumnFieldList != null) {
      colspan = listComponentColumnFieldList.length;
    }

    if (listComponentActionFieldList != null) {
      if (listComponentActionFieldList.length > 0) {
        colspan += 1;
      }
    }

    return colspan
  }

  filterHiddenColumns(listComponentColumnFieldList: ListComponentFieldDTO[]) {
    if (listComponentColumnFieldList == null) {
      return null;
    }
    return listComponentColumnFieldList.filter(x => x.visible);
  }

  filterHiddenRows(listContent: Array<string[]>) {
    if (listContent == null) {
      return null;
    }

    return listContent.filter(x => {
      if (x['hide-row'] === true) {
        return false;
      } else {
        return true;
      }
    });
  }

  cellsKeyDown(event: KeyboardEvent, rowIndex: number, colIndex: number, row: string[]) {
    if (event.shiftKey && event.key === 'ArrowLeft') {
      const tds = document.getElementsByClassName('row-' + rowIndex + '-col-' + (colIndex - 1));
      if (tds.length > 0) {
        this.findContorlField((tds[0] as HTMLElement).children);
      }
    }

    if (event.shiftKey && event.key === 'ArrowRight') {
      const tds = document.getElementsByClassName('row-' + rowIndex + '-col-' + (colIndex + 1));
      if (tds.length > 0) {
        this.findContorlField((tds[0] as HTMLElement).children);
      }
    }

    if (event.shiftKey && event.key === 'ArrowUp') {
      let tds;
      if (rowIndex === 0) {
        tds = document.getElementsByClassName('header-col-' + colIndex);
      } else {
        tds = document.getElementsByClassName('row-' + (rowIndex - 1) + '-col-' + colIndex);
      }
      if (tds.length > 0) {
        this.findContorlField((tds[0] as HTMLElement).children);
      }
    }

    if (event.shiftKey && event.key === 'ArrowDown') {
      const tds = document.getElementsByClassName('row-' + (rowIndex + 1) + '-col-' + colIndex);
      if (tds.length > 0) {
        this.findContorlField((tds[0] as HTMLElement).children);
      }
    }

    if (event.altKey && event.key === 'Enter') {
      this.emitReturningValues(row);
    }

  }

  private findContorlField(elements: HTMLCollection) {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].classList.contains('ctrl-field')) {

        (elements[i] as HTMLElement).focus();
        return true;
      }
    }

    for (let i = 0; i < elements.length; i++) {
      const found = this.findContorlField((elements[i] as HTMLElement).children);
      if (found) {
        return true;
      }
    }

    return false;
  }

  listFieldFocusIn(focusedFieldValue: any) {
    this.focusedFieldValue = focusedFieldValue;
  }

  listFieldFocusOut(column: ListComponentFieldDTO, row: string[]) {
    if (!column.editable) {
      return;
    }

    if (column.type === 'field' || column.type === 'list') {
      return;
    }

    let focusedVal;
    let newVal;
    if (column.type === 'datetime') {
      focusedVal = (this.focusedFieldValue == null ? '' : this.focusedFieldValue.toString())
      newVal = (row[column.code] == null ? '' : row[column.code].toString())
    } else {
      focusedVal = this.focusedFieldValue;
      newVal = row[column.code];
    }

    if (focusedVal === newVal) {
      return;
    }

    this.updateListField(column, row);
  }

  listEventOccured(event: any, column: ListComponentFieldDTO, row: string[]) {
    if (['listselected', 'listcleared'].includes(event.eventtype)) {
      this.updateListField(column, row);
    }
  }

  updateListField(column: ListComponentFieldDTO, row: string[]) {

    if (column.editableRelFieldCode == null) {
      return;
    }

    if (column.editableRelFieldCode === '') {
      return;
    }

    if (row[column.editableRelFieldCode] === null) {
      return;
    }

    if (row[column.editableRelFieldCode] === '') {
      return;
    }

    let value = null;
    if (column.type === 'datetime') {
      value = this.datepipe.transform(row[column.code],
        'yyyyMMddHHmmss',
        'UTC');
    } else {
      value = row[column.code]
    }

    this.service.updateField(this.listDto.id, row[column.editableRelFieldCode], column.code, value).subscribe();
  }

  shortByColumnField(shortCode: string) {
    if (this.selectedShortCode === shortCode) {
      if (this.selectedShortOrder === 'asc') {
        this.selectedShortOrder = 'desc';
      } else {
        this.selectedShortOrder = 'asc';
      }
    } else {
      this.selectedShortCode = shortCode;
      this.selectedShortOrder = 'desc';
    }

    this.getListResultData(false);
  }
}
