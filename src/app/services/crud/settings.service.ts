import {Injectable} from '@angular/core';
import {CrudService} from './common/crud.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'settings');
  }

  getLoginImage(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/login-image`, requestOptions);
  }

  getSidebarImage(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/sidebar-image`, requestOptions);
  }

  getIcon(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/icon`, requestOptions);
  }

  getName(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/name`, requestOptions);
  }

}
