import {Component, OnInit} from '@angular/core';
import {TableService} from '../../../../services/crud/sofia/table.service';
import {PageComponent} from '../../page/page-component';
import {CommandNavigatorService} from '../../../../services/system/sofia/command-navigator.service';
import {NotificationService} from '../../../../services/system/sofia/notification.service';

@Component({
  selector: 'app-table-designer-list',
  templateUrl: './table-designer-list.component.html',
  styleUrls: ['./table-designer-list.component.css']
})
export class TableDesignerListComponent extends PageComponent implements OnInit {
  public tableData: any;

  constructor(private service: TableService,
              private navigatorService: CommandNavigatorService,
              private notificationService: NotificationService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.setTitle('Table Designer List');
    this.refresh();
  }

  onFocusIn() {
    this.refresh();
  }

  showPreviousPageButton() {
    if (this.previousPage === null) {
      return false;
    } else {
      return true;
    }
  }

  navigateToPreviousPage() {
    this.navigatorService.navigateToPreviousPage(this.pageId);
  }

  navigateToNextPage() {
    this.navigatorService.navigateToNextPage(this.pageId);
  }

  showNextPageButton() {
    if (this.nextPage === null) {
      return false;
    } else {
      return true;
    }
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
    let command = 'STATICPAGE[NAME:table-designer-form,TITLE:Form,TYPE:CLONE,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }


  openPageInNewTab(id: string) {
    let command = 'STATICPAGE[NAME:table-designer-form,TAB:new,SIDEBAR-STATUS:minimized,TITLE:Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openPage(id: string) {
    let command = 'STATICPAGE[NAME:table-designer-form,TITLE:Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openNewPage() {
    let command = 'STATICPAGE[NAME:table-designer-form,TITLE:Form,PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  showNotification() {
    this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-id-card', '<b>Error 500</b> Something Went Wrong');
  }
}
