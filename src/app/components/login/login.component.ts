import { Component, AfterViewInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { MaterialModule } from '../../mat-module/mat-module.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  resetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private _router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]], // Only letters and spaces
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobile: ['', Validators.required, Validators.pattern(/^[6-9]\d{9}$/)], // Indian 10-digit number starting with 6-9],
    });

    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngAfterViewInit(): void {
    // Manually initialize Bootstrap tabs
    const tabElements = document.querySelectorAll('[data-bs-toggle="tab"]');
    tabElements.forEach((tab) => {
      new bootstrap.Tab(tab);
    });
  }

  resetForms() {
    this.loginForm.reset();
    this.signupForm.reset();
    this.resetPasswordForm.reset();
  }

  openResetPassword(event: Event) {
    event.preventDefault();
    this.resetForms();
    const resetTab = document.getElementById('resetPasswordTab') as HTMLElement;
    resetTab.removeAttribute('hidden');
    new bootstrap.Tab(resetTab).show();
  }

  backToLogin(event: Event) {
    event.preventDefault();
    this.resetForms();
    const loginTab = document.querySelector(
      '[href="#loginTab"]'
    ) as HTMLElement;
    new bootstrap.Tab(loginTab).show();
  }

  onLogin() {
    if (this.loginForm.valid) {
      let user = {
        email: this.loginForm.controls['email'].value,
        pass: this.loginForm.controls['password'].value,
      };
      localStorage.setItem('user', user.email);
      sessionStorage.setItem('userRoleID','1');
      this._router.navigate(['/dashboard']);
    }
  }

  onSignup() {
    if (this.signupForm.valid) {
      console.log('Signup Data:', this.signupForm.value);
    }
  }

  onResetPassword() {
    if (this.resetPasswordForm.valid) {
      console.log(
        'Reset Password Email Sent To:',
        this.resetPasswordForm.value.email
      );
    }
  }
}
