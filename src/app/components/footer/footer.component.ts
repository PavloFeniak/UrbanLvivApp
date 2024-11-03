import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public homeButtonIsChecked: boolean = true;
  public userButtonIsChecked: boolean = false;
  public infoButtonIsChecked: boolean = false;

  checkButton(idButton: number): void{
    if(idButton == 1) {this.homeButtonIsChecked = true; this.userButtonIsChecked = false; this.infoButtonIsChecked = false;}
    if(idButton == 2) {this.homeButtonIsChecked = false; this.userButtonIsChecked = true; this.infoButtonIsChecked = false;}
    if(idButton == 3) {this.homeButtonIsChecked = false; this.userButtonIsChecked = false; this.infoButtonIsChecked = true;}

  }

}
