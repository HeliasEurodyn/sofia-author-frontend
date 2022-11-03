import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CrudService} from './common/crud.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableComponentService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'component');
  }

  getComponentPersistEntityDataById(componentPersistEntityId: string, selectionId: string): Observable<any> {
    const param1 = `component-persist-entity-id=${componentPersistEntityId}`;
    const param2 = `selection-id=${selectionId}`;
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/component-persist-entity/by-id?${param1}&${param2}`);
  }

  getDataById(id: any, selectionId: any): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/by-id?id=${id}&selection-id=${selectionId}`);
  }

  deleteComponentData(componentId: any, selectionId: any): Observable<any> {
    return this.http.delete<any>(`${environment.serverUrl}/${this.endpoint}?id=${componentId}&selection-id=${selectionId}`);
  }

}
