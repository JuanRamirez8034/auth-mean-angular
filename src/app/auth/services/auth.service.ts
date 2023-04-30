import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import { LoginData, AuthResp } from 'src/app/interfaces/authService.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API  : string = environment.apiUrl;
  private APIK : string = environment.apiKey;
  private headers !:HttpHeaders;

  constructor(private http:HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  public authLogin(data:LoginData):Observable<AuthResp>{
    console.log(data);
    
    return this.http.post<AuthResp>(`${this.API}/auth/login`, data);
  }
}
