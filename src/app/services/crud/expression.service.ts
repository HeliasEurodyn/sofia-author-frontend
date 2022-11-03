import {Injectable} from '@angular/core';
import {CrudService} from './common/crud.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpressionService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'expression');
  }

  getResult(expression: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }

    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/result?expression=${encodeURIComponent(expression)}`,
      requestOptions);
  }

  getExpressionUnits(expression: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/expression-units?expression=${encodeURIComponent(expression)}`);
  }

}
