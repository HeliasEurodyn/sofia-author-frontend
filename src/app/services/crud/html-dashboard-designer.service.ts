import {Injectable} from '@angular/core';
import {CrudService} from './common/crud.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HtmlDashboardDesignerService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'html-dashboard-designer');
  }

}
