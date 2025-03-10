import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminComponent } from "./admin/admin.component";
import { UserComponent } from "./user/user.component";

@Component({
  selector: 'app-dashboard',
  imports: [AdminComponent, UserComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  _authAccess = sessionStorage.getItem('userRoleID');
  _AllowAdmin: boolean;

  ngOnInit(): void {
    if (this._authAccess == '1') {
      this._AllowAdmin = true;
    }
    else {
      this._AllowAdmin = false;
    }
  }
}
