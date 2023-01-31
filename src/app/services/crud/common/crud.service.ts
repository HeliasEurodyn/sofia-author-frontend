import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';


/**
 * A convenience CRUD service to be extended by concrete services to provide default CRUD methods.
 */
export class CrudService<T> {

  constructor(public http: HttpClient, protected endpoint: string) {
  }

  save(object: T) {
    return this.http.post(`${environment.serverUrl}/${this.endpoint}`, object);
  }

  update(object: T) {
    return this.http.put(`${environment.serverUrl}/${this.endpoint}`, object);
  }

  get(): Observable<T> {
    return this.http.get<T>(`${environment.serverUrl}/${this.endpoint}/`);
  }

  getById(id: any): Observable<T> {
    return this.http.get<T>(`${environment.serverUrl}/${this.endpoint}/by-id?id=${id}`);
  }

  getFirst(): Observable<T> {
    return this.http.get<T>(`${environment.serverUrl}/${this.endpoint}`);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${environment.serverUrl}/${this.endpoint}?id=${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${environment.serverUrl}/${this.endpoint}`);
  }

  printById(id: any): Observable<any> {
    return this.http.get(`${environment.serverUrl}/${this.endpoint}/export-to-pdf?id=${id}`);
  }

}
