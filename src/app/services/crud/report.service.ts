import {Injectable} from '@angular/core';
import {CrudService} from './common/crud.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'report');
  }

  print(id: any, reportParametersMap: Map<any, any>) {
    const headers = new HttpHeaders();
    const reportParameters = this.mapToArray(reportParametersMap);
    // headers = headers.append('Accept', 'application/pdf');
    return this.http.post(`${environment.serverUrl}/${this.endpoint}/print?id=${id}`, reportParameters, {
      headers: headers,
      observe: 'response',
      responseType: 'blob'
    });
  }

  private mapToArray(data: Map<any, any>) {
    const dataArray = {};
    data.forEach((val: string, key: string) => {
      dataArray[key] = val;
    });

    return dataArray;
  }

  getReportType(id: any): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/type?id=${id}`);
  }

}
