import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ValidInputService } from 'src/app/services/valid-input.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

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

  constructor(private _fb:FormBuilder, public controlValid: ValidInputService, private auth:AuthService){
    this.form = _fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.controlValid.buildInstanceForm(this.form);

    this.showPass = this.SpinnerActive = false;
  }


  public sendEmail():void{
    console.log('email send...');
    
    this.auth.requestResetPassword(this.form.get('email')?.value)
    .subscribe(resp => {
      if(resp === true){
        this.showAlert = {
          time:10000,
          visible:true,
          type:'success',
          text:'Hello!, please verify your email',
        };
      }
    },
    ({error})=>{
      console.log(error);
      if(error.statusCode === 403){
        this.showAlert = {
          time:5000,
          visible:true,
          type:'danger',
          text:'Email not found, please logup!',
        };
        return;
      }

      this.showAlert = {
        time:5000,
        visible:true,
        type:'danger',
        text:'Server error, please reload and trying!',
      };
    }
    );
  }
  
}
