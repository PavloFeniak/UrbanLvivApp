import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {MyReport} from "../models/report.model";
import {catchError, map, Observable, Observer, of} from "rxjs";


@Injectable({
  providedIn: 'root' // Додає сервіс у глобальні провайдери
})
export class ReportService implements OnInit {
  private apiUrl = `http://3.87.172.119/api/Report/GetUserReports/1`;

  constructor(private router: Router, private http: HttpClient) {
  }

  getReports(title?: string): Observable<MyReport[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${this.apiUrl}`, { headers });
  }



  ngOnInit(): void {

  }

}
