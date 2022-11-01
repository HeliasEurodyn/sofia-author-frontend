import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AppConstants: any;

  constructor(private http: HttpClient) { }

  login(username, password): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(environment.serverUrl + '/user/auth', {
      username: username,
      password: password
    }, httpOptions);
  }

  register(user): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(environment.serverUrl + '/auth/signup', {
      displayName: user.displayName,
      email: user.email,
      password: user.password,
      matchingPassword: user.matchingPassword,
      socialProvider: 'LOCAL'
    }, httpOptions);
  }
}
