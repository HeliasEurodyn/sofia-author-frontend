import {Component, OnInit} from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {ReportDesignerService} from '../../../services/crud/report-designer.service';
import { ReportDTO } from 'app/dtos/report/report-dto';

@Component({
  selector: 'app-report-designer-list',
  templateUrl: './report-designer-list.component.html',
  styleUrls: ['./report-designer-list.component.css']
})
export class ReportDesignerListComponent extends PageComponent implements OnInit {

  public tableData: Array<ReportDTO>;
  public filteredTableData: Array<ReportDTO>;
  public tags: Array<String>
  public showTagGrouping: Boolean;
  public showTagButtonTitle: String;
  constructor(private service: ReportDesignerService,
              private navigatorService: CommandNavigatorService) {
    super();
  }

  ngOnInit(): void {
    this.tags = new Array<String>();
    this.showTagButtonTitle = 'Show Grouping'
    this.showTagGrouping = false;
    this.refresh();
    this.refreshTag();
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

  delete(row: any) {
    this.service.delete(row['id']).subscribe(data => {
      this.refresh();
    });
  }

  onFocusIn() {
    this.refresh();
  }

  openPage(id: string) {
    let command = 'STATICPAGE[NAME:report-designer-form,LOCATE:(ID=' + id + ')]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openNewPage() {
    let command = 'STATICPAGE[NAME:report-designer-form]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  clone(id: string) {
    let command = 'STATICPAGE[NAME:report-designer-form,TYPE:CLONE,LOCATE:(ID=' + id + ')]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

}
