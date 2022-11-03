import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';


@Injectable()
export class AuthenticationHeaderInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = localStorage.getItem('jwt_token')
    if (jwtToken === '' || jwtToken === undefined || jwtToken == null) {
      return next.handle(request)
    }

    let updatedRequest
    if (request.headers.has('Content-Type') && request.headers.get('Content-Type') === 'multipart/form-data' ) {
      updatedRequest = request.clone({
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
        })
      });
    } else {
      updatedRequest = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
        })
      });
    }
    return next.handle(updatedRequest);
  }

}
