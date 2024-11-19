import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {MyReport} from "../models/report.model";
import {catchError, map, Observable, Observer, of} from "rxjs";
import {ExportReportModel} from '../models/exportModels/exportReport.model';


@Injectable({
  providedIn: 'root' // Додає сервіс у глобальні провайдери
})
export class ReportService implements OnInit {
  // private apiUrl = `http://54.174.171.216/api/Report/GetUserReports/1`;


  constructor(private router: Router, private http: HttpClient) {
  }

  getReports(title?: string): Observable<MyReport[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>("https://localhost:7148/api/Report/GetAllReports", { headers });
  }
  getReportsByUser(userId: number): Observable<MyReport[]>{
    return this.http.get<MyReport[]>(`https://localhost:7148/api/Report/GetUserReports/${userId}`);
  }

  uploadReport(report: ExportReportModel): void {
      const body = {
        title: report.title,
        description: report.description,
        image: report.imageUrl,
        typeOfProblem: report.typeOfProblem,
        creatorId: report.creatorId,
        location: report.location
      };
      console.log(body)
      this.http.post(environment.backendURL + '/Report/CreateReport', body).subscribe(
        (response) => {
          console.log('Image uploaded successfully:', response);
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }

    getReportById(reportId: number): Observable<MyReport>{
      return this.http.get<MyReport>(`https://localhost:7148/api/Admin/GetReportById/${reportId}`)
    }
  async compressImage(imageUrl: string, maxWidth: number, maxHeight: number, quality: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Зберігаємо пропорції зображення
        if (width > height) {
          if (width > maxWidth) {
            height = Math.floor(height * (maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.floor(width * (maxHeight / height));
            height = maxHeight;
          }
        }

        // Створюємо canvas потрібного розміру
        canvas.width = width;
        canvas.height = height;

        // Відображаємо зображення на canvas
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);

          // Стискаємо зображення
          const compressedImage = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedImage);
        } else {
          reject('Canvas rendering context not found');
        }
      };

      img.onerror = reject;
    });
  }
  ngOnInit(): void {

  }

}
