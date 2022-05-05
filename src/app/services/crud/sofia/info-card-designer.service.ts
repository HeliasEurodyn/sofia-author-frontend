import {Injectable} from '@angular/core';
import {CrudService} from '../common/crud.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChartFieldDTO} from '../../../dtos/sofia/chart/chart-field-dto';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoCardDesignerService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'info-card-designer');
  }

  generateDataFields(query: string): Observable<ChartFieldDTO[]> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/generate-data-fields?query=${encodeURIComponent(query)}`);
  }

  getData(query: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/data?query=${query}`);
  }

}
