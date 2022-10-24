import {Component, OnInit} from '@angular/core';
import {ViewService} from 'app/services/crud/sofia/view.service';
import {CommandNavigatorService} from '../../../services/system/sofia/command-navigator.service';
import {PageComponent} from '../../page/page-component';

@Component({
  selector: 'app-view-designer-list',
  templateUrl: './view-designer-list.component.html',
  styleUrls: ['./view-designer-list.component.css']
})
export class ViewDesignerListComponent extends PageComponent implements OnInit {

  public tableData: any;

  constructor(private service: ViewService,
              private navigatorService: CommandNavigatorService) {
    super();
  }

  ngOnInit(): void {
    this.refresh();
  }

  onFocusIn() {
    this.refresh();
  }

  refresh() {
    this.service.get().subscribe(data => {
      this.tableData = data;
    });
  }

  delete(row: any) {
    this.service.delete(row['id']).subscribe(data => {
      this.refresh();
    });
  }

  openPage(id: string) {
    let command = 'STATICPAGE[NAME:view-designer-form,TITLE:Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openNewPage() {
    let command = 'STATICPAGE[NAME:view-designer-form,TITLE:Form,PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  clone(id: string) {
    let command = 'STATICPAGE[NAME:view-designer-form,TITLE:Form,TYPE:CLONE,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

}
