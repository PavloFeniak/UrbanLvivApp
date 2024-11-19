import {Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MyReport} from '../models/report.model';
import {ReportAdminModel} from '../models/report.admin.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root' // Додає сервіс у глобальні провайдери
})
export class AdminService implements OnInit {

  constructor(private router: Router, private http: HttpClient) {
  }
  ngOnInit(): void {
  }

  getAllReports(): Observable<ReportAdminModel[]>{


    return this.http.get<any>(environment.backendURL+"/Admin/GetAllReports");
  }
  updateReportByAdmin(reportId: number, status: number, priority: string){
    const body = {
      priority: priority,
      status: status
    };
    this.http.post(environment.backendURL+`/Admin/UpdateReportByAdmin/${reportId}`, body).subscribe(
      (response) => {
        console.log('Report updated successfully:', response);
      },
      (error) => {
        console.error('Error updating report:', error);
      }
    );
  }
}
