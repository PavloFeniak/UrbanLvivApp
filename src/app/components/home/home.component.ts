import { Component } from '@angular/core';
import {ReportSmartComponent} from '../report-smart/report-smart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReportSmartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  times: number[] = Array(5).fill(0);

}
