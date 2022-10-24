import { Component, OnInit } from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {TimelineDesignerService} from '../../../services/crud/timeline-designer.service';
import {CommandNavigatorService} from '../../../services/system/sofia/command-navigator.service';

@Component({
  selector: 'app-timeline-designer-list',
  templateUrl: './timeline-designer-list.component.html',
  styleUrls: ['./timeline-designer-list.component.css']
})
export class TimelineDesignerListComponent extends  PageComponent implements OnInit {

  tableData: any[];

  constructor(private service: TimelineDesignerService,
              private navigatorService: CommandNavigatorService) {
    super();
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.service.get().subscribe(data => {
      this.tableData = data;
    });
  }

  createNew() {
    let command = 'STATICPAGE[NAME:timeline-designer-form,TITLE:Timeline Designer Form]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  edit(id: string) {
    let command = 'STATICPAGE[NAME:timeline-designer-form,TITLE:Timeline Designer Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  delete(id: string) {
    this.service.delete(id).subscribe(data => {
      this.refresh();
    });
  }
}
