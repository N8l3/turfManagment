import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  isCollapsed = false;

  menuItems = [
    { name: 'dashboard', path: '/dashboard', icon: 'fas fa-home' },
    { name: 'turf', path: '/dashboard/turf', icon: 'fas fa-futbol' },
    { name: 'Users', icon: 'fas fa-user' },
    // { name: '', icon: 'fas fa-envelope' },
    { name: 'Feedback', icon: 'fas fa-envelope' },

    { name: 'Order', icon: 'fas fa-shopping-cart' },
    // { name: 'Saved', icon: 'fas fa-heart' },
    { name: 'Settings', icon: 'fas fa-cog' },
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
