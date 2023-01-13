import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from './common/crud.service';

@Injectable({
  providedIn: 'root'
})
export class HtmlTemplateDesignerService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'html-template-designer')
   }
}
