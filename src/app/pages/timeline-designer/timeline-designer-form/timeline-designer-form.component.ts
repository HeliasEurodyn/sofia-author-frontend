import { Component, OnInit } from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {ActivatedRoute} from '@angular/router';
import {TimelineDesignerService} from '../../../services/crud/timeline-designer.service';
import {TimelineDTO} from '../../../dtos/timeline/timeline-dto';
import {Location} from '@angular/common';
import {AceConfigInterface} from 'ngx-ace-wrapper';
import 'brace';
import 'brace/mode/sql';
import 'brace/theme/sqlserver';
import {ListComponentFieldDTO} from '../../../dtos/list/list-component-field-d-t-o';

@Component({
  selector: 'app-timeline-designer-form',
  templateUrl: './timeline-designer-form.component.html',
  styleUrls: ['./timeline-designer-form.component.css']
})
export class TimelineDesignerFormComponent extends PageComponent implements OnInit {

  public dto: TimelineDTO;
  public mode: string;
  public visibleSection = 'general';

  public aceSQLEditorConfig: AceConfigInterface = {
    mode: 'sql',
    theme: 'sqlserver',
    readOnly : false
  };

  constructor(private activatedRoute: ActivatedRoute,
              private service: TimelineDesignerService,
              private location: Location) {
    super();
  }

  ngOnInit(): void {

    this.initNav(this.activatedRoute);
    let id = '0';
    this.mode = 'new-record';
    this.dto = new TimelineDTO();

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.service.getById(id).subscribe(data => {
        this.dto = data;
        this.dto.query = atob(this.dto?.query);
      });
    }
  }

  save() {
    const dtoToBeSaved = JSON.parse(JSON.stringify(this.dto));
    const base64Query = btoa(dtoToBeSaved?.query);
    dtoToBeSaved.query = base64Query;

    if (this.mode === 'edit-record') {
      console.log(dtoToBeSaved);
      this.service.update(dtoToBeSaved).subscribe(data => {
        this.location.back();
      });

    } else {
      this.service.save(dtoToBeSaved).subscribe(data => {
        this.location.back();
      });
    }
  }

  delete() {
    this.service.delete(this.dto.id).subscribe(data => {
      this.location.back();
    });
  }

  // TODO : Duplicated Code needs refactoring

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
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
