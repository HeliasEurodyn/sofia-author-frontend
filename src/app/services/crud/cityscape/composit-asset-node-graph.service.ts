import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {CrudService} from '../common/crud.service';

@Injectable({
  providedIn: 'root'
})
export class CompositAssetNodeGraphService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'comopsit-asset-node-graph');
  }

  getCompositAsset(id: any): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/${id}`);
  }

  getThreats(atoa_id: any): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/threats?atoa-id=${atoa_id}`);
  }

  updateRelationship(atoa_id: any, relCode: any) {
    return this.http.put<any>(
      `${environment.serverUrl}/${this.endpoint}/update-relationship?atoa-id=${atoa_id}&rel-code=${relCode}`,
      null);
  }

  insertRelated(assetId: any, relAssetId: any) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }
    return this.http.post<any>(
      `${environment.serverUrl}/${this.endpoint}/insert-related?asset_id=${assetId}&rel_asset_id=${relAssetId}`,
      null,
      requestOptions);
  }

  removeRelated(atoa_id: any) {
    return this.http.delete<any>(
      `${environment.serverUrl}/${this.endpoint}/remove-related?atoa-id=${atoa_id}`);
  }

  savePositions(centralNodeDTO: any) {
    return this.http.post<any>(
      `${environment.serverUrl}/${this.endpoint}/save-positions`, centralNodeDTO);
  }

  saveRelationshipProbability(id: any, threatProbability: any) {
    return this.http.put<any>(
      `${environment.serverUrl}/${this.endpoint}/update-relationship-probability?id=${id}&threat-probability=${threatProbability}`,
      null);
  }

  saveRelationshipActive(id: any, active: any) {
    return this.http.put<any>(
      `${environment.serverUrl}/${this.endpoint}/update-relationship-active?id=${id}&active=${active}`,
      null);
  }
}
