import { Injectable } from '@angular/core';
import {CrudService} from './common/crud.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {PrivilegeDTO} from '../../dtos/access-control/privilege-dto';

@Injectable({
  providedIn: 'root'
})
export class AccessControlService extends CrudService<any> {

  constructor(public http: HttpClient) {
    super(http, 'access_control');
  }

  getUsersByRole(roleId: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/by-role?roleId=${roleId}`);
  }

  getUsersWithoutTheGivenRole(roleId: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/available?roleId=${roleId}`);
  }

  addUsersToRole(privilegeDTO: PrivilegeDTO): Observable<any> {
    return this.http.post(`${environment.serverUrl}/${this.endpoint}/add-users-to-role`, privilegeDTO);
  }

  removeUserFromRole(privilegeDTO: PrivilegeDTO): Observable<any> {
    return this.http.post(`${environment.serverUrl}/${this.endpoint}/remove-users-from-role`, privilegeDTO);
  }

}
