import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {ReportSummaryComponent} from "../report-summary/report-summary.component";
import {ReportAdminModel} from '../../models/report.admin.model';
import {AdminService} from '../../services/admin.service';
import {ActivatedRoute} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
    imports: [
        NgForOf,
        ReportSummaryComponent,
      BrowserModule, ChartsModule
    ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  reports: ReportAdminModel[] = [];
  public newReport: number = 0;
  public inReview: number = 0;
  public approved: number = 0;
  public inProgress: number = 0;
  public completed: number = 0;
  public rejected: number = 0;
  public totalReports: number = 0;
  constructor(private adminService: AdminService, private route: ActivatedRoute){

  }
  private loadReports(): void {
    this.adminService.getAllReports().subscribe(
      (data) => {
        console.log("data\n", data)
        this.reports = data.map(item => {
          const report = new ReportAdminModel(
            item.id,
            item.title,
            item.typeOfProblem,
            item.creatorId,
            item.location,
            item.timeOfCreation,
            item.priority,
            item.processingStatus
          );
          return report;
        });
        console.log(this.reports)
        this.totalReports = this.reports.length;
      },
      (error) => {
        console.error('Error loading reports:', error);
      }
    );
  }
  countAllTypeOfReports(){
    this.reports.forEach(item =>{
      switch (item.processingStatus){
        case 0: this.newReport++; break;
        case 1: this.inReview++; break;
        case 2: this.approved++; break;
        case 3: this.inProgress++; break;
        case 4: this.completed++; break;
        case 5: this.rejected++; break;
      }
    })
  }
  ngOnInit(): void {
    this.loadReports();
    this.countAllTypeOfReports();
  }
}
