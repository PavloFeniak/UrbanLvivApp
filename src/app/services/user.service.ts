import {Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {ExportUserModel} from '../models/exportModels/export.user.model';
import {environment} from '../../environments/environment';
import {response} from 'express';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{
  get user(): UserModel {
    return this._user;
  }
  private exportUser?: ExportUserModel;
  private _user!: UserModel;

  constructor(private router: Router, private http: HttpClient){
  }
  public login(userEmail: string, userPassword: string){
    const body = {
      email: userEmail,
      password: userPassword
    }

    return this.http.post(environment.backendURL + "/Auth/UserLogin", body).subscribe(
      {
        next: ((response: any) =>{
          console.log("Response received: " + response)
          if (response.data != null){
            console.log(response.data)
            this._user = new UserModel(response.data.userId, "user", "user", userEmail,"050555555",userPassword)
            this.router.navigate(['/UserProfile']);
          }else {
            (document.getElementById("error") as HTMLElement).style.display = 'flex'
          }
        }),
        error: (error =>{
          console.log("errrrrrrrrror")
          console.log(error)
        })
      })
  }
  public registration(user: ExportUserModel) {
    this.exportUser = user
    const body = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.number,
      password: user.password
    };



    return this.http.post(environment.backendURL + "/Auth/UserRegister", body).subscribe(
      {
        next: ((response: any) => {
          console.log("Response received:", response);
          if (response) {
            console.log("succccccccccccsesss");
          } else {
            (document.getElementById("error") as HTMLElement).style.display = 'flex'
          }
        }),
        error: (error => {
          console.log("ERROR ERRROROROROR");
          console.error(error);
        })
      });
  }
  ngOnInit(): void {
  }

}
