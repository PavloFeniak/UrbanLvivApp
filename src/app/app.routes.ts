import { Routes } from '@angular/router';
import path from 'node:path';
import {HomeComponent} from './components/home/home.component';
import {AddReportsComponent} from './components/add-reports/add-reports.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'add-report', component: AddReportsComponent},
  {path: 'registration', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];
