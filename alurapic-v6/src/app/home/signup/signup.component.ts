import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LowerCaseValidator } from '../../shared/validators/lower-case.validator';

@Component({
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private _fb: FormBuilder
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
        ]
      ],
      password: ['', Validators.required],
    });
  }

  register() {
    console.log('register');
  }
}
