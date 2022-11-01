import {Component, OnInit} from '@angular/core';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {PageComponent} from '../../page/page-component';
import {SseNotificationTemplateService} from '../../../services/crud/sse-notification-template.service';

@Component({
  selector: 'app-sse-notification-template-list',
  templateUrl: './sse-notification-template-list.component.html',
  styleUrls: ['./sse-notification-template-list.component.css']
})
export class SseNotificationTemplateListComponent extends  PageComponent implements OnInit {

  tableData: any[];

  constructor(private service: SseNotificationTemplateService,
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

  createNew() {
    let command = 'STATICPAGE[NAME:notification-template-form,TITLE:Notification Template Form]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  edit(id: string) {
    let command = 'STATICPAGE[NAME:notification-template-form,TITLE:Notification Template Form,LOCATE:(ID=' + id + '),PARENT-PAGEID:$PAGEID]';
    command = command.replace('$PAGEID', this.pageId);
    this.navigatorService.navigate(command);
  }

  delete(id: string) {
    this.service.delete(id).subscribe(data => {
      this.refresh();
    });
  }

}
