import {Component, OnInit} from '@angular/core';
import {CommandNavigatorService} from '../../../../services/system/sofia/command-navigator.service';
import {PageComponent} from '../../page/page-component';
import {ListDesignerService} from '../../../../services/crud/sofia/list-designer.service';
import {NotificationService} from '../../../../services/system/sofia/notification.service';

@Component({
  selector: 'app-list-designer-list',
  templateUrl: './list-designer-list.component.html',
  styleUrls: ['./list-designer-list.component.css']
})
export class ListDesignerListComponent extends PageComponent implements OnInit {
  public tableData: any;

  constructor(private service: ListDesignerService,
              private navigatorService: CommandNavigatorService,
              private notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {
    this.refresh();
  }

  onFocusIn() {
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

  openPage(id: string) {
    let command = 'STATICPAGE[NAME:list-designer-form,TITLE:Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openTranslationPage(id: string) {
    let command = 'STATICPAGE[NAME:list-designer-translation-form,LOCATE:(ID=' + id + ')]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  openNewPage() {
    let command = 'STATICPAGE[NAME:list-designer-form,TITLE:Form,PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  clone(id: string) {
    let command = 'STATICPAGE[NAME:list-designer-form,TITLE:Form,TYPE:CLONE,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  clearCache() {
    this.service.clearCache().subscribe(data => {
      this.notificationService.showNotification('top', 'center', 'alert-info',
        'fa-check', '<b>Form Cache</b> is cleared on the backend & all the frontends.');
    });
  }
}
