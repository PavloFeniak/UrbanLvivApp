import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReportService} from '../../services/report.service';
import {MyReport} from '../../models/report.model';
import {ExportReportModel} from '../../models/exportModels/exportReport.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-add-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-reports.component.html',
  styleUrls: ['./add-reports.component.scss']
})
export class AddReportsComponent {

  imageSrc: string | ArrayBuffer | null = null;
  selectedImage!: string ;

  constructor(private reportService: ReportService, private userService: UserService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files  && input.files[0]) {
      const file = input.files[0];

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        // Читання файлу як Data URL
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.imageSrc = e.target?.result || '';

          // Перевіряємо, чи є результат у вигляді строки
          if (typeof e.target?.result === 'string') {
            this.selectedImage = e.target.result;  // Зберігаємо Base64 строку
          }
        };

        reader.readAsDataURL(file);

      }
    }
  }

  submitAddingReport(){
    const usid = this.userService.user.id;
    console.log('User ID:', this.userService.user.id);
    this.reportService.uploadReport(new ExportReportModel(
      (document.getElementById('problemName') as HTMLInputElement).value,
      "broken tree",
      this.selectedImage,
      (document.getElementById('problemTag') as HTMLSelectElement).selectedIndex,
      usid,
      (document.getElementById('problemPlace') as HTMLInputElement).value,
    ))
  }
}
