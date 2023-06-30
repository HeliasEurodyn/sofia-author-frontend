import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from './common/crud.service';

@Injectable({
  providedIn: 'root'
})
export class RestDocumentationDesignerService extends CrudService<any>{

  constructor(public http: HttpClient){
    super(http, 'rest-documentation-designer')
   }
}
