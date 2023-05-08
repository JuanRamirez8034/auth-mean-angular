import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ValidInputService } from 'src/app/services/valid-input.service';

@Component({
  selector: 'app-logup',
  templateUrl: './logup.component.html',
  styleUrls: ['./logup.component.css']
})
export class LogupComponent {

  public form !: FormGroup;
  public spinnerVisible !: boolean;
  public showPass !: boolean;
  public snapConfig : {time:number; visible:boolean; type:'danger'|'success'; text:string;} = {
    time:2000,
    visible:false,
    type:'danger',
    text:'',
  };

  constructor(private _fb:FormBuilder, private _auth:AuthService, public ValidInput: ValidInputService, private _router:Router){
    this.form = this._fb.group({
      bornDate : ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      country  : ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email    : ["", [Validators.required, Validators.email]],
      lastName : ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30),Validators.pattern('^[a-zA-ZÀ-ÿ]+$')]],
      name     : ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30),Validators.pattern('^[a-zA-ZÀ-ÿ]+$')]],
      password : ["", [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      phone    : ["", [Validators.required, Validators.minLength(12), Validators.maxLength(15), Validators.pattern('^[+0-9]+$')]],
      userName : ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });

    this.ValidInput.buildInstanceForm(this.form);

    this.spinnerVisible = false;
    this.showPass = false;
  }


  public logup():void {

    console.log('logup send...');
    
    this.spinnerVisible = true;
    

    this._auth.authLogup(this.form.value).subscribe(resp => {
      
      this.spinnerVisible = false;

      if(resp === 200){

        this.snapConfig = {
          text: 'Hello!, Logup success. You redireted in a moment',
          time: 10000,
          type:'success',
          visible:true
        };

        this.form.reset();

        setTimeout(()=>{
          this._router.navigateByUrl('/auth-application/dashboard');
        },4000);
      }
      
    },
    ({error}) => {
      this.spinnerVisible = false;
      console.log(error);

      if(error.statusCode === 400){

        if(error.message === 'The request cotain errors'){
          this.snapConfig = {
            text: error.errors[0].msg,
            time: 5000,
            type:'danger',
            visible:true
          };
          return;
        }

        this.snapConfig = {
          text: error.errors[0],
          time: 5000,
          type:'danger',
          visible:true
        };
        return;
      }

      this.snapConfig = {
        text: 'Server error. Please trying again!',
        time: 5000,
        type:'danger',
        visible:true
      };
    }
    );
  }

}
