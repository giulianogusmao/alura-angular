import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {

  user$: Observable<User>;

  constructor(
    private _user$: UserService
  ) { }

  ngOnInit() {
    this.user$ = this._user$.getUser();
  }
}
