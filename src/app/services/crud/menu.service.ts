import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CrudService} from './common/crud.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'menu');
  }

  getMenuFromBackend(id: any, languageId: any): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/by-id?id=${id}&language-id=${languageId}`);
  }

  getTags(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/tag`);
  }

  getDataByTag(tag: any): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/by-tag?tag=${tag}`);
  }

}
