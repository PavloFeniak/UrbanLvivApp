import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-login',
  standalone: true,

  imports: [
        RouterLink
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {


  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  submitLogin() {
    this.userService.login(
      (document.getElementById('email') as HTMLInputElement).value,
      (document.getElementById('password') as HTMLInputElement).value
    )
  }
}
