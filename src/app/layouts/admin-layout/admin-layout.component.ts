import {Component, OnInit} from '@angular/core';
import {AdminLayoutRoutes} from './admin-layout.routing';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {


  constructor() {
  }

  ngOnInit() {
  }

  // private openPageWithPageId(pageId: string, path: string) {
  //
  //   const selectedRoutes = AdminLayoutRoutes.filter(
  //     route => route.path === path);
  // }

}
