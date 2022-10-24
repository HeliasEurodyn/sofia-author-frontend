import {Component, OnInit} from '@angular/core';
import {ChartDTO} from '../../../dtos/sofia/chart/chart-dto';
import {ActivatedRoute} from '@angular/router';
import {PageComponent} from '../../page/page-component';
import {ChartDesignerService} from '../../../services/crud/sofia/chart-designer.service';
import {Location} from '@angular/common';
import {ChartFieldDTO} from '../../../dtos/sofia/chart/chart-field-dto';
// import Chart from 'chart.js';
import * as uuid from 'uuid';
import {ListComponentFieldDTO} from '../../../dtos/sofia/list/list-component-field-d-t-o';
import {AceConfigInterface} from 'ngx-ace-wrapper';
import 'brace';
import 'brace/mode/sql';
import 'brace/theme/sqlserver';

@Component({
  selector: 'app-chart-designer-form',
  templateUrl: './chart-designer-form.component.html',
  styleUrls: ['./chart-designer-form.component.css']
})
export class ChartDesignerFormComponent extends PageComponent implements OnInit {

  public dto: ChartDTO;
  public selectedChartField: ChartFieldDTO;
  public mode: string;
  public visibleSection = 'general';
  public chartInstanceId = uuid.v4();

  public aceSQLEditorConfig: AceConfigInterface = {
    mode: 'sql',
    theme: 'sqlserver',
    readOnly : false
  };

