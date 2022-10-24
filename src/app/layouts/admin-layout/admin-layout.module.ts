import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AdminLayoutRoutes} from './admin-layout.routing';

import {UserComponent} from '../../pages/sofia/user/user.component';
import {TableComponent} from '../../pages/sofia/table/table.component';
import {ACE_CONFIG, AceConfigInterface, AceModule} from 'ngx-ace-wrapper';

const DEFAULT_ACE_CONFIG: AceConfigInterface = {
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    AceModule
  ],
  declarations: [
    UserComponent,
    TableComponent],
  providers: [
    {
      provide: ACE_CONFIG,
      useValue: DEFAULT_ACE_CONFIG
    }
  ]
})

export class AdminLayoutModule {
}
