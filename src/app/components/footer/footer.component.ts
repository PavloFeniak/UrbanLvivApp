import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ElementRef, Renderer2 } from '@angular/core';


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

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }
  checkButton(idButton: number): void{
    if (idButton == 1) {
      this.homeButtonIsChecked = true;
      this.userButtonIsChecked = false;
      this.infoButtonIsChecked = false;
      this.applyActiveClass('1');
      this.removeActiveClass('2', '3');
    }
    if (idButton == 2) {
      this.homeButtonIsChecked = false;
      this.userButtonIsChecked = true;
      this.infoButtonIsChecked = false;
      this.applyActiveClass('2');
      this.removeActiveClass('1', '3');
    }
    if (idButton == 3) {
      this.homeButtonIsChecked = false;
      this.userButtonIsChecked = false;
      this.infoButtonIsChecked = true;
      this.applyActiveClass('3');
      this.removeActiveClass('1', '2');
    }

  }
  applyActiveClass(buttonId: string): void {
    const button = this.el.nativeElement.querySelector(`#${buttonId}`);
    if (button) {
      this.renderer.addClass(button, 'active');
    }
  }

  removeActiveClass(...buttonIds: string[]): void {
    buttonIds.forEach(buttonId => {
      const button = this.el.nativeElement.querySelector(`#${buttonId}`);
      if (button) {
        this.renderer.removeClass(button, 'active');
      }
    });
  }
}
