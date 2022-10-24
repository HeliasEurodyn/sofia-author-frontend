import {Component, OnInit} from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {TableComponentDesignerService} from '../../../services/crud/sofia/table-component-designer.service';
import {XlsImportDesignerService} from '../../../services/crud/sofia/xls-import-designer.service';
import {CommandNavigatorService} from '../../../services/system/sofia/command-navigator.service';

@Component({
  selector: 'app-xls-import-designer-list',
  templateUrl: './xls-import-designer-list.component.html',
  styleUrls: ['./xls-import-designer-list.component.css']
})
export class XlsImportDesignerListComponent extends PageComponent implements OnInit {

  public tableData: any;

  constructor(private tableComponentService: TableComponentDesignerService,
              private service: XlsImportDesignerService,
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

  delete(row: any) {
    this.service.delete(row['id']).subscribe(data => {
      this.refresh();
    });
  }

  onFocusIn() {
    this.refresh();
  }

  openPage(id: string) {
    let command = 'STATICPAGE[NAME:xls-import-designer-form,LOCATE:(ID=' + id + ')]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openNewPage() {
    let command = 'STATICPAGE[NAME:xls-import-designer-form]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  clone(id: string) {
    let command = 'STATICPAGE[NAME:xls-import-designer-form,TYPE:CLONE,LOCATE:(ID=' + id + ')]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

}
