import {Component, Input, OnInit} from '@angular/core';
import {ListResultsData} from '../../../dtos/sofia/list/list-results-data';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {NotificationService} from '../../../services/system/notification.service';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {TableComponentService} from '../../../services/crud/table-component.service';
import {Title} from '@angular/platform-browser';
import {ListScriptsService} from '../../../services/system/list-scripts.service';
import {DynamicCssScriptLoaderService} from '../../../services/system/dynamic-css-script-loader.service';
import {concatMap} from 'rxjs/operators';
import {ListComponentFieldDTO} from '../../../dtos/sofia/list/list-component-field-d-t-o';
import {ListActionButton} from '../../../dtos/sofia/list/list-action-button';
import {PageComponent} from '../../page/page-component';
import {PivotListService} from '../../../services/crud/pivot-list.service';
import {PivotListDTO} from '../../../dtos/sofia/pivot-list/pivot-list-dto';
import {FilterField} from '../../../dtos/sofia/pivot-list/filter-field';
import {PivotListComponentFieldDTO} from '../../../dtos/sofia/pivot-list/pivot-list-component-field-dto';

declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean
  }
}

if (navigator.msSaveBlob) {
  // use navigator.msSaveBlob
}

class FieldBranch {

  code: string;
  displayValue: String;
  type: string;
  colspan: number;
  rowspan: number;
  children: FieldBranch[];
  listRows: Array<string[]>;
  class: string;
  css: string;

  leftArrayLine: FieldBranch[]
  topArrayLine: FieldBranch[]

  isBottomBranch: Boolean;
  isVisible: Boolean;
  isHiddenByParrent: Boolean;
  islineHidden: Boolean;

  constructor() {
    this.rowspan = 1;
    this.colspan = 1;
    this.isVisible = true;
    this.isHiddenByParrent = false;
    this.islineHidden = false;
    this.children = [];
    this.class = '';
    this.leftArrayLine = null;
    this.topArrayLine = null;
  }
}

@Component({
  selector: 'app-pivol-list',
  templateUrl: './pivot-list.component.html',
  styleUrls: ['./pivot-list.component.css']
})
export class PivotListComponent extends PageComponent implements OnInit {

  public initialTopFieldTree: FieldBranch[] = [];
  public initialLeftFieldTree: FieldBranch[] = [];

  public topFieldTree: FieldBranch[] = [];
  public leftFieldTree: FieldBranch[] = [];

  public topViewArrayLines = new Array<FieldBranch[]>();
  public leftViewArrayLines = new Array<FieldBranch[]>();

  public topArrayLines = new Array<FieldBranch[]>();
  public leftArrayLines = new Array<FieldBranch[]>();

  public valuesArray = new Array<FieldBranch[]>();

  public totalTopCols = 0;

  public listDto: PivotListDTO;
  public listResultsData: ListResultsData;
  public groupContent: Array<Map<string, any>>;

  public showPrevPagination = false;
  public showNextPagination = false;

  public listHeaderVisible: Boolean = false;
  public filterHeaderVisible: Boolean = false;

  public listBodyVisible: Boolean = true;
  public focusedFieldValue: any;

  public topLeftColspan = 0;
  public topLeftRowspan = 0;

  @Input() public embeded = false;
  @Input() public embededParams = '';

  public hideSideMenus = false;

  selectedListComponentField: PivotListComponentFieldDTO;
  filterFieldSearch = '';

  constructor(private service: PivotListService,
              private commandNavigatorService: CommandNavigatorService,
              private notificationService: NotificationService,
              public datepipe: DatePipe,
              private activatedRoute: ActivatedRoute,
              private tableComponentService: TableComponentService,
              private title: Title,
              private listScriptsService: ListScriptsService,
              private dynamicCssScriptLoader: DynamicCssScriptLoaderService) {
    super();
  }

  counter(i: number) {
    return new Array(i);
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    if (this.getLocateParams().has('ID')) {
      const id = this.getLocateParams().get('ID');
      this.refresh(id);
    }
  }

