import {Component, OnInit} from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {TableComponentDesignerService} from '../../../services/crud/table-component-designer.service';
import {XlsImportDesignerService} from '../../../services/crud/xls-import-designer.service';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import { XlsImportLineDTO } from 'app/dtos/xls-import/xls-import-line-dto';

@Component({
  selector: 'app-xls-import-designer-list',
  templateUrl: './xls-import-designer-list.component.html',
  styleUrls: ['./xls-import-designer-list.component.css']
})
export class XlsImportDesignerListComponent extends PageComponent implements OnInit {

  public tableData: Array<XlsImportLineDTO>;
  public filteredTableData: Array<XlsImportLineDTO>;
  public tags: Array<String>
  public showTagGrouping: Boolean;
  public showTagButtonTitle: String;

  constructor(private tableComponentService: TableComponentDesignerService,
              private service: XlsImportDesignerService,
              private navigatorService: CommandNavigatorService) {
    super();
  }

  ngOnInit(): void {
    this.tags = new Array<String>();
    this.showTagButtonTitle = 'Show Grouping'
    this.showTagGrouping = false;
    this.refreshTag();
    this.refresh();
  }

  refresh() {
    this.service.get().subscribe(data => {
      this.tableData = data;
      this.filteredTableData = this?.tableData
    });
  }

  refreshTag(){
    this.service.getTags().subscribe(data => {
      this.tags = data;
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

  filterGroup(item: any) {
    this.service.getDataByTag(item.title).subscribe(data => {
      this.filteredTableData = data;
    });

  }

  clearFilterGroup() {
    this.filteredTableData = this?.tableData;
   
 }

  showTagsGrouping() {
    this.showTagGrouping = !this.showTagGrouping
    if (this.showTagGrouping === true) {
      this.showTagButtonTitle = 'Hide Grouping'
    } else {
      this.showTagButtonTitle = 'Show Grouping'
    }
  }

}
