import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidInputService } from 'src/app/services/valid-input.service';
import { AuthService } from '../../services/auth.service';
import { AuthResp } from 'src/app/interfaces/authService.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public form !: FormGroup;
  public SpinnerActive !: boolean;

  constructor(private fb:FormBuilder, public ValidInput: ValidInputService, private auth : AuthService){
    this.form = fb.group({
      email: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });

    this.ValidInput.buildInstanceForm(this.form);

    this.SpinnerActive = false;
  }

  // funcion de envio de datos
  public Login():void {
    console.log(this.form.value);

    this.handleSpinner(true);
    
    this.auth.authLogin(this.form.value).subscribe((resp:AuthResp) =>{
      console.log(resp.message);
      this.handleSpinner();
    },
    (errors) => {

      this.handleSpinner();

      if(errors.error?.statusCode === 404){
        console.log('Account not found', errors.error.message);
        return;
      }

      if(errors.error?.statusCode === 401){
        console.log('credentials error', errors.error.message);
        return;
      }

      console.log('server error', errors.error.message);
      
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
    }, 1500);
  }

}
