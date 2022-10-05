import { Injectable } from '@angular/core';
import {CrudService} from '../common/crud.service';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {NotificationDTO} from '../../../dtos/sofia/notification/notification-dto';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'notification');
  }

  sendNotification(notificationDTO: NotificationDTO): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/${this.endpoint}/send`, notificationDTO);
  }







}
