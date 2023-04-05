import {Component, OnInit} from '@angular/core';
import { ViewDTO } from 'app/dtos/view/view-dto';
import {ViewService} from 'app/services/crud/view.service';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {PageComponent} from '../../page/page-component';

@Component({
  selector: 'app-view-designer-list',
  templateUrl: './view-designer-list.component.html',
  styleUrls: ['./view-designer-list.component.css']
})
export class ViewDesignerListComponent extends PageComponent implements OnInit {

  public tableData: Array<ViewDTO>;
  public filteredTableData: Array<ViewDTO>;
  public tags: Array<String>
  public showTagGrouping: Boolean;
  public showTagButtonTitle: String;
  constructor(private service: ViewService,
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

  onFocusIn() {
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
