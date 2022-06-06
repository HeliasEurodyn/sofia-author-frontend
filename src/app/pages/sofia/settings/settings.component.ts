import { Component, OnInit } from '@angular/core';
import {PageComponent} from '../page/page-component';
import {ListDTO} from '../../../dtos/sofia/list/list-dto';
import {SearchDTO} from '../../../dtos/sofia/search/search-dto';
import {SettingsDto} from '../../../dtos/sofia/settings/settings-dto';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends PageComponent implements OnInit {

  loginImage: any;
  icon: any;
  ApplicationName = 'Sofia';
  public dto: SettingsDto = new SettingsDto();

  constructor() {
    super();
    this.dto.sidebarImage = './assets/img/angular2-logo.svg';
    this.dto.loginImage = './assets/img/sofia.png';
    this.dto.icon = './assets/img/favicon.png';
  }

  ngOnInit(): void {
  }

  save() {
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
}
