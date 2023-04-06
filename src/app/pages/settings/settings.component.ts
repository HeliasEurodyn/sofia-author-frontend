import {Component, OnInit} from '@angular/core';
import {PageComponent} from '../page/page-component';
import {SettingsDto} from '../../dtos/settings/settings-dto';
import {SettingsService} from '../../services/crud/settings.service';
import {Location} from '@angular/common';
import {NotificationService} from '../../services/system/notification.service';
import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from "../../services/crud/user.service";
import {UserDto} from "../../dtos/user/user-dto";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends PageComponent implements OnInit {

  public dto: SettingsDto = new SettingsDto();
  public usersList: Array<UserDto>;

  public visibleSection = 'general_settings';

  constructor(private service: SettingsService,
              private location: Location,
              private userService: UserService,
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
      }

      if(this.dto.name == null) this.dto.name = 'Sofia';
      if(this.dto.sidebarImage == null) this.dto.sidebarImage = './assets/img/sofia.png';
      if(this.dto.loginImage == null) this.dto.loginImage = './assets/img/sofia.png';
      if(this.dto.icon == null) this.dto.icon = './assets/img/sofia_icon.png';

    });

    this.refreshUsers();
  }

  refreshUsers() {
    this.userService.get().subscribe(data => {
      this.usersList = data;
    });
  }

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }

  selectUser(user: UserDto) {
    this.dto.oauthPrototypeUserId = user?.id;
    this.dto.oauthPrototypeUserName = user?.username;
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
