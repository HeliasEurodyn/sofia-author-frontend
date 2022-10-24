import {Component, OnInit} from '@angular/core';
import {CommandNavigatorService} from '../../../services/system/sofia/command-navigator.service';
import {PageComponent} from '../../page/page-component';
import {TableComponentDesignerService} from '../../../services/crud/sofia/table-component-designer.service';

@Component({
  selector: 'app-component-designer-list',
  templateUrl: './component-designer-list.component.html',
  styleUrls: ['./component-designer-list.component.css']
})
export class ComponentDesignerListComponent extends PageComponent implements OnInit {
  public tableData: any;

  constructor(private service: TableComponentDesignerService,
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

  clone(id: string) {
    let command = 'STATICPAGE[NAME:component-designer-form,TITLE:Form,TYPE:CLONE,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openPage(id: string) {
    let command = 'STATICPAGE[NAME:component-designer-form,TITLE:Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }


  openNewPage() {
    let command = 'STATICPAGE[NAME:component-designer-form,TITLE:Form,PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

}
