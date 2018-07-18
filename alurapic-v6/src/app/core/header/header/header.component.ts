import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  user$;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.user$ = this._userService.getUser();
  }

  logout() {
    this._userService.logout();
    this._router.navigate(['']);
  }
}
