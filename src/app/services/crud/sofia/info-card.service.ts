import {Injectable} from '@angular/core';
import {CrudService} from '../common/crud.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoCardService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'info-card');
  }

  getByIdWithParams(id: any, extraParams: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/by-id?id=${id}${extraParams}`);
  }

}
