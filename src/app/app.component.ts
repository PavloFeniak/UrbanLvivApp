import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TestComponent} from './test/test.component';
import {ReportSmartComponent} from './components/report-smart/report-smart.component';
import {HomeComponent} from './components/home/home.component';
import {FooterComponent} from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UrbanLvivApp';
}
