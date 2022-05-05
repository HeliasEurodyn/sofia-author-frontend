import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../common/crud.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'language-designer');
  }

}
