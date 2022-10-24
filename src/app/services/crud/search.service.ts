import {Injectable} from '@angular/core';
import {CrudService} from './common/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends CrudService<any> {
  constructor(public http: HttpClient) {
    super(http, 'search');
  }

  search(id: string, search: string) {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/data?id=${id}&search=${encodeURIComponent(search)}`);
  }

}
