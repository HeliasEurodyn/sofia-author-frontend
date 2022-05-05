import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DynamicRequestService {

  constructor(public http: HttpClient) { }

  getFromBackend(url: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}${url}`);
  }

}