  constructor(private activatedRoute: ActivatedRoute,
              private service: ChartDesignerService,
              private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.dto = new ChartDTO();
    this.dto.optionsJson =
      '{ \n' +
      '  "type": "line", \n' +
      '  "hover": false, \n' +
      '  "data": [], \n' +
      '  "options": { \n' +
      '    "scales": { \n' +
      '      "xAxes": [ \n' +
      '        { \n' +
      '          "stacked": true, \n' +
      '          "ticks": { \n' +
      '            "beginAtZero": true, \n' +
      '            "maxRotation": 0, \n' +
      '            "minRotation": 0 \n' +
      '          } \n' +
      '        } \n' +
      '      ], \n' +
      '      "yAxes": [ \n' +
      '        { \n' +
      '          "stacked": true \n' +
      '        } \n' +
      '      ] \n' +
      '    } \n' +
      '  } \n' +
      '} ';

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.service.getById(id).subscribe(dto => {
        this.dto = dto;
        this.dto.query = atob(this.dto.query);
        this.cleanIdsIfCloneEnabled();
      });
    }

  }

  save() {
    const dto = JSON.parse(JSON.stringify(this.dto));
    dto.query = btoa(this.dto.query);

    if (this.mode === 'edit-record') {
      this.service.update(dto).subscribe(data => {
        this.location.back();
      });

    } else {
      this.service.save(dto).subscribe(data => {
        this.location.back();
      });
    }
  }

  delete() {
    this.service.delete(this.dto.id).subscribe(data => {
      this.location.back();
    });
  }

  clearFields() {
    this.dto.chartFieldList = [];
  }

  generateFields() {
    this.service.generateDataFields(btoa(this.dto.query)).subscribe(chartFieldList => {

      chartFieldList
        .forEach(chartField => {
          chartField.description = chartField.name;
        });

      chartFieldList
        .forEach(chartField => {
          chartField.chartJson =
            '{\n' +
            '  "data": [],\n' +
            '  "fill": false,\n' +
            '  "borderColor": "#f17e5d",\n' +
            '  "backgroundColor": "transparent",\n' +
            '  "pointBorderColor": "#f17e5d",\n' +
            '  "pointRadius": 4,\n' +
            '  "pointHoverRadius": 14,\n' +
            '  "pointBorderWidth": 8\n' +
            '}';
        });

      if (chartFieldList.length > 0) {
        chartFieldList[0].chartJson =
          '{\n' +
          '  "labels": [],\n' +
          '  "datasets": [] \n' +
          '}'
      }

      const updatedChartFieldList = [];
      chartFieldList
        .forEach(newChartField => {
          const oldChartField = this.dto.chartFieldList.find(currentChartField => newChartField.name === currentChartField.name);
          if (oldChartField != null) {
            oldChartField.type = newChartField.type;
            oldChartField.size = newChartField.size;
            newChartField = oldChartField;
          }

          updatedChartFieldList.push(newChartField);
        });

      this.dto.chartFieldList = updatedChartFieldList;
    });
  }

  cleanIdsIfCloneEnabled() {
    if (this.params.has('TYPE')) {

      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {

        this.dto.id = null;
        this.dto.version = null;
        for (const appViewField of this.dto.chartFieldList) {
          appViewField.id = null;
          appViewField.version = null;
        }
        this.mode = 'new-record';
      }
    }
  }

  setSelectedChartField(chartField: ChartFieldDTO) {
    this.selectedChartField = chartField;
  }

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }

  checkJsonOptionsFormatError(jsonString: string) {
    if (jsonString === '') {
      return false;
    }
    try {
      const jsonObject = JSON.parse(
        jsonString
          .replace('#dataset', '[]')
          .replace('#datasets', '[]')
      );
      if (jsonObject && typeof jsonObject === 'object') {
        return false;
      }
    } catch (e) {
      return true;
    }
    return false;
  }

  displayGraph() {
    // this.service.getData(this.dto.id).subscribe(chartFieldList => {
    //
    //   chartFieldList
    //     .forEach(newChartField => {
    //       const oldChartField = this.dto.chartFieldList.find(currentChartField => newChartField.name === currentChartField.name);
    //       if (oldChartField != null) {
    //         oldChartField.dataset = newChartField.dataset;
    //       }
    //     });
    //
    //   const datasets: any[] = [];
    //
    //   const verticalAxesFieldList = chartFieldList.filter(chartField => chartField.name !== this.dto.horizontalAxe);
    //   verticalAxesFieldList.forEach(chartField => {
    //     const dataset = JSON.parse(chartField.chartJson);
    //     dataset['data'] = chartField.dataset;
    //     datasets.push(dataset);
    //   });
    //
    //   const horizontalAxesFieldList = chartFieldList.filter(chartField => chartField.name === this.dto.horizontalAxe);
    //   if (horizontalAxesFieldList.length !== 1) {
    //     return;
    //   }
    //
    //   const horizontalAxesField = horizontalAxesFieldList[0];
    //   const mainDataset = JSON.parse(horizontalAxesField.chartJson);
    //   mainDataset['labels'] = horizontalAxesField.dataset;
    //   mainDataset['datasets'] = datasets;
    //   const chartCanvas = document.getElementById(this.chartInstanceId);
    //
    //   const chartOptions = JSON.parse(this.dto.optionsJson);
    //   chartOptions['data'] = mainDataset;
    //   const lineChart = new Chart(chartCanvas, chartOptions);
    //
    // });

  }

  addFilter() {
    if (this.dto.filterList == null) {this.dto.filterList = []}
    const dto = new ListComponentFieldDTO();
    dto.editor = '';
    dto.visible = true;
    dto.required = false;
    dto.editable = false;
    dto.type = 'varchar';
    dto.shortOrder = this.genNextShortOrder(this.dto.filterList);
    dto.code = this.genNextComponentCode(this.dto.filterList);
    dto.description = dto.code;
    dto.formulaType = 'column';
    this.dto.filterList.push(dto);
  }

  genNextComponentCode(componentsList: any[]) {
    let prefixCount = 1;
    let code = 'filter_' + prefixCount;
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
      code = 'filter_' + prefixCount;
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

  removeFilter(filter: ListComponentFieldDTO) {
    this.dto.filterList =
      this.dto.filterList.filter(item => item !== filter);
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
}
