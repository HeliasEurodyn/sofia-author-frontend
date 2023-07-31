import {Injectable} from '@angular/core';
import {CrudService} from './common/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDesignerService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'form-designer');
  }

  clearCache(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/clear-cache`);
  }

  getTags(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/tag`);
  }

  get10LatestForms(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/10-latest`);
  }

  getDataByTag(tag: any): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/by-tag?tag=${tag}`);
  }

  getFormsWithJsonUrl(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/with-jsonUrl`);
  }


}
