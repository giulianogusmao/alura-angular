import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LowerCaseValidator } from '../../shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './newUser';
import { SignupService } from './signup.service';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  @ViewChild('firstInput') firstInput: ElementRef<HTMLInputElement>;

  constructor(
    private _fb: FormBuilder,
    private _userNotTakenValidatorService: UserNotTakenValidatorService,
    private _signupService: SignupService,
    private _router: Router,
    private _platformDetectorService: PlatformDetectorService,
  ) {}

  ngOnInit(): void {
    this.signupForm = this._fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ]
      ],
      userName: [
        '',
        [
          Validators.required,
          LowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
        // validators assincronos é passado como 3° parâmetro
        this._userNotTakenValidatorService.checkUserNotTaken()
      ],
      password: ['', Validators.required],
    });

    // focus primeiro campo
    this._platformDetectorService.isPlatformBrowser() && this.firstInput.nativeElement.focus();
  }

  register() {
    const newUser = this.signupForm.getRawValue() as NewUser;
    this._signupService
      .signup(newUser)
      .subscribe(
        () => this._router.navigate(['']),
        console.error
      );
  }
}
