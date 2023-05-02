import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SesionGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router){}

  canActivate(): Observable<boolean> |  boolean {
    console.log('Can load login');
    
    return of(this.auth.validSesion())
    .pipe(tap(valid => {
      if(!valid)this.router.navigateByUrl('/auth-application/dashboard');
    }));
  }
  
}
