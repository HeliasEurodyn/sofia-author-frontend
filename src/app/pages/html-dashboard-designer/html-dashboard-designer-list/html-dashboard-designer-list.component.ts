import {Component, OnInit} from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {HtmlDashboardDesignerService} from '../../../services/crud/html-dashboard-designer.service';

@Component({
  selector: 'app-html-dashboard-designer-list',
  templateUrl: './html-dashboard-designer-list.component.html',
  styleUrls: ['./html-dashboard-designer-list.component.css']
})
export class HtmlDashboardDesignerListComponent extends PageComponent implements OnInit {

  public tableData: any;

  constructor(private service: HtmlDashboardDesignerService,
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
    let command = 'STATICPAGE[NAME:html-dashboard-designer-form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openNewPage() {
    let command = 'STATICPAGE[NAME:html-dashboard-designer-form,PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  clone(id: string) {
    let command = 'STATICPAGE[NAME:html-dashboard-designer-form,TYPE:CLONE,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';

    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

}
