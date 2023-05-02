import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router, private authService : AuthService){}

  public get dataUser (){
    
    return this.authService.SesionUser;
  }

  public renew(){
    this.authService.renewSesion().subscribe(resp => {
      console.log('sesion restore', resp);
      
    },
    errors => {
      console.log(errors);
      
    }
    )
  }

  // funcion para desloguearse
  public logout(){
    this.authService.clearSesion();
  }
}
