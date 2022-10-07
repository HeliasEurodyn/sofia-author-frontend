import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationDTO} from '../../../../dtos/sofia/notification/notification-dto';
import {SSENotificationService} from '../../../../services/crud/sofia/s-s-e-notification.service';
import {PageComponent} from '../../page/page-component';
import {UserDto} from '../../../../dtos/sofia/user/user-dto';
import {NotificationService} from '../../../../services/system/sofia/notification.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent extends PageComponent implements OnInit, OnDestroy {

  public endpoint = 'notification';
  public notificationDTO: NotificationDTO = new NotificationDTO('Hello world', 'da7a00e9-3b19-454d-b72b-8646d6eae678')
  public loggedUser: UserDto;

  constructor(private sseNotificationService: SSENotificationService,
              private notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedin_user'));
    this.sseNotificationService.subscribe(this.loggedUser.id, this.notifyServerEvent);
  }

  notifyServerEvent = (event) => {
    this.notificationService.showNotification('top', 'center', 'alert-info', 'fa-id-card', '<b>Server Event</b> ' + event.data);
  }

  ngOnDestroy(): void {
    this.sseNotificationService.unsubscribe(this?.loggedUser?.id).subscribe();
  }

  send(): void {
    this.sseNotificationService.sendNotification(this.notificationDTO).subscribe();
  }

}
