import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';
import { NotifyService } from '../../shared/components/notify/notify.service';

@Component({
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {

  fromUrl: string;
  loginForm: FormGroup;
  @ViewChild('firstInput') firstInput: ElementRef<HTMLInputElement>;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _platformDetectorService: PlatformDetectorService,
    private _notifyService: NotifyService,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    // get url que estava tentando acessar
    this._activatedRoute.queryParams.subscribe(params => this.fromUrl = params['fromUrl']);

    // create form
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
        () => {
          this.fromUrl
            ? this._router.navigateByUrl(this.fromUrl)
            : this._router.navigate(['user', userName]);
        },
        (err) => {
          console.error(err);
          this.loginForm.reset();
          this._platformDetectorService.isPlatformBrowser() && this.firstInput.nativeElement.focus();

          try {
            this._notifyService.danger(err.error.message);
          } catch (e) {
            this._notifyService.danger('Login ou Senha inválidos!');
          }
        }
      );
  }
}
