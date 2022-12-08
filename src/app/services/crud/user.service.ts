import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CrudService} from './common/crud.service';
import {LoginInfoDto} from '../../dtos/user/login-info-dto';
import {environment} from '../../../environments/environment';
import {LogoutDTO} from '../../dtos/security/logout-dto';


/**
 * A service providing functionality for the user of the application, including authentication,
 * authorisation and session management.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<any> {

  public static getJwt(): string {
    return localStorage.getItem('jwt_token');
  }

  constructor(public http: HttpClient) {
    super(http, 'user');
  }

  login(loginInfoDTO: LoginInfoDto): Observable<string> {
    return this.http.post<string>(
      `${environment.serverUrl}/${this.endpoint}/auth`,
      loginInfoDTO);
  }

  logout(logoutDTO: LogoutDTO): Observable<any> {
    return this.http.post<string>(
      `${environment.serverUrl}/${this.endpoint}/logout`, logoutDTO);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/${this.endpoint}/current`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }

  updateCurrentLanguage(languageId: any): Observable<string> {
    return this.http.put<any>(
      `${environment.serverUrl}/${this.endpoint}/current-language?language-id=${languageId}`, null);
  }

}
