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


  ngOnInit(): void {

  }

}
