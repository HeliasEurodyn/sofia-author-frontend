import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CrudService} from './common/crud.service';
import {DataTransferDTO} from '../../dtos/data_transfer/data-transfer-dto';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService extends CrudService<DataTransferDTO> {

  constructor(public http: HttpClient) {
    super(http, 'data-transfer');
  }

  export(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }

    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/export?id=${id}`, requestOptions);
  }

  import(fileToUpload: File): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'content-type': 'multipart/form-data'
        }
      )
    };

    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http
      .post(`${environment.serverUrl}/${this.endpoint}/import`, formData, httpOptions);
  }
}
