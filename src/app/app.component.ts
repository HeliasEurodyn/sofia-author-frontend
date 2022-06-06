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

  // public backendUrl;
  favIcon: HTMLLinkElement = document.querySelector('#appIcon');

  public constructor(private activatedRoute: ActivatedRoute,
                     private httpErrorResponceService: HttpErrorResponceService,
                     private notificationService: NotificationService,
                     private title: Title) {
    // this.backendUrl = environment.serverUrl;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.title.setTitle('CityScape');
    });
    this.listenToHttpErrors();
   // this.changeIcon();
  }

  listenToHttpErrors(): void {
    this.httpErrorResponceService.httpErrorMessageEmitter
      .subscribe((message) => {
        if (message !== '') {
          this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-thumbs-down', message);
        }
      });
  }

  changeIcon() {
    this.favIcon.href = 'https://www.google.com/favicon.ico';
  }
}
