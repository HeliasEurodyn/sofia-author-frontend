import { Injectable } from '@angular/core';
import {CrudService} from "./common/crud.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RuleFieldDesignerService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'rule-field-designer');
  }

}
