import {Component, OnInit} from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {CommandNavigatorService} from '../../../../services/system/sofia/command-navigator.service';
import {ReportDesignerService} from '../../../../services/crud/sofia/report-designer.service';

@Component({
  selector: 'app-report-designer-list',
  templateUrl: './report-designer-list.component.html',
  styleUrls: ['./report-designer-list.component.css']
})
export class ReportDesignerListComponent extends PageComponent implements OnInit {

  public tableData: any;

  constructor(private service: ReportDesignerService,
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
