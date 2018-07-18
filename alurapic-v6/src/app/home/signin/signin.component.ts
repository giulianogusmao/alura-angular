import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  msg: string;
  @ViewChild('usernameInput') usernameInput: ElementRef<HTMLInputElement>;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    console.log(this.loginForm.get('username'))
  }

  login() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this._authService
      .authenticate(username, password)
      .subscribe(
        () => this._router.navigate(['user', username]),
        (err) => {
          console.error(err);
          this.loginForm.reset();

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
      )
  }
}
