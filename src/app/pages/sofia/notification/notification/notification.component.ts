import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {NotificationDTO} from '../../../../dtos/sofia/notification/notification-dto';
import {NotificationService} from '../../../../services/crud/sofia/notification.service';
import {PageComponent} from '../../page/page-component';
import {EventSourcePolyfill} from 'ng-event-source';
import {UserDto} from '../../../../dtos/sofia/user/user-dto';
import {concatMap} from 'rxjs/operators';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent extends PageComponent implements OnInit, OnDestroy {

  public endpoint = 'notification';
  public notificationDTO: NotificationDTO = new NotificationDTO('Hello world')
  public userDto: UserDto;
  public eventSource: EventSourcePolyfill;

  constructor(private notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {
       this.initListener();
  }

  ngOnDestroy(): void {
    this.eventSource.close();
    this.notificationService.unsubscribe().subscribe();
  }

  initListener(): void {

    this.userDto = JSON.parse(localStorage.getItem('loggedin_user'));

    this.eventSource = new EventSourcePolyfill(`${environment.serverUrl}/${this.endpoint}/subscribe`, {
      headers: {
        'Authorization': 'Bearer ' +  localStorage.getItem('jwt_token')
      }
    })

    this.eventSource.onopen = (e) => {
      console.log('open');
    }


    this.eventSource.onerror = (e) => {
      if (e.readyState !== EventSource.CLOSED) {
        this.eventSource.close();
      }
      this.notificationService
        .unsubscribe()
        .pipe(concatMap(() => this.initListener))
        .subscribe()
    };

    this.eventSource.addEventListener(this?.userDto?.username, this.notifyServerEvent, false);
    this.eventSource.addEventListener('keepAlive', this.keepAliveServerEvent, false);
    this.eventSource.addEventListener(this?.userDto?.username, this.handleServerEvent, false);

  }

  notifyServerEvent = (event) => {
    console.log(event.data)
  }

  keepAliveServerEvent = (event) => {
    console.log(event.data)
  }

  handleServerEvent = (event) => {
    console.log(event.data)
  }

  send(): void {
    this.notificationService.sendNotification(this.notificationDTO).subscribe();
  }

}
