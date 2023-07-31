import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CrudService} from './common/crud.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ListDTO} from '../../dtos/list/list-dto';

@Injectable({
  providedIn: 'root'
})
export class ListDesignerService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'list-designer');
  }

  getDataByTag(tag: any): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/by-tag?tag=${tag}`);
  }

  clearCache(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/clear-cache`);
  }

  getTags(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/tag`);
  }

  get10LatestLists(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/10-latest`);
  }

  getListsWithJsonUrl(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/with-jsonUrl`);
  }

}
