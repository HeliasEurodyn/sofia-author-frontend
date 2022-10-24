import {Injectable} from '@angular/core';
import {CrudService} from './common/crud.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomQueryDesignerService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'custom-query-designer');
  }

}
