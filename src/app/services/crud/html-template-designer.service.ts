import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from './common/crud.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HtmlTemplateDesignerService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'html-template-designer')
  }

  download(id: string) {

    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    
    return this.http.get(`${environment.serverUrl}/${this.endpoint}/download?id=${id}`, {
      headers: headers,
      observe: 'response',
      responseType: 'blob'
    });
  }


}
