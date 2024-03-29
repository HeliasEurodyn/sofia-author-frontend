import {Injectable} from '@angular/core';
import {CrudService} from './common/crud.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppViewService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'appview');
  }

  tableExists(name: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/table-exists?name=${name}`);
  }

  generateViewFields(query: string): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/${this.endpoint}/generate-view-fields`,{ query: btoa(encodeURIComponent(query)) } );
  }

  getDataByTag(tag: any): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/by-tag?tag=${tag}`);
  }

  getTags(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/tag`);
  }

}
