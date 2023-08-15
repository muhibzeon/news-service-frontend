import {Routes, RouterModule} from '@angular/router';

import {FullComponent} from './layouts/full/full.component';
import {BlankComponent} from './layouts/blank/blank.component';
import {AuthGuard} from './_guards/auth.guard';
import {Dashboard3Component} from './dashboards/dashboard3/dashboard3.component';
import {ManageHomeContentComponent} from './manage-news/manage-home-content.component';
import {ReadComponent} from './read/read.component';

export const Approutes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {path: '', redirectTo: '/authentication/login', pathMatch: 'full'},
      {
        path: 'authentication',
        loadChildren:
          () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboards/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },

      {
        path: 'manage-news',
        component: ManageHomeContentComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'read-news',
        component: ReadComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/authentication/404'
  }
];
