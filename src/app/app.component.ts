import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../environments/environment';
import {HttpErrorResponceService} from './services/system/sofia/http-error-responce.service';
import {NotificationService} from './services/system/sofia/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public backendUrl;

  public constructor(private activatedRoute: ActivatedRoute,
                     private httpErrorResponceService: HttpErrorResponceService,
                     private notificationService: NotificationService,
                     private title: Title) {
    this.backendUrl = environment.serverUrl;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.title.setTitle('CityScape');
    });
    this.listenToHttpErrors();
  }

  listenToHttpErrors(): void {
    this.httpErrorResponceService.httpErrorMessageEmitter
      .subscribe((message) => {
        if (message !== '') {
          this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-thumbs-down', message);
        }
      });
  }

  // private loadScript() {
  //   return new Promise((resolve, reject) => {
  //     const script = document.createElement('script');
  //     script.type = 'text/javascript';
  //     script.src = `${environment.serverUrl}/form/dynamic-javascripts/factory.js`;
  //
  //     if (script.readyState) {  // IE
  //       script.onreadystatechange = () => {
  //         if (script.readyState === 'loaded' || script.readyState === 'complete') {
  //           script.onreadystatechange = null;
  //           resolve({script: name, loaded: true, status: 'Loaded'});
  //         }
  //       };
  //     } else {
  //       script.onload = () => {
  //         resolve({script: name, loaded: true, status: 'Loaded'});
  //       };
  //     }
  //     script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
  //     document.getElementsByTagName('head')[0].appendChild(script);
  //   });
  // }


  // public removeScripts() {
  //   if (document.getElementById('form-dynamic-javascript') != null) {
  //     document.getElementById('form-dynamic-javascript').remove();
  //   }
  //   if (document.getElementById('list-dynamic-javascript') != null) {
  //     document.getElementById('list-dynamic-javascript').remove();
  //   }
  //   if (document.getElementById('form-dynamic-cssscript') != null) {
  //     document.getElementById('form-dynamic-cssscript').remove();
  //   }
  //   if (document.getElementById('list-dynamic-cssscript') != null) {
  //     document.getElementById('list-dynamic-cssscript').remove();
  //   }
  // }

}
