import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private auth:AuthService, private router:Router){}

  canActivate(): Observable<boolean> | boolean {
    console.log('can activate');

    // validando la sesion y restaurando
    return this.auth.renewSesion()
    .pipe(
      tap(valid => {
        if(!valid) this.router.navigateByUrl('/authMean/login'); // en caso de falso se redirecciona al login
      })
    );
  }
  
  canLoad(): Observable<boolean> | boolean {
    console.log('can load');
    
    // validando la sesion y restaurando
    return this.auth.renewSesion()
    .pipe(
      tap(valid => {
        if(!valid) this.router.navigateByUrl('/authMean/login'); // en caso de falso se redirecciona al login
      })
    );
  }
}
