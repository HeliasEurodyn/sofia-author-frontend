import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../common/crud.service';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelineService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'timeline');
  }

  getByIdWithParams(id: any, extraParams: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/data/?id=${id}${extraParams}`);
  }
}