  refresh(id): void {
    this.listDto = new PivotListDTO();
    this.service.getVersion(id)
      .pipe(concatMap(instanceVersion => this.service.getListById(id, instanceVersion)))
      .subscribe(dto => {

        localStorage.setItem('cachedList' + id, JSON.stringify(dto));

        this.listDto = dto;

        this.listDto.listComponentTopGroupFieldList = this.listDto.listComponentTopGroupFieldList.filter(f => f.visible === true);
        this.listDto.listComponentLeftGroupFieldList = this.listDto.listComponentLeftGroupFieldList.filter(f => f.visible === true);

        this.listDto.listComponentTopGroupFieldList.forEach(f => f.isExpanded = true);
        this.listDto.listComponentLeftGroupFieldList.forEach(f => f.isExpanded = true);

        this.listHeaderVisible = this.listDto.listVisible;
        this.filterHeaderVisible = this.listDto.filterVisible;

        this.setDefaultCommandParams();
        this.dynamicCssScriptLoader.addScript(id, 'list');
        this.defineTitle();

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

  getListResultData() {

    /*
    * Check for required Fields
    * */
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

    /*
     * Retrieve Values Array from filter fields
     * */
    const values = new Map();
    for (const filterField of this.listDto.listComponentFilterFieldList) {
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

    this.service.getListResult(values, this.listDto.id).subscribe(data => {
      this.listResultsData = data;
      this.createPivot();
      this.listScriptsService.triggerListEvent(this.listDto.id, 'onListDataLoaded', data);
    });

  }

  export_xls() {
    let tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';

    tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';

    tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';

    tab_text = tab_text + '<table border="1px"">';
    tab_text = tab_text + '<tr><td rowspan="2" style="cursor: pointer;border: 1px solid #b3d7ff;background-color: #f7f7f7;padding: 130px;">a</td><td>b</td></tr>';
    tab_text = tab_text + '<tr><td>c</td></tr>';
    tab_text = tab_text + '</table></body></html>';

    const data_type = 'data:application/vnd.ms-excel';

    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      if (window.navigator.msSaveBlob) {
        const blob = new Blob([tab_text], {
          type: 'application/csv;charset=utf-8;'
        });
        navigator.msSaveBlob(blob, 'Test file.xlsx');
      }
    } else {
      const downloadLink = document.createElement('a');
      document.body.appendChild(downloadLink);
      downloadLink.href = data_type + ', ' + encodeURIComponent(tab_text);
      downloadLink.download = 'Test file.xlsx';
      downloadLink.click();
    }
  }

  createPivot() {
    this.createInitialPivotTrees();
    this.createDefaultPivotTrees();
    this.editInitialHiddenBranchesVisibility();
    this.editPivotLinesVisibility();
    this.createFilterFields();
    this.createPivotViewArrays();
    this.createPivotArrays();
    this.createPivotValuesArray();
  }

  refreshPivot() {
    this.createPivotTrees();
    if ( this.leftFieldTree.length === 0 || this.topFieldTree.length === 0 ) { return; }

    this.editPivotLinesVisibility();
    this.createPivotViewArrays();
    this.createPivotArrays();
    this.createPivotValuesArray();
  }

  createInitialPivotTrees() {
    /* Create Left & Top Trees */
    this.initialLeftFieldTree = this.createFieldTree(this.listDto.listComponentLeftGroupFieldList, this.listResultsData);
    this.initialTopFieldTree = this.createFieldTree(this.listDto.listComponentTopGroupFieldList, this.listResultsData);
  }

  createDefaultPivotTrees() {
    this.leftFieldTree = this.initialLeftFieldTree;
    this.topFieldTree = this.initialTopFieldTree;
  }

  createPivotTrees() {
    this.leftFieldTree = this.applyFieldsFiltersToPivotTrees(this.listDto.listComponentLeftGroupFieldList, this.initialLeftFieldTree, 0);
    this.topFieldTree = this.applyFieldsFiltersToPivotTrees(this.listDto.listComponentTopGroupFieldList, this.initialTopFieldTree, 0);
  }

  applyFieldsFiltersToPivotTrees(pivotListComponentFieldList: PivotListComponentFieldDTO[],
                                 initialFieldTree: FieldBranch[],
                                 fieldIndex: number) {

    let filteredFieldTree: FieldBranch[];
    const newFieldTree: FieldBranch[] = [];
    const plcField = pivotListComponentFieldList[fieldIndex];

    if ((plcField.isFullChecked == null ? false : plcField.isFullChecked)) {
      filteredFieldTree = initialFieldTree;
    } else {
      const activeValues = plcField.filterFields.filter(f => f.isChecked).map(f => f.displayValue);
      const filtered = initialFieldTree.filter(initialField => activeValues.indexOf(initialField.displayValue.toString()) !== -1);
      filteredFieldTree = filtered;
    }

    filteredFieldTree.forEach(f => {
      if (!f.isBottomBranch) { f.children = this.applyFieldsFiltersToPivotTrees(pivotListComponentFieldList, f.children, fieldIndex + 1); }
      if (f.children.length > 0 || f.isBottomBranch) {
        newFieldTree.push(f);
      }
    });

    return newFieldTree;
  }

  createPivotViewArrays() {

    /* Create Left & Top View Array Lines */
    this.leftViewArrayLines = [];
    this.leftViewArrayLines = this.leftTreeToViewArray(this.leftFieldTree);

    this.topViewArrayLines = [];
    this.topTreeToViewArray(this.topFieldTree, this.topViewArrayLines, 0,
      this.listDto.listComponentColumnFieldList.length);

  }

  createFilterFields() {
    const topVisibilityLineArray = new Array<FieldBranch[]>();
    this.treeToVisibilityLineArray(this.topFieldTree, topVisibilityLineArray, 0);

    let i = 0;
    this.listDto.listComponentTopGroupFieldList.forEach(topColumn => {
      topColumn.filterFields = [];
      topColumn.isFullChecked = true;
      const displayValues = [];
      topVisibilityLineArray[i].forEach(field => {
        if (!displayValues.includes(field.displayValue)) {
          displayValues.push(field.displayValue)
        }
      });
      displayValues.sort();
      displayValues.forEach(displayValue => topColumn.filterFields.push(new FilterField(displayValue)));
      i++;
    });

    const leftVisibilityLineArray = new Array<FieldBranch[]>();
    this.treeToVisibilityLineArray(this.leftFieldTree, leftVisibilityLineArray, 0);

    i = 0;
    this.listDto.listComponentLeftGroupFieldList.forEach(leftColumn => {
      leftColumn.filterFields = [];
      leftColumn.isFullChecked = true;
      const displayValues = [];
      leftVisibilityLineArray[i].forEach(field => {
        if (!displayValues.includes(field.displayValue)) {
          displayValues.push(field.displayValue)
        }
      });
      displayValues.sort();
      displayValues.forEach(displayValue => leftColumn.filterFields.push(new FilterField(displayValue)));
      i++;
    });
  }

  editPivotLinesVisibility() {

    const topVisibilityLineArray = new Array<FieldBranch[]>();
    this.treeToVisibilityLineArray(this.topFieldTree, topVisibilityLineArray, 0);

    const leftVisibilityLineArray = new Array<FieldBranch[]>();
    this.treeToVisibilityLineArray(this.leftFieldTree, leftVisibilityLineArray, 0);

    topVisibilityLineArray.concat(leftVisibilityLineArray).forEach(line => {
      let islineHidden = true;

      if (line.filter(field => !field.isHiddenByParrent).length > 0) {
        islineHidden = false;
      }

      line.forEach(field => field.islineHidden = islineHidden);
    });

  }


  createPivotArrays() {

    /* Create Left & Top  Array Lines */
    this.leftArrayLines = [];
    this.leftArrayLines = this.treeToArray(this.leftFieldTree);

    this.topArrayLines = [];
    this.topArrayLines = this.treeToArray(this.topFieldTree);
  }

  createPivotValuesArray() {

    /* Create Values Array */
    this.valuesArray =
      this.calcValueArray(this.leftArrayLines, this.topArrayLines, this.listDto.listComponentColumnFieldList);

    /* Counters */
    this.totalTopCols = this.findTotalTopCols(this.topFieldTree, 0);

    /* Calculate colspan & rowspan for Top Left td */
    this.topLeftColspan = 0;
    this.leftArrayLines[0].forEach(fieldBranch => this.topLeftColspan += fieldBranch.colspan);

    this.topLeftRowspan = 1;
    this.topArrayLines[0].forEach(field => this.topLeftRowspan += field.rowspan);

    /* Combine Values Array to Left View Array Lines */
    for (let i = 0; i < this.leftViewArrayLines.length; i++) {
      this.leftViewArrayLines[i] = this.leftViewArrayLines[i].concat(this.valuesArray[i]);
    }
  }

  findTotalTopCols(branches: FieldBranch[], totalTopCols): number {
    branches.forEach(branch => {
      if (branch.isBottomBranch || !branch.isVisible) {
        totalTopCols += 1;
      }

      if (branch.children != null && branch.isVisible) {
        totalTopCols = this.findTotalTopCols(branch.children, totalTopCols)
      }
    });

    return totalTopCols;
  }

  createFieldTree(fieldList: PivotListComponentFieldDTO[], listResultsData: ListResultsData): FieldBranch[] {
    // let branchId = 1;
    const fieldTree: FieldBranch[] = [];
    listResultsData.listContent.forEach(row => {
      let branch: FieldBranch;
      let curLeftFieldBranches: FieldBranch[] = fieldTree;
      fieldList.forEach(lgField => {
        const fieldValue = row[lgField.code];
        const selectedBranch = curLeftFieldBranches.filter(x => x.displayValue === fieldValue);
        if (selectedBranch.length === 0) {
          branch = new FieldBranch();
          // branch.id = branchId++;
          branch.code = lgField.code;
          branch.displayValue = fieldValue;
          branch.type = 'group';
          branch.children = [];
          branch.listRows = [];
          branch.isBottomBranch = false;
          branch.isVisible = lgField.isExpanded;
          curLeftFieldBranches.push(branch);
        } else {
          branch = selectedBranch[0];
        }
        curLeftFieldBranches = branch.children;
      });

      branch.listRows.push(row);
      branch.isBottomBranch = true;
    });

    return fieldTree;
  }

  createSpansOnTopTree(fieldTree: FieldBranch[], multiplier: number): number {
    fieldTree.forEach(branch => {
      let span = multiplier;
      if (branch.children.length > 0) {
        span = this.createSpansOnTopTree(branch.children, multiplier);
      }
      branch.colspan = span;
    });

    let totalSpan = 0;
    fieldTree.forEach(branch => {
      totalSpan += branch.colspan;
    });

    return totalSpan;
  }

  getTopTreeValueLinesList(topFieldTree: FieldBranch[], rowLinesList: Array<Array<string[]>>) {

    topFieldTree
      .filter(fieldBranch => fieldBranch.isBottomBranch === true)
      .forEach(fieldBranch => {
        rowLinesList.push(fieldBranch.listRows);
      });

    topFieldTree.forEach(fieldBranch => {
      if (fieldBranch.children.length > 0) {
        this.getTopTreeValueLinesList(fieldBranch.children, rowLinesList);
      }
    });
  }

  leftTreeToArray(leftFieldTree: FieldBranch[]): Array<FieldBranch[]> {
    const arrayLines: Array<FieldBranch[]> = new Array<FieldBranch[]>();
    leftFieldTree.forEach(fieldBranch => {
      if (fieldBranch.children.length > 0) {
        const childArrayLines: FieldBranch[][] = this.leftTreeToArray(fieldBranch.children);
        childArrayLines.forEach(childLine => {
          arrayLines.push([fieldBranch].concat(childLine));
        });
      } else {
        arrayLines.push([fieldBranch]);
      }
    });

    return arrayLines;
  }

  topTreeToViewArray(fieldTree: FieldBranch[], arrayLines: Array<FieldBranch[]>, branchLevel: number, colSpanMultiplier) {
    if (arrayLines[branchLevel] == null) {
      arrayLines[branchLevel] = fieldTree;
    } else {
      const curArrayLines: FieldBranch[] = arrayLines[branchLevel];
      arrayLines[branchLevel] = curArrayLines.concat(fieldTree);
    }

    fieldTree.forEach(fieldBranch => {
      if (fieldBranch.children.length > 0 && fieldBranch.isVisible) {
        fieldBranch.rowspan = 1;
        fieldBranch.colspan = fieldBranch.children.length * colSpanMultiplier;
        this.topTreeToViewArray(fieldBranch.children, arrayLines, (branchLevel + 1), colSpanMultiplier);
      } else if (fieldBranch.children.length > 0) {
        const rowspan = this.findTreeRemainingDepth(fieldBranch, 1);
        fieldBranch.rowspan = rowspan;
        fieldBranch.colspan = colSpanMultiplier;
      } else {
        fieldBranch.rowspan = 1;
        fieldBranch.colspan = colSpanMultiplier;
      }
    });
  }

  treeToVisibilityLineArray(fieldTree: FieldBranch[], arrayLines: Array<FieldBranch[]>, branchLevel: number) {
    if (arrayLines[branchLevel] == null) {
      arrayLines[branchLevel] = fieldTree;
    } else {
      const curArrayLines: FieldBranch[] = arrayLines[branchLevel];
      arrayLines[branchLevel] = curArrayLines.concat(fieldTree);
    }

    fieldTree.forEach(fieldBranch => {
      if (fieldBranch.children.length > 0) {
        this.treeToVisibilityLineArray(fieldBranch.children, arrayLines, (branchLevel + 1));
      }
    });
  }

  leftTreeToViewArray(fieldTree: FieldBranch[]): Array<FieldBranch[]> {
    const arrayLines: Array<FieldBranch[]> = new Array<FieldBranch[]>();
    fieldTree.forEach(fieldBranch => {
      if (fieldBranch.children.length > 0 && fieldBranch.isVisible) {
        const childArrayLines: FieldBranch[][] = this.leftTreeToViewArray(fieldBranch.children);
        let rowspan = 0;
        fieldBranch.children.forEach(childBranch => rowspan += childBranch.rowspan);
        let counter = 0;

        childArrayLines.forEach(childLine => {
          if (counter === 0) {
            fieldBranch.rowspan = rowspan;
            fieldBranch.colspan = 1;
            arrayLines.push([fieldBranch].concat(childLine));
          } else {
            arrayLines.push(childLine);
          }
          counter++;
        });
      } else if (fieldBranch.children.length > 0) {
        const colspan = this.findTreeRemainingDepth(fieldBranch, 1);
        fieldBranch.rowspan = 1;
        fieldBranch.colspan = colspan;
        arrayLines.push([fieldBranch]);
      } else {
        fieldBranch.rowspan = 1;
        fieldBranch.colspan = 1;
        arrayLines.push([fieldBranch]);
      }
    });
    return arrayLines;
  }

  treeToArray(fieldTree: FieldBranch[]): Array<FieldBranch[]> {
    const arrayLines: Array<FieldBranch[]> = new Array<FieldBranch[]>();
    fieldTree.forEach(fieldBranch => {
      if (fieldBranch.children.length > 0 && fieldBranch.isVisible) {
        const childArrayLines: FieldBranch[][] = this.treeToArray(fieldBranch.children);
        childArrayLines.forEach(childLine => {
          arrayLines.push([fieldBranch].concat(childLine));
        });
      } else {
        arrayLines.push([fieldBranch]);
      }
    });
    return arrayLines;
  }

  createArrayFromTree(fieldTree: FieldBranch[]): FieldBranch[][] {
    const arrayLines: FieldBranch[][] = [];
    fieldTree.forEach(fieldBranch => {
      if (fieldBranch.children.length > 0) {
        const childArrayLines: FieldBranch[][] = this.createArrayFromTree(fieldBranch.children);
        childArrayLines.forEach(childLine => {
          arrayLines.push([fieldBranch].concat(childLine));
        });
      } else {
        arrayLines.push([fieldBranch]);
      }
    });
    return arrayLines;
  }

  reverseArray(array: FieldBranch[][]): FieldBranch[][] {
    const arrayLines: FieldBranch[][] = [];
    const totalRows = array.length;
    const totalCols = array[0].length;

    for (let colIndex = 0; colIndex < totalCols; colIndex++) {
      const line: FieldBranch[] = [];
      for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
        line.push(array[rowIndex][colIndex]);
      }
      arrayLines.push(line);
    }

    return arrayLines;
  }

  countTreePaths(fieldTree: FieldBranch[]): number {
    let pathCount = 0;
    fieldTree.forEach(fieldBranch => {
      if (fieldBranch.children.length > 0) {
        const childPathCount: number = this.countTreePaths(fieldBranch.children);
        pathCount += childPathCount;
      } else {
        pathCount += 1;
      }
    });
    return pathCount;
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
    this.getListResultData();
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
      this.getListResultData();
    }
  }

  clearFilterGroup() {
    this.clearValuesToListComponentLeftGroupFieldList();
    this.getListResultData();
  }

  filterGroupParrent(item) {
    this.setValueToListComponentLeftGroupFieldList(item['code'], item['value']);
    if (item['parrent'] != null) {
      this.filterGroupParrent(item['parrent'])
    }
  }

  isGroupContentDivVisible() {
    if (this.listDto.listComponentLeftGroupFieldList.length > 0) {
      return true;
    } else {
      return false;
    }
  }


  columnFilterFieldSearch(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.selectedListComponentField.filterFields.forEach(field => {
        if (this.filterFieldSearch === '' || this.filterFieldSearch == null) {
          field.isVisibleOnList = true;
        } else if (field.displayValue.match(this.filterFieldSearch)) {
          field.isVisibleOnList = true;
        } else {
          field.isVisibleOnList = false;
        }
      });
    }
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
      this.getListResultData();
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

  listEventOccured(event: any, column: ListComponentFieldDTO, row: string[]) {
    if (['listselected', 'listcleared'].includes(event.eventtype)) {
      //  this.updateListField(column, row);
    }
  }

  showHideSideMenus() {
    if (this.hideSideMenus) {
      this.hideSideMenus = false;
    } else {
      this.hideSideMenus = true;
    }
  }

  editBranchVisibility(branch: FieldBranch) {
    if (branch.isVisible) {
      branch.isVisible = false;
      this.editChildBranchesVisibility(branch.children, true);
    } else {
      branch.isVisible = true;
      this.editChildBranchesVisibility(branch.children, false);
    }
  }

  setAllFilterFieldsChecked($event: Event, item: PivotListComponentFieldDTO) {
    item.filterFields.forEach(filterField => filterField.isChecked = true);
    item.isFullChecked = true;
  }

  refreshIsCheckedFlag($event: Event, item: PivotListComponentFieldDTO) {
    const notCheckedFieldsCount = item.filterFields.filter(filterField => !filterField.isChecked).length;

    if (notCheckedFieldsCount > 0) {
      item.isFullChecked = false;
    } else {
      item.isFullChecked = true;
    }
  }

  setSelectedListComponentField(listComponentField: PivotListComponentFieldDTO) {
    this.selectedListComponentField = listComponentField;
    this.selectedListComponentField.filterFields.forEach(field => field.isVisibleOnList = true);
    this.filterFieldSearch = '';
  }

  returnVisibleFilterFields(filterFields: FilterField[]) {
    return filterFields.filter(field => field.isVisibleOnList);
  }

  private findTreeRemainingDepth(fieldBranch: FieldBranch, depth: number): number {
    if (fieldBranch.children.length > 0) {
      let newDepth = depth;
      if (!fieldBranch.children[0].islineHidden) {
        newDepth += 1;
      }

      return this.findTreeRemainingDepth(fieldBranch.children[0], newDepth);
    }
    return depth;
  }

  private calcValueArray(leftArrayLines: FieldBranch[][],
                         topArrayLines: FieldBranch[][],
                         listColumnFields: ListComponentFieldDTO[]): FieldBranch[][] {
    const valueArray: FieldBranch[][] = [];
    const id = 0;

    leftArrayLines.forEach(leftArrayLine => {

      const listRows: Array<string[]> = this.findListRowsOfArrayLine(leftArrayLine);
      const valueLine: FieldBranch[] = [];
      topArrayLines.forEach(topArrayLine => {

        const filteredRows: Array<string[]> =
          this.filterRows(listRows, topArrayLine);

        listColumnFields.forEach(columnField => {
          const valueBranch = this.calcValueBranch(columnField, filteredRows, leftArrayLine, topArrayLine);
          valueLine.push(valueBranch);
        });

      });

      valueArray.push(valueLine);
    });

    return valueArray;
  }

  private findListRowsOfArrayLine(arrayLines: FieldBranch[]): Array<string[]> {
    const isBottomBranch = arrayLines[arrayLines.length - 1].isBottomBranch;
    if (isBottomBranch) {
      return arrayLines[arrayLines.length - 1].listRows;
    }

    const listRows: Array<string[]> = [];
    this.findListRowsOfBranches(arrayLines[arrayLines.length - 1].children, listRows);

    return listRows;
  }

  private findListRowsOfBranches(branches: FieldBranch[], listRows: Array<string[]>) {

    branches.forEach(field => {

      if (field.isBottomBranch) {
        field.listRows.forEach(row => listRows.push(row));
      } else {
        this.findListRowsOfBranches(field.children, listRows);
      }
    });
  }

  private filterRows(listRows: Array<string[]>,
                     arrayLine: FieldBranch[]): Array<string[]> {

    let selectedListRows: Array<string[]> = [];
    let filteredListRows = listRows;

    arrayLine.forEach(branch => {
      filteredListRows.forEach(row => {
        const fieldValue = row[branch.code];
        if (fieldValue === branch.displayValue) {
          selectedListRows.push(row);
        }
      });
      filteredListRows = selectedListRows;
      selectedListRows = [];
    });

    return filteredListRows;
  }

  private setDefaultCommandParams() {
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

  private calcValueBranch(columnField: ListComponentFieldDTO,
                          rows: Array<string[]>,
                          leftArrayLine: FieldBranch[],
                          topArrayLine: FieldBranch[]): FieldBranch {

    let branch = this.listScriptsService.calcPivotValueBranch(this.listDto.id, columnField, rows, leftArrayLine, topArrayLine);
    if (branch == null) {
      branch = new FieldBranch();
      branch.displayValue = '';
      branch.type = 'empty-value';
    } else {
      branch.colspan = 1;
      branch.rowspan = 1;
      branch.code = columnField.code;
      branch.listRows = rows;
      branch.leftArrayLine = leftArrayLine;
      branch.topArrayLine = topArrayLine;
    }

    return branch;
  }

  private editChildBranchesVisibility(fields: FieldBranch[], isHidden: boolean) {
    fields.forEach(field => {
      field.isHiddenByParrent = isHidden;
      this.editChildBranchesVisibility(field.children, isHidden);
    });
  }

  private editInitialHiddenBranchesVisibility() {
    this.leftFieldTree.forEach(c => this.editInitialHiddenBranchVisibility(c));
    this.topFieldTree.forEach(c => this.editInitialHiddenBranchVisibility(c));
  }

  private editInitialHiddenBranchVisibility(branch: FieldBranch) {
    if (!branch.isVisible) {
      branch.isVisible = false;
      this.editChildBranchesVisibility(branch.children, true);
    }
    branch.children.forEach(c => this.editInitialHiddenBranchVisibility(c));
  }

  pivotCellClick(row: FieldBranch) {
    this.listScriptsService.pivotCellClick(this.listDto.id, row);
  }
}
