import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {CrudService} from './common/crud.service';

@Injectable({
  providedIn: 'root'
})
export class ViewService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'view');
  }

  tableExists(name: string): Observable<any> {
    return this.http.get<any>('http://localhost:15502/api/view/table-exists?name=' + name);
  }

  generateViewFields(query: string): Observable<any> {
    return this.http.get<any>('http://localhost:15502/api/view/generate-view-fields?query=' + encodeURIComponent(query));
  }

}
