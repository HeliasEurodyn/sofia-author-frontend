import {Component, OnInit} from '@angular/core';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {PageComponent} from '../../page/page-component';
import {AppViewService} from '../../../services/crud/app-view.service';
import { AppViewDTO } from 'app/dtos/appview/app-view-dto';

@Component({
  selector: 'app-app-view-designer-list',
  templateUrl: './app-view-designer-list.component.html',
  styleUrls: ['./app-view-designer-list.component.css']
})
export class AppViewDesignerListComponent extends PageComponent implements OnInit {


  public tableData: Array<AppViewDTO>;
  public filteredTableData: Array<AppViewDTO>;
  public tags: Array<String>
  public showTagGrouping: Boolean;
  public showTagButtonTitle: String;

  constructor(private service: AppViewService,
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
    let command = 'STATICPAGE[NAME:appview-designer-form,TITLE:Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openNewPage() {
    let command = 'STATICPAGE[NAME:appview-designer-form,TITLE:Form,PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  clone(id: string) {
    let command = 'STATICPAGE[NAME:appview-designer-form,TYPE:CLONE,TITLE:Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';

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
