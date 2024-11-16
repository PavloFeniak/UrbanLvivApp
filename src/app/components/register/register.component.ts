import {Component, ElementRef, Renderer2} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ExportUserModel} from '../../models/exportModels/export.user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }
  submitRegistration() {
    const exportUser = new ExportUserModel(
      (document.getElementById('first-name') as HTMLInputElement).value,
      (document.getElementById('last-name') as HTMLInputElement).value,
      (document.getElementById('email') as HTMLInputElement).value,
      (document.getElementById('phoneNumber') as HTMLInputElement).value,
      (document.getElementById('password') as HTMLInputElement).value
    );

    this.userService.registration(exportUser);  }
}
