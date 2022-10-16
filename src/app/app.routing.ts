import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from './pages/sofia/login/login.component';
import {CallBackComponent} from './pages/sofia/call-back/call-back.component';

export const AppRoutes: Routes = [
  {
    path: '',
   // component: LoginComponent
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {path: 'callback', component: CallBackComponent},
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }]
  },
  // {
  //   path: '**',
  //   redirectTo: 'dashboard'
  // }
]
