import {Component, OnInit} from '@angular/core';
import {CommandNavigatorService} from '../../../../services/system/sofia/command-navigator.service';
import {PageComponent} from '../../page/page-component';
import {FormDesignerService} from '../../../../services/crud/sofia/form-designer.service';
import {NotificationService} from '../../../../services/system/sofia/notification.service';

@Component({
  selector: 'app-form-designer-list',
  templateUrl: './form-designer-list.component.html',
  styleUrls: ['./form-designer-list.component.css']
})
export class FormDesignerListComponent extends PageComponent implements OnInit {

  public tableData: any;

  constructor(private service: FormDesignerService,
              private navigatorService: CommandNavigatorService,
              private notificationService: NotificationService) {
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

  onFocusIn() {
    this.refresh();
  }

  delete(row: any) {
    this.service.delete(row['id']).subscribe(data => {
      this.refresh();
    });
  }

  openPage(id: string) {
    let command = 'STATICPAGE[NAME:form-designer-form,TITLE:Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }


  openNewPage() {
    let command = 'STATICPAGE[NAME:form-designer-form,TITLE:Form,PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  clone(id: string) {
    let command = 'STATICPAGE[NAME:form-designer-form,TITLE:Form,TYPE:CLONE,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
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
