import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TurfComponent } from './components/turf/turf.component';
import { UserComponent } from './components/user/user.component';
import { BookingComponent } from './components/booking/booking.component';
import { authGuard } from './guard/auth.guard';
import { noAuthGuard } from './guard/noAuth.guard';

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
    canActivate: [authGuard], // ✅ Dashboard is protected
    children: [
      { path: 'turf', component: TurfComponent },
      { path: 'users', component: UserComponent },
      { path: 'booking', component: BookingComponent },
    ],
  },

  { path: '**', redirectTo: 'dashboard' }, // ✅ Redirect unknown routes to dashboard
];
