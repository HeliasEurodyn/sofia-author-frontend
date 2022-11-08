import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponceService} from './services/system/http-error-responce.service';
import {NotificationService} from './services/system/notification.service';
import {SettingsService} from './services/crud/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {


  appTitle = 'Sofia';

  public constructor(private activatedRoute: ActivatedRoute,
                     private httpErrorResponceService: HttpErrorResponceService,
                     private notificationService: NotificationService,
                     private title: Title) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.title.setTitle(this.appTitle);
    });
    this.listenToHttpErrors();
    this.title.setTitle(this.appTitle);
  }

  listenToHttpErrors(): void {
    this.httpErrorResponceService.httpErrorMessageEmitter
      .subscribe((message) => {
        if (message !== '') {
          this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-thumbs-down', message);
        }
      });
  }

}
