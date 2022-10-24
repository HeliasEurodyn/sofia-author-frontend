import {Injectable} from '@angular/core';
import {CrudService} from './common/crud.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormDto} from '../../dtos/form/form-dto';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ComponentDTO} from '../../dtos/component/componentDTO';

@Injectable({
  providedIn: 'root'
})
export class FormService extends CrudService<FormDto> {

  protected cachedDtos = new Map();

  constructor(public http: HttpClient) {
    super(http, 'form');
  }

  saveData(id: string, data: Map<any, any>) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }
    const componentValues = this.mapTreeToArrays(data);
    return this.http.post<any>(`${environment.serverUrl}/${this.endpoint}?id=${id}`, componentValues, requestOptions);
  }

  deleteData(id: string, selectionId: any) {
    return this.http.delete<any>(`${environment.serverUrl}/${this.endpoint}?id=${id}&selection-id=${selectionId}`);
  }

  updateData(id: string, data: Map<any, any>) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }
    const componentValues = this.mapTreeToArrays(data);
    return this.http.put<any>(`${environment.serverUrl}/${this.endpoint}?id=${id}`, componentValues, requestOptions);
  }

  public mapTreeToArrays(data: Map<any, any>) {
    const componentValues = {};
    data.forEach((componentMap: Map<any, any>, componentName: string) => {

      if (componentMap.has('multiline-entity')) {
        const dataArray = this.mapsLinesToArray(componentMap);
        componentValues[componentName] = dataArray;
      } else {
        const dataArray = this.mapsLineToArray(componentMap);
        componentValues[componentName] = dataArray;
      }

    });
    return componentValues;
  }

  private mapsLinesToArray(data: Map<any, any>) {
    const dataArray = {};
    data.delete('multiline-entity');
    data.forEach((componentLineMap: Map<any, any>, key: string) => {
      const componentLineArray = this.mapsLineToArray(componentLineMap);
      dataArray[key] = componentLineArray;
    });
    return dataArray;
  }

  private mapsLineToArray(data: Map<any, any>) {
    const dataArray = {};
    data.forEach((val: string, key: string) => {
      dataArray[key] = val;
    });

    if (data.has('sub-entities')) {
      const sunEntities = this.mapTreeToArrays(data.get('sub-entities'));
      dataArray['sub-entities'] = sunEntities;
    }

    return dataArray;
  }

  getDataById(id: any, selectionId: any): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/by-id?id=${id}&selection-id=${selectionId}`);
  }

  getUi(id: any, instanceVersion: string): Observable<FormDto> {
    const dtoString = localStorage.getItem('cachedForm' + id)
    if (dtoString != null) {
      const dto = JSON.parse(dtoString);
      if (dto.instanceVersion.toString() === instanceVersion) {
        return new Observable(observer => observer.next(dto));
      }
    }
    return this.requestUiFromBackend(id);
  }

  getUiVersion(id: any): Observable<string> {

    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/instance-version?id=${id}`, requestOptions);
  }

  private requestUiFromBackend(id: any): Observable<FormDto> {
    const observable = this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/ui?id=${id}`);
    // observable.subscribe(dto => localStorage.setItem('cachedForm' + id, JSON.stringify(dto)));
    return observable;
  }

  getData(id: any, selectionId: any): Observable<ComponentDTO> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/data?id=${id}&selection-id=${selectionId}`);
  }

  getCloneData(id: any, selectionId: any): Observable<ComponentDTO> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/clone-data?id=${id}&selection-id=${selectionId}`);
  }
}
