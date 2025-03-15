import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  isCollapsed = false;

  menuItems = [
    { name: 'dashboard', path: 'dashboard', icon: 'fas fa-home' },
    { name: 'turf', path: 'turf', icon: 'fas fa-futbol' },
    { name: 'users', icon: 'fas fa-user' },
    // { name: '', icon: 'fas fa-envelope' },
    // { name: 'Feedback', icon: 'fas fa-envelope' },

    { name: 'booking', icon: 'fas fa-shopping-cart' },
    // { name: 'Saved', icon: 'fas fa-heart' },
    // { name: 'Settings', icon: 'fas fa-cog' },
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  ngDoCheck(): void {
    if (window.innerWidth <= 768) {
      this.isCollapsed = true;
    }
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
