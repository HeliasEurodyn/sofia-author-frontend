import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AdminLayoutRoutes} from './admin-layout.routing';

import {UserComponent} from '../../pages/sofia/user/user.component';
import {TableComponent} from '../../pages/sofia/table/table.component';
import {TypographyComponent} from '../../pages/demos/typography/typography.component';
import {IconsComponent} from '../../pages/demos/icons/icons.component';
import {MapsComponent} from '../../pages/demos/maps/maps.component';
import {NotificationsComponent} from '../../pages/demos/notifications/notifications.component';
import {UpgradeComponent} from '../../pages/demos/upgrade/upgrade.component';
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
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
  ],
  providers: [
    {
      provide: ACE_CONFIG,
      useValue: DEFAULT_ACE_CONFIG
    }
  ]
})

export class AdminLayoutModule {
}
