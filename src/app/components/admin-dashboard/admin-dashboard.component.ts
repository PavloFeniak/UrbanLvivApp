import { Component, AfterViewInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { ReportSummaryComponent } from '../report-summary/report-summary.component';
import { ReportAdminModel } from '../../models/report.admin.model';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables, ChartConfiguration, ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    ReportSummaryComponent,
    CommonModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements AfterViewInit {
  reports: ReportAdminModel[] = [];
  totalReports: number = 0;

  private countsByPriority = {
    low: { total: 0, inProgress: 0, completed: 0 },
    medium: { total: 0, inProgress: 0, completed: 0 },
    high: { total: 0, inProgress: 0, completed: 0 },
  };

  private chart: Chart<'bar'> | null = null;

  constructor(private adminService: AdminService, private route: ActivatedRoute) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadReports();
  }

  ngAfterViewInit(): void {
    this.createChart(); // Створення графіка після завантаження DOM
  }

  private loadReports(): void {
    this.adminService.getAllReports().subscribe(
      (data) => {
        this.reports = data.map(
          (item) =>
            new ReportAdminModel(
              item.id,
              item.title,
              item.typeOfProblem,
              item.creatorId,
              item.location,
              item.timeOfCreation,
              item.priority,
              item.processingStatus
            )
        );

        this.totalReports = this.reports.length;
        this.countReportsByPriority();
        this.createChart();
      },
      (error) => {
        console.error('Error loading reports:', error);
      }
    );
  }

  private countReportsByPriority(): void {
    this.reports.forEach((report) => {
      let priorityKey: 'low' | 'medium' | 'high';

      // Визначаємо пріоритет
      switch (report.priority.toLowerCase()) {
        case 'низький':
          priorityKey = 'low';
          break;
        case 'середній':
          priorityKey = 'medium';
          break;
        case 'високий':
          priorityKey = 'high';
          break;
        default:
          return; // Пропускаємо невизначені пріоритети
      }

      // Загальна кількість репортів для цього рівня
      this.countsByPriority[priorityKey].total++;

      // В роботі (всі, окрім completed)
      if (report.processingStatus !== 4) {
        this.countsByPriority[priorityKey].inProgress++;
      }

      // Завершені
      if (report.processingStatus === 4) {
        this.countsByPriority[priorityKey].completed++;
      }
    });
  }

  private createChart(): void {
    const canvas = document.getElementById('reportsChart') as HTMLCanvasElement;

    if (!canvas) {
      console.error('Canvas element not found!');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to get 2D context!');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    // Дані для графіка
    const labels = ['Low', 'Medium', 'High'];
    const totalData = [
      this.countsByPriority.low.total,
      this.countsByPriority.medium.total,
      this.countsByPriority.high.total,
    ];
    const inProgressData = [
      this.countsByPriority.low.inProgress,
      this.countsByPriority.medium.inProgress,
      this.countsByPriority.high.inProgress,
    ];
    const completedData = [
      this.countsByPriority.low.completed,
      this.countsByPriority.medium.completed,
      this.countsByPriority.high.completed,
    ];

    // Налаштування графіка
    const chartConfig: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: labels, // Low, Medium, High
        datasets: [
          {
            label: 'Total Reports',
            data: totalData,
            backgroundColor: '#FFA500', // Помаранчевий
            borderWidth: 1,
            borderRadius: 30, // Заокруглені кути
            borderColor: '#fff', // Білий контур
          },
          {
            label: 'In Progress',
            data: inProgressData,
            backgroundColor: '#1E90FF', // Блакитний
            borderWidth: 1,
            borderRadius: 30,
            borderColor: '#fff',
          },
          {
            label: 'Completed',
            data: completedData,
            backgroundColor: '#32CD32', // Зеленуватий
            borderWidth: 1,
            borderRadius: 30,
            borderColor: '#fff',
          },
        ],
      } as ChartData<'bar'>, // Перевірка типу даних
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 10,
                weight: 'bold',
              },
              color: '#333',
              boxWidth: 20,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 12,
                weight: 'bold',
              },
              color: '#333',
            },
          },
          x: {
            ticks: {
              font: {
                size: 12,
                weight: 'bold',
              },
              color: '#333',
            },
          },
        },
        animation: {
          duration: 1000, // Тривалість анімації
          easing: 'easeInOutQuad',
        },
        hover: {
          onHover: (event: MouseEvent, chartElement: any) => {  // Типізували параметр event
            if (chartElement.length) {
              const target = event.target as HTMLElement | null;
              if (target) {
                target.style.cursor = 'pointer';
              }
            } else {
              const target = event.target as HTMLElement | null;
              if (target) {
                target.style.cursor = 'default';
              }
            }
          },
        },
        elements: {
          bar: {
            borderWidth: 2,
            borderColor: '#fff', // Білий контур для кожного стовпця
          },
        },
      } as ChartOptions<'bar'>, // Перевірка типу options
    };

    // Створення графіка
    this.chart = new Chart(ctx, chartConfig);
  }

}
