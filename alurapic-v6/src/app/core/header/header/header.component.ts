import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  user$;

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.user$ = this._userService.getUser();
  }

}
