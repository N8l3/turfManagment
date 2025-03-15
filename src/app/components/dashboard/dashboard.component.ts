import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { DashContentComponent } from './dash-content/dash-content.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet, NavBarComponent, DashContentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  _authAccess = sessionStorage.getItem('userRoleID');
  _AllowAdmin: boolean;
  currentPath = '/dashboard';

  constructor(private router: Router) {}
  ngOnInit(): void {
    if (this._authAccess == '1') {
      this._AllowAdmin = true;
    } else {
      this._AllowAdmin = false;
    }
    this.getPath();
  }
  getPath() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.urlAfterRedirects; // Get the full URL
      }
    });
  }
}
