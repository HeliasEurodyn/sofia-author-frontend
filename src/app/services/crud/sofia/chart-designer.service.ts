import { Injectable } from '@angular/core';
import {CrudService} from '../common/crud.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ChartFieldDTO} from '../../../dtos/sofia/chart/chart-field-dto';

@Injectable({
  providedIn: 'root'
})
export class ChartDesignerService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'chart-designer');
  }

  generateDataFields(query: string): Observable<ChartFieldDTO[]> {
    return this.http.post<any>(`${environment.serverUrl}/${this.endpoint}/generate-data-fields`,
      {query: query});
  }

  getData(id: number): Observable<ChartFieldDTO[]> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/data?id=${id}`);
  }
}
