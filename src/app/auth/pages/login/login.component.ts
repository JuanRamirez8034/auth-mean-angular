import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidInputService } from 'src/app/services/valid-input.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public form !: FormGroup;
  public SpinnerActive !: boolean;
  public showAlert : {visible:boolean; text:string} = {visible:false, text:''};

  constructor(private fb:FormBuilder, public ValidInput: ValidInputService, private auth : AuthService, private router:Router){
    this.form = fb.group({
      email: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });

    this.ValidInput.buildInstanceForm(this.form);

    this.SpinnerActive = false;
  }

  // funcion de envio de datos
  public Login():void {
    console.log('Login request send...');

    this.handleSpinner(true);
    
    this.auth.authLogin(this.form.value).subscribe((status:number) =>{
      if(status !== 200){
        this.showAlert = {text:'Login error, please trying again!', visible:true};
        return;
      }
      this.handleSpinner();
      this.router.navigateByUrl('/auth-application/dashboard');
    },
    (errors) => {

      this.handleSpinner();

      if(errors.error?.statusCode === 404){
        console.log('Account not found', errors.error.message);
        this.showAlert = {text:'Account not fount, please logup!', visible:true};
        return;
      }

      if(errors.error?.statusCode === 401){
        console.log('credentials error', errors.error.message);
        this.showAlert = {text:'Credentials error, please verify!', visible:true};
        return;
      }

      console.log('server error', errors.error.message);
      this.showAlert = {text:'Server errors, please wait and reload!', visible:true};
    }
    );
  }

  private handleSpinner(active:boolean = false):void{
    if(active){
      this.SpinnerActive = true;
      return;
    }
    setTimeout(()=>{
      this.SpinnerActive = false;
    }, 200);
  }

}
