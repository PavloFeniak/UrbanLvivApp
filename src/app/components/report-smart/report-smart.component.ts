import {Component, Input, OnInit} from '@angular/core';
import {ReportService} from '../../services/report.service';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-report-smart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-smart.component.html',
  styleUrl: './report-smart.component.scss'
})
export class ReportSmartComponent implements OnInit{
  // @Input() report: Report;
  public isDescription = false;


  constructor(private reportService: ReportService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
  }
  HideShow(): void{
    this.isDescription = !this.isDescription
  }
}
