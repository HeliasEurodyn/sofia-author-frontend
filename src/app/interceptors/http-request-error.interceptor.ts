import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponceService} from '../services/system/http-error-responce.service';
import {NotificationService} from '../services/system/notification.service';
import {Router} from '@angular/router';

@Injectable()
export class HttpRequestErrorInterceptor implements HttpInterceptor {


  constructor(private httpErrorResponceService: HttpErrorResponceService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(catchError((errorResponce) => {

        if ( this.isJsonString(errorResponce.error)) {
          const response = JSON.parse(errorResponce.error);
          this.httpErrorResponceService.setNewErrorMessage(response.message);
          return throwError(errorResponce);
        }

        switch (errorResponce.status) {
          case 400:
            this.httpErrorResponceService.setNewErrorMessage('<b>400</b> Bad Request 400');
            // this.notificationService.showNotification('top', 'center', 'alert-danger',
            //   'fa-thumbs-down', '<b>Error 400</b> Bad Request 400');
            break;
          case 401:
             // console.log(errorResponce.);
            const errorMessage = '<b>Code ' + errorResponce.status + '</b> ' + errorResponce.error.message;
            this.httpErrorResponceService.setNewErrorMessage(errorMessage);
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('loggedin_user');
            sessionStorage.removeItem('sidebarMenu');
            this.router.navigateByUrl(`/login`);
            // this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-tasks', '<b>Request Code 401</b> Not Found.');
            break;

          case 403:
            this.httpErrorResponceService.setNewErrorMessage('<b>Code 403</b> Forbidden area.');
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('loggedin_user');
            sessionStorage.removeItem('sidebarMenu');
            this.router.navigateByUrl(`/login`);
            break;

          case 404:
            this.httpErrorResponceService.setNewErrorMessage('<b>Code 404</b> Not Found.');
            // this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-tasks', '<b>Request Code 404</b> Not Found.');
            break;

          case 408:
            this.httpErrorResponceService.setNewErrorMessage('<b>Code 408</b> TimeOut.');
            // this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-tasks', '<b>Request Code 408</b> TimeOut.');
            break;

          case 500:
            this.httpErrorResponceService.setNewErrorMessage('<b>Code 500</b> Internal server issue.');
            // this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-tasks', '<b>Request Code 500</b> Internal server issue.');
            break;
        }
        return throwError(errorResponce);
      }));

  }

  private isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   return next.handle(request).pipe(catchError(this.handleError));
  // }


  // private handleError(err: HttpErrorResponse): Observable<any> {
  //   const logFormat = 'background: maroon; color: white';
  //
  //   if (err instanceof HttpErrorResponse) {
  //     switch (err.status) {
  //
  //       case 400:
  //         // console.error('%c Bad Request 400', logFormat);
  //         // this.notificationService.showNotification('top', 'center', 'alert-danger',
  //         // 'fa-thumbs-down', '<b>Error 400</b> Bad Request 400');
  //         this.httpErrorResponceService.setNewErrorMessage('<b>Error 400</b> Bad Request 400');
  //         break;
  //
  //       case 401:
  //         // console.error('%c Unauthorized 401', logFormat);
  //         // this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-thumbs-down', '<b>Error 401</b> Not Found 401');
  //         this.httpErrorResponceService.setNewErrorMessage('<b>Error 401</b> Not Found 401');
  //         break;
  //
  //       case 404:
  //         // console.error('%c Not Found 404', logFormat);
  //         // this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-thumbs-down', '<b>Error 404</b> Not Found 404');
  //         this.httpErrorResponceService.setNewErrorMessage('<b>Error 404</b> Not Found 404');
  //         break;
  //
  //       case 408:
  //         // console.error('%c TimeOut 408', logFormat);
  //         // this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-thumbs-down', '<b>Error 408</b> TimeOut 408');
  //         this.httpErrorResponceService.setNewErrorMessage('<b>Error 408</b> TimeOut 408');
  //         break;
  //
  //       case 403:
  //         // console.error('%c Forbidden 403', logFormat);
  //         // this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-thumbs-down', '<b>Error 403</b> Forbidden 403');
  //         this.httpErrorResponceService.setNewErrorMessage('<b>Error 403</b> Forbidden 403');
  //         break;
  //
  //       case 500:
  //         // console.error('%c big bad 500', logFormat);
  //         // this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-thumbs-down', '<b>Error 500</b> Big bad 500');
  //         alert(this.httpErrorResponceService);
  //        // this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-thumbs-down', '<b>Error 500</b> Big bad 500');
  //         this.httpErrorResponceService.setNewErrorMessage('<b>Error 500</b> Big bad 500');
  //         break;
  //     }
  //   }
  //
  //   return  of(err);
  // }


}
