import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ListDTO} from '../../dtos/list/list-dto';
import {CrudService} from './common/crud.service';

@Injectable({
  providedIn: 'root'
})
export class PivotListService extends CrudService<any> {

  protected cachedDtos = new Map();

  constructor(public http: HttpClient) {
    super(http, 'pivot-list');
  }

  getListById(id: any, instanceVersion: string): Observable<any> {
    const dtoString = localStorage.getItem('cachedList' + id);
    if (dtoString != null) {
      const dto = JSON.parse(dtoString);
      if (dto.instanceVersion.toString() === instanceVersion) {
        return new Observable(observer => observer.next(dto));
      }
    }

    return this.requestListFromBackend(id);
  }

  requestListFromBackend(id: any): Observable<any> {
    const observable = this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/ui?id=${id}`);
    // observable.subscribe(dto => localStorage.setItem('cachedList' + id, JSON.stringify(dto)));
    return observable;
  }

  getVersion(id: any): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/instance-version?id=${id}`, requestOptions);
  }

  getListResult(parametersMap: Map<string, string>, id: string) {
    let parameters = '?id=' + id;
    for (const key of parametersMap.keys()) {
      parameters += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(parametersMap.get(key));
    }
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/results/${parameters}`, );
  }

  getListResultDataExcel(listDto: ListDTO) {
    const httpOptions = {
      responseType: 'blob' as 'json',
    };
    return this.http.post<any>(`${environment.serverUrl}/${this.endpoint}/data-excel`, listDto, httpOptions);
  }

}
