import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DynamicRequestService {

  constructor(public http: HttpClient) { }

  getFromBackend(url: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}${url}`);
  }

  getFromUrl(url: string): Observable<any> {
    return this.http.get<any>(`${url}`);
  }

  postToBackend(url: string, data: any): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}${url}`, data);
  }

  postToUrl(url: string, data: any): Observable<any> {
    return this.http.post<any>(`${url}`, data);
  }

  putToBackend(url: string, data: any): Observable<any> {
    return this.http.put<any>(`${environment.serverUrl}${url}`, data);
  }

  putToUrl(url: string, data: any): Observable<any> {
    return this.http.put<any>(`${url}`, data);
  }

  deleteFromBackend(url: string): Observable<any> {
    return this.http.delete<any>(`${environment.serverUrl}${url}`);
  }

  deleteFromUrl(url: string): Observable<any> {
    return this.http.get<any>(`${url}`);
  }

}

