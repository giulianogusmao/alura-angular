import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  msg: string;
  @ViewChild('firstInput') firstInput: ElementRef<HTMLInputElement>;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _platformDetectorService: PlatformDetectorService
  ) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    // focus campo login
    this._platformDetectorService.isPlatformBrowser() && this.firstInput.nativeElement.focus();
  }

  login() {
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    this._authService
      .authenticate(userName, password)
      .subscribe(
        () => this._router.navigate(['user', userName]),
        (err) => {
          console.error(err);
          this.loginForm.reset();
          this._platformDetectorService.isPlatformBrowser() && this.firstInput.nativeElement.focus();

          try {
            this.msg = err.error.message;
          } catch (e) {
            this.msg = 'Login ou Senha inválidos!'
          } finally {
            setTimeout(() => {
              this.msg = '';
            }, 5000);
          }
        }
      );
  }
}
