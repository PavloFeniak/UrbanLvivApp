import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {ReportSmartComponent} from './components/report-smart/report-smart.component';
import {HomeComponent} from './components/home/home.component';
import {FooterComponent} from './components/footer/footer.component';
import {AddReportsComponent} from './components/add-reports/add-reports.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AdminPageComponent} from './components/admin-page/admin-page.component';
import {ReportDetailsComponent} from './components/report-details/report-details.component';
import {NgIf} from '@angular/common';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, FooterComponent, AddReportsComponent, ProfileComponent, AdminPageComponent, ReportDetailsComponent, NgIf, AdminDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UrbanLvivApp';
  isAdminPage: boolean = false;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAdminPage = event.url.includes('/admin-home-page');
      }
    });
    document.body.style.margin = "0";
  }
}
