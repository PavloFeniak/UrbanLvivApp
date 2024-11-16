import {Component, ElementRef, Renderer2} from '@angular/core';
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
  constructor(private reportService: ReportService, private route: ActivatedRoute, private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit(): void {
    this.applyActiveClass('btn1', 'border1'); this.removeActiveClass('btn2','btn3')
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
            item.isDone,
            item.officialSummary
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
  applyActiveClass(buttonId: string, borderId: string): void {
    const button = this.el.nativeElement.querySelector(`#${buttonId}`);
    const border = this.el.nativeElement.querySelector(`#${borderId}`)
    if (button) {
      this.renderer.addClass(button, 'active');
      this.renderer.setStyle(button, 'color', 'black');
      this.renderer.setStyle(border, 'transform', 'scaleX(1)')

    }
  }

  removeActiveClass(...buttonIds: string[]): void {
    buttonIds.forEach(buttonId => {
      const button = this.el.nativeElement.querySelector(`#${buttonId}`);
      if (button) {
        this.renderer.removeClass(button, 'active');
        this.renderer.setStyle(button, 'border-bottom', 'none');
        this.renderer.setStyle(button, 'color', 'rgba(0, 0, 0, 0.5)');

      }
    });
  }
  removeBorder(...buttonIds: string[]): void {
    buttonIds.forEach(buttonId => {
      const button = this.el.nativeElement.querySelector(`#${buttonId}`);
      if (button) {
        this.renderer.setStyle(button, 'transform', 'scaleX(0)');

      }
    });
  }

}
