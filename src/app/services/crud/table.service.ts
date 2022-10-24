import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CrudService} from './common/crud.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'table');
  }

  tableExists(name: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/table-exists?name=${encodeURIComponent(name)}`);
  }

  generateTableFields(name: string) {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/generate-table-fields?name=${encodeURIComponent(name)}`);
  }

}
