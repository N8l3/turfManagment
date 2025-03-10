import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard';
import { noAuthGuard } from './guard/noAuth.guard';
import { TurfComponent } from './components/turf/turf.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [noAuthGuard],
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      // { path: '', redirectTo: 'turf', pathMatch: 'full' }, // Default child
      {
        path: 'turf',
        component: TurfComponent,
        canActivate: [authGuard],
      },
    ],
  },

  { path: '**', redirectTo: 'login' }, // Handle unknown routes
];
