import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import { LoginData, AuthResp, LogupData } from 'src/app/interfaces/authService.interface';
import { Observable, catchError, map, of } from 'rxjs';
import { LocalStorangeService } from './local-storange.service';
import { Router } from '@angular/router';
import { Data } from '../interfaces/authService.interface';

export interface User {
  uid : string;
  user: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API  : string = environment.apiUrl;
  private APIK : string = environment.apiKey;
  private headers !:HttpHeaders;

  private _aviableUser !: Data;

  constructor(private http:HttpClient, private LStorange : LocalStorangeService, private router : Router) {
    // construyendo headers de la peticones
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // asigando informacion de usuario y validando sesion
    this.validSesion();
  }

  public get SesionUser():Data {
    return structuredClone(this._aviableUser)
  }

  public authLogin(data:LoginData):Observable<number>{
    
    return this.http.post<AuthResp>(`${this.API}/auth/login`, data)
      .pipe(map(AuthResp => {
        // asigando el usuario a la variable privada
        this._aviableUser = AuthResp.data![0];
        // almacenando la informacion en el local storange
        this.LStorange.saveSesionData(AuthResp.data![0]);
        // retornando el codigo de estado
        return AuthResp.statusCode;
      })
    );
  }

  public authLogup(data:LogupData):Observable<number>{
    return this.http.post<AuthResp>(`${this.API}/auth/logup`, data, {headers:this.headers})
    .pipe(
      map(AuthResp => {
        // asigando el usuario a la variable privada
        this._aviableUser = AuthResp.data![0];
        // almacenando la informacion en el local storange
        this.LStorange.saveSesionData(AuthResp.data![0]);
        // retornando el codigo de estado
        return AuthResp.statusCode;
      })
    );
  }

  public renewSesion():Observable<boolean>{

    
    // añadiendo token a los headers
    this.headers =  this.headers.set('X-TK-X', this.LStorange.getSesionData()?.utk ?? '');
    

    return this.http.get<AuthResp>(`${this.API}/auth/renew/token`, {headers:this.headers})
    .pipe(
      map(AuthResp =>{
        // asigando el usuario a la variable privada
        this._aviableUser = AuthResp.data![0];
        
        // almacenando la informacion en el local storange
        this.LStorange.saveSesionData(AuthResp.data![0]);
        // retornando el booleando verdadero en caso de que el codigo sea 200
        return (AuthResp.statusCode === 200);
      }),
      catchError(error => {
        console.log(error);
        this.LStorange.clear();//limpiando datos de sesion en caso de error
        return of(false)
      }), // en caso de error se regresa falso en forma de observable
    );
  }

  public resetPassword(token:string, newPassword:string):Observable<boolean>{
    // agregando el token a los headers
    this.headers = this.headers.set('X-TK-X', token);
    return this.http.post<AuthResp>(`${this.API}/auth/reset-access`, {password:newPassword}, {headers:this.headers})
    .pipe(
      map((resp:AuthResp)=>{
        if(resp.statusCode !== 200)return false;
        return true;
      }),
    );
  }

  public requestResetPassword(email:string):Observable<boolean>{
    return this.http.post<AuthResp>(`${this.API}/auth/recovery`, {email}, {headers:this.headers})
    .pipe(
      map(resp=>{
        if(resp.statusCode === 200)return true;
        return false;
      })
    )
  }

  public validSesion():boolean{
    const Data  = this.LStorange.getSesionData();
    
    
    if(Data !== null){
      this._aviableUser = structuredClone(Data);
      console.log('hola', this._aviableUser);
      return false;

    }else{
      console.log('Sesion unaviable');
      this.LStorange.clear();
      return true;
    }
  }

  public clearSesion(){
    this.LStorange.clear();
    this.router.navigateByUrl('/authMean/login');
  }
}
