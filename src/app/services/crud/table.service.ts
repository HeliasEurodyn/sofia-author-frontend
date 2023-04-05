import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CrudService} from './common/crud.service';
import {environment} from '../../../environments/environment';
import {RemoveForeignKeyConstrainDTO} from "../../dtos/table/remove-foreign-key-constrain-dto";

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

  dropForeignKeyConstrain(foreignKeyConstrain: RemoveForeignKeyConstrainDTO) {
    return this.http.put(`${environment.serverUrl}/${this.endpoint}/drop_foreign_key_constrain`, foreignKeyConstrain);
  }

  getTags(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/tag`);
  }

  getDataByTag(tag: any): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/by-tag?tag=${tag}`);
  }

}
