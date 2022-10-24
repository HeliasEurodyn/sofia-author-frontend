import {Component, OnInit} from '@angular/core';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {DashboardDesignerService} from '../../../services/crud/dashboard-designer.service';
import {PageComponent} from '../../page/page-component';

@Component({
  selector: 'app-dashboard-designer-list',
  templateUrl: './dashboard-designer-list.component.html',
  styleUrls: ['./dashboard-designer-list.component.css']
})
export class DashboardDesignerListComponent extends PageComponent implements OnInit {

  public tableData: any;

  constructor(private service: DashboardDesignerService,
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
    let command = 'STATICPAGE[NAME:dashboard-designer-form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openNewPage() {
    let command = 'STATICPAGE[NAME:dashboard-designer-form,PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  clone(id: string) {
    let command = 'STATICPAGE[NAME:dashboard-designer-form,TYPE:CLONE,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';

    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

}
