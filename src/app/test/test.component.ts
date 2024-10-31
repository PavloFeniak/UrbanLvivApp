import {Component, OnInit} from '@angular/core';
import {ReportService} from '../services/report.service';
import {ActivatedRoute} from '@angular/router';
import {Report} from "../models/report.model";


@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit{
  public reports: Report[] = [];

  constructor(private reportService: ReportService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadReports()
  }
  private loadReports(): void {
    this.reportService.getReports().subscribe(
      (data) => {
        this.reports = data.map(item => new Report(
          item.id,
          item.title,
          item.description,
          item.imageUrl,
          item.typeOfProblem,
          item.creatorId, // Додайте інші поля, якщо є
          item.location,   // Додайте інші поля, якщо є
          item.timeOfCreation, // Додайте інші поля, якщо є
          item.priority,   // Додайте інші поля, якщо є
          item.isDote      // Додайте інші поля, якщо є
        ));
        console.log("Reports downloaded\n", this.reports);
      },
      (error) => {
        console.error('Помилка завантаження', error);
      }
    );
  }


}
