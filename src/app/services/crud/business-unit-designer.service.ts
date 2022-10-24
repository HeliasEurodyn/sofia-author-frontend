import { Injectable } from '@angular/core';
import {CrudService} from './common/crud.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessUnitDesignerService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'business-unit-designer');
  }
}
