import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-profile',
  standalone: true,

  imports: [
        NgIf
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  get userService(): UserService {
    return this._userService;
  }

  constructor(private _userService: UserService) {
  }
}
