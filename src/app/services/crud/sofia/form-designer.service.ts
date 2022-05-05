import {Injectable} from '@angular/core';
import {CrudService} from '../common/crud.service';
import {FormDto} from '../../../dtos/sofia/form/form-dto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDesignerService extends CrudService<FormDto> {

  constructor(public http: HttpClient) {
    super(http, 'form-designer');
  }

  clearCache(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/clear-cache`);
  }

}
