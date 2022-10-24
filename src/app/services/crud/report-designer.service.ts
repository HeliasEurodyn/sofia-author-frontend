import {Injectable} from '@angular/core';
import {CrudService} from './common/crud.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ReportDTO} from '../../dtos/report/report-dto';

@Injectable({
  providedIn: 'root'
})
export class ReportDesignerService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'report-designer');
  }

  saveMultipartFormData(dto: ReportDTO, fileToUpload: File): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'content-type': 'multipart/form-data'
        }
      )
    };

    const dtoStr = JSON.stringify(dto);
    const formData: FormData = new FormData();
    const dtoBase64 = btoa(dtoStr)
    formData.append('report', dtoBase64);
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http
      .post(`${environment.serverUrl}/${this.endpoint}/report-file`, formData, httpOptions);
  }

  // print(id: any, reportParametersMap: Map<any, any>) {
  //   const headers = new HttpHeaders();
  //   const reportParameters = this.mapToArray(reportParametersMap);
  //   // headers = headers.append('Accept', 'application/pdf');
  //   return this.http.post(`${environment.serverUrl}/${this.endpoint}/print?id=${id}`, reportParameters, {
  //     headers: headers,
  //     observe: 'response',
  //     responseType: 'blob'
  //   });
  // }

  private mapToArray(data: Map<any, any>) {
    const dataArray = {};
    data.forEach((val: string, key: string) => {
      dataArray[key] = val;
    });

    return dataArray;
  }

  save(dto: ReportDTO): Observable<any> {
    return this.http.post(`${environment.serverUrl}/${this.endpoint}`, dto);
  }

  // getReportType(id: any): Observable<any> {
  //   return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/type?id=${id}`);
  // }

  downloadFile(id: any) {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/jrxml');

    return this.http.get(`${environment.serverUrl}/${this.endpoint}/report-file?id=${id}` , {
      headers: headers,
      observe: 'response',
      responseType: 'blob'
    });
  }

}
