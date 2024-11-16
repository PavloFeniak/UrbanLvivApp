import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ReportSmartComponent} from './components/report-smart/report-smart.component';
import {HomeComponent} from './components/home/home.component';
import {FooterComponent} from './components/footer/footer.component';
import {AddReportsComponent} from './components/add-reports/add-reports.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, FooterComponent, AddReportsComponent, ProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UrbanLvivApp';
}
