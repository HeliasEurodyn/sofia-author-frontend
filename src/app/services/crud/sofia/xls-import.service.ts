import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CrudService} from '../common/crud.service';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class XlsImportService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'xls-import');
  }

  import(id: string, fileToUpload: File): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'content-type': 'multipart/form-data'
        }
      )
    };

    const formData: FormData = new FormData();
    formData.append('id', id);
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http
      .post(`${environment.serverUrl}/${this.endpoint}`, formData, httpOptions);
  }

}
