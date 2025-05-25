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
import { RestService } from '../../services/rest.service';

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
  invalidCredentials: boolean;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private restService: RestService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]], // Only letters and spaces
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]], // Indian 10-digit number starting with 6-9
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
      const { email, password } = this.loginForm.value;
      this.restService.login(email, password).subscribe({
        next: (response) => {
          localStorage.setItem('user', JSON.stringify(response));
         if(response?.isValidUser){
          this.invalidCredentials = false;
           this._router.navigate(['/dashboard']);
         }
          else{
            this.invalidCredentials = true;
            localStorage.clear();
            sessionStorage.clear();
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Handle login error (show message to user)
        }
      });
    }
  }

  onSignup() {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      this.restService.verifyUser(userData.email, userData.password).subscribe({
        next: (response) => {
          if (response.success) {
            // Handle successful signup
            this.backToLogin(new Event('click'));
          }
        },
        error: (error) => {
          console.error('Signup failed:', error);
          // Handle signup error (show message to user)
        }
      });
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
