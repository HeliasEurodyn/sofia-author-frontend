import {Injectable} from '@angular/core';
import {CrudService} from '../common/crud.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NodeGraphService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'node-graph');
  }

  getAsset(id: any, type: any): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/asset/${id}?type=${type}`);
  }

  getRelationships(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/relationships`);
  }

  updateAssetRelationship(atoa_id: any, relCode: any, type: any) {
    return this.http.put<any>(
      `${environment.serverUrl}/${this.endpoint}/update-asset-relationship?atoa-id=${atoa_id}&rel-code=${relCode}&type=${type}`,
      null);
  }

  insertRelatedAsset(assetId: any, relAssetId: any, type: any) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }
    return this.http.post<any>(
      `${environment.serverUrl}/${this.endpoint}/insert-related-asset?asset_id=${assetId}&rel_asset_id=${relAssetId}&type=${type}`,
      null,
      requestOptions);
  }

  removeRelatedAsset(atoa_id: any, type: any) {
    return this.http.delete<any>(
      `${environment.serverUrl}/${this.endpoint}/remove-related-asset?atoa-id=${atoa_id}&type=${type}`);
  }

  savePositions(centralNodeDTO: any, type: any) {
    return this.http.post<any>(
      `${environment.serverUrl}/${this.endpoint}/save-asset-positions?type=${type}`, centralNodeDTO);
  }
}
