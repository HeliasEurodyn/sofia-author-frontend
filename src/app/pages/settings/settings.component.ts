import {Component, OnInit} from '@angular/core';
import {PageComponent} from '../page/page-component';
import {SettingsDto} from '../../dtos/sofia/settings/settings-dto';
import {SettingsService} from '../../services/crud/sofia/settings.service';
import {Location} from '@angular/common';
import {NotificationService} from '../../services/system/sofia/notification.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends PageComponent implements OnInit {

  public dto: SettingsDto = new SettingsDto();

  constructor(private service: SettingsService,
              private location: Location,
              private notificationService: NotificationService,
              private sanitizer: DomSanitizer) {
    super();
    this.dto.name = 'Sofia';
    this.dto.sidebarImage = '';
    this.dto.loginImage = '';
    this.dto.icon = '';
  }

  ngOnInit(): void {
    this.service.get().subscribe(dto => {
      if (dto != null) {
        this.dto = dto;
      } else {
        this.dto.name = 'Sofia';
        this.dto.sidebarImage = './assets/img/sofia.png';
        this.dto.loginImage = './assets/img/sofia.png';
        this.dto.icon = './assets/img/sofia_icon.png';
      }
    });
  }

  save() {
    this.service.save(this.dto).subscribe(data => {
      this.notificationService.showNotification('top', 'center', 'alert-info', 'fa-save', 'Settings Saved.');
    });
  }

  onSidebarImageFileSelect(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (evnt: ProgressEvent<FileReader>) => {
        this.dto.sidebarImage = evnt.target.result;
      }
    }
  }

  onLoginImageFileSelect(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (evnt: ProgressEvent<FileReader>) => {
        this.dto.loginImage = evnt.target.result;
      }
    }
  }


  onIconFileSelect(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (evnt: ProgressEvent<FileReader>) => {
        this.dto.icon = evnt.target.result;
      }
    }
  }

  trustResource(resource) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(resource);
  }
}
