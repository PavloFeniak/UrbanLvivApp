import { Component } from '@angular/core';
import {ReportSmartComponent} from '../report-smart/report-smart.component';
import {ReportService} from '../../services/report.service';
import {ActivatedRoute} from '@angular/router';
import {MyReport} from '../../models/report.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReportSmartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  reports: MyReport[] = []
  constructor(private reportService: ReportService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadReports()
  }
  private loadReports(): void {
    this.reportService.getReports().subscribe(
      (data) => {
        console.log("data\n", data)
        this.reports = data.map(item => {
          const report = new MyReport(
            item.id,
            item.title,
            item.description,
            item.imageUrl,
            item.typeOfProblem,
            item.creatorId,
            item.location,
            item.timeOfCreation,
            item.priority,
            item.isDone
          );

          if (item.imageUrl === '') {
            report.imageUrl = './assets/3.png';
          }

          return report;
        });
      },
      (error) => {
        console.error('Error loading reports:', error);
      }
    );
  }


}
