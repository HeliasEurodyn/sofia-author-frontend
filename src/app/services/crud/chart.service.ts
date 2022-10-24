import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {CrudService} from './common/crud.service';
import {ListComponentFieldDTO} from '../../dtos/list/list-component-field-d-t-o';

@Injectable({
  providedIn: 'root'
})
export class ChartService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'chart');
  }

  getChartById(id: number, extraParamsMap: Map<any, any>): Observable<any> {
    let parameters = '';
    if (extraParamsMap != null) {
      extraParamsMap.forEach((value: string, key: string) => {
        parameters += '&' + key + '=' + value;
      });
    }

    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/by-id?id=${id}${parameters}`);
  }

  getData(id: number, filterList: ListComponentFieldDTO[], extraParamsMap: Map<any, any>): Observable<any> {
    let parameters = '';
    if (filterList != null) {
      filterList.filter(field => field.code !== '').forEach(filter => {
        parameters += '&' + filter.code + '=' + filter.fieldValue;
      });
    }

    if (extraParamsMap != null) {
      extraParamsMap.forEach((value: string, key: string) => {
        parameters += '&' + key + '=' + value;
      });
    }

    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/data?id=${id}${parameters}`);
  }
}
