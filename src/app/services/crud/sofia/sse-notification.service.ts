import {Injectable} from '@angular/core';
import {CrudService} from '../common/crud.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {EventSourcePolyfill} from 'ng-event-source';
import {SseNotificationResponseDTO} from '../../../dtos/sofia/sse-notification/sse-notification-response-dto';

@Injectable({
  providedIn: 'root'
})
export class SseNotificationService extends CrudService<any> {
  private eventSource: EventSourcePolyfill = null;

  constructor(public http: HttpClient) {
    super(http, 'sse-notification');
  }

  sendNotification(sseNotificationResponseDTO: SseNotificationResponseDTO): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/${this.endpoint}/send`, sseNotificationResponseDTO);
  }

  unsubscribe(topic: any): Observable<any> {
    this.eventSource.close();
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/unsubscribe?id=${topic}`);
  }

  closeEventSource() {
    this.eventSource.close();
  }

  subscribe(topic, eventListenerFunction: (event) => void): EventSourcePolyfill {
    this.eventSource = new EventSourcePolyfill(`${environment.serverUrl}/${this.endpoint}/subscribe`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
      }
    })

    this.eventSource.onopen = () => {
      console.log('open');
    }

    this.eventSource.addEventListener('keepAlive', (ev: MessageEvent) => {
      console.log(ev.data)
    }, false);

    this.eventSource.addEventListener(topic, eventListenerFunction, false);

    this.eventSource.onerror = () => {
      this.eventSource.close();
      this.eventSource = this.subscribe(topic, eventListenerFunction);
    };

    return this.eventSource;
  }

}
