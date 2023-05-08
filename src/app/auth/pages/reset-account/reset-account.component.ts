import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ValidInputService } from 'src/app/services/valid-input.service';

@Component({
  selector: 'app-reset-account',
  templateUrl: './reset-account.component.html',
  styleUrls: ['./reset-account.component.css']
})
export class ResetAccountComponent {

  public form !: FormGroup;
  private tk  !: string;
  public showPass !: boolean;
  public SpinnerActive !:boolean;
  public showAlert : {time:number; visible:boolean; type:'danger'|'success'; text:string;} = {
    time:2000,
    visible:false,
    type:'danger',
    text:'',
  };
  
  constructor(private fb:FormBuilder, private _ActivedRouter:ActivatedRoute, private _router:Router,private auth:AuthService, public controlValid:ValidInputService){
    this.form = fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]]
    });

    this.controlValid.buildInstanceForm(this.form);

    this.tk = _ActivedRouter.snapshot.paramMap.get('token') ?? 'invailAccess';
    this.showPass  = false;
    this.SpinnerActive  = false;
  }

  public resetAccount():void{
    console.log('Reset send...', this.tk);
    
    this.auth.resetPassword(this.tk, this.form.get('password')?.value)
    .subscribe(resp => {
      if(resp === true){
        console.log('password reset success');

        this.showAlert = {
          text: 'Hello!, Password reset success. You redireted in a moment',
          time: 10000,
          type:'success',
          visible:true
        };

        setTimeout(()=>{
          this._router.navigate(['/authMean/login']);
        },4000);
        
        return;
      }
    },
    ({error}) => {
      console.log(error);

      if(error.statusCode === 400){
        this.showAlert = {
          text: error.errors[0].msg ?? error.errors[0] ?? 'Reset password failed',
          time: 5000,
          type:'danger',
          visible:true
        };
        return;
      }

      if(error.statusCode === 401){
        this.showAlert = {
          text: 'Access denied, your link access is expired',
          time: 5000,
          type:'danger',
          visible:true
        };
        return;
      }

      this.showAlert = {
        text: 'Server error, please reload and trying again',
        time: 5000,
        type:'danger',
        visible:true
      };
    }
    );
  }
}
