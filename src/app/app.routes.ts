import { Routes } from '@angular/router';
import path from 'node:path';
import {HomeComponent} from './components/home/home.component';
import {AddReportsComponent} from './components/add-reports/add-reports.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ReportDetailsComponent} from './components/report-details/report-details.component';
import {AdminPageComponent} from './components/admin-page/admin-page.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'add-report', component: AddReportsComponent},
  {path: 'registration', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'UserProfile', component: ProfileComponent},
  {path: 'report-details/:id', component: ReportDetailsComponent},
  {path: 'admin-home-page', component: AdminPageComponent}


];
