import {Component, Input, OnInit} from '@angular/core';
import {ReportService} from '../../services/report.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MyReport} from "../../models/report.model";

@Component({
    selector: 'app-report-smart',
  standalone: true,

  imports: [CommonModule],
    templateUrl: './report-smart.component.html',
    styleUrl: './report-smart.component.scss'
})
export class ReportSmartComponent implements OnInit{
  @Input() report!: MyReport;
  public isDescription = false;
  public formattedDate: string = '';



  constructor(private reportService: ReportService, private router: Router) {
  }
  ngOnInit(): void {
    if (this.report && this.report.timeOfCreation) {
      const date = new Date(this.report.timeOfCreation);
      const day = date.getUTCDate().toString().padStart(2, '0');
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const year = date.getUTCFullYear().toString();

      this.formattedDate = `${day}-${month}-${year}`;
    }
  }
  HideShow(): void{
    this.isDescription = !this.isDescription
  }
  goToReportDetails(id: number) {
    this.router.navigate(['/report-details', id]);
  }
}
