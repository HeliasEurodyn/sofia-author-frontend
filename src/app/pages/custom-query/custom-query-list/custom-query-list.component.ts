import {Component, OnInit} from '@angular/core';
import { CustomQueryDTO } from 'app/dtos/customquery/custom-query-dto';
import {CustomQueryDesignerService} from '../../../services/crud/custom-query-designer.service';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {PageComponent} from '../../page/page-component';

@Component({
  selector: 'app-custom-query-list',
  templateUrl: './custom-query-list.component.html',
  styleUrls: ['./custom-query-list.component.css']
})
export class CustomQueryListComponent extends PageComponent implements OnInit {
  public tableData: Array<CustomQueryDTO>;
  public filteredTableData: Array<CustomQueryDTO>;
  public tags: Array<String>
  public showTagGrouping: Boolean;
  public showTagButtonTitle: String;

  constructor(private service: CustomQueryDesignerService,
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

  createNew() {
    let command = 'STATICPAGE[NAME:custom-query-form,TITLE:Custom Queries]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  edit(id: string) {
    let command = 'STATICPAGE[NAME:custom-query-form,TITLE:Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  delete(id: string) {
    this.service.delete(id).subscribe(data => {
      this.refresh();
    });
  }

  clone(id: string) {
    let command = 'STATICPAGE[NAME:custom-query-form,TITLE:Custom Query Form,TYPE:CLONE,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
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

 isGroupContentDivVisible() {
  if (this?.tags?.length > 0) {
    return true;
  } else {
    return false;
  }
}
}
