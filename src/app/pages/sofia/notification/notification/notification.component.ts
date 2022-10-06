import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {NotificationDTO} from '../../../../dtos/sofia/notification/notification-dto';
import {NotificationService} from '../../../../services/crud/sofia/notification.service';
import {PageComponent} from '../../page/page-component';
import {EventSourcePolyfill} from 'ng-event-source';
import {UserDto} from '../../../../dtos/sofia/user/user-dto';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent extends PageComponent implements OnInit, OnDestroy {

  public endpoint = 'notification';
  public notificationDTO: NotificationDTO = new NotificationDTO('Hello world')
  public loggedUser: UserDto;
  public eventSource: EventSourcePolyfill;

  constructor(private notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedin_user'));
    this.initListener();
  }

  ngOnDestroy(): void {
    this.eventSource.close();
    this.notificationService.unsubscribe(this?.loggedUser?.id).subscribe();
  }

  initListener(): void {

    this.eventSource = new EventSourcePolyfill(`${environment.serverUrl}/${this.endpoint}/subscribe`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
      }
    })

    this.eventSource.onopen = () => {
      console.log('open');
    }

    this.eventSource.onerror = () => {

      this.eventSource.close();
      this.initListener()
    };

    this.eventSource.addEventListener(this?.loggedUser?.id, this.notifyServerEvent, false);
    this.eventSource.addEventListener('keepAlive', this.keepAliveServerEvent, false);

  }

  notifyServerEvent = (event) => {
    console.log(event.data)
  }

  keepAliveServerEvent = (event) => {
    console.log(event.data)
  }

  send(): void {
    this.notificationService.sendNotification(this.notificationDTO).subscribe();
  }

}
