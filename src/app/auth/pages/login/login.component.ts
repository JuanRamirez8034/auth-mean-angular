import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public form !: FormGroup;

  constructor(private fb:FormBuilder){
    this.form = fb.group({
      email: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    })
  }

  // funcion de envio de datos
  public Login():void {
    alert('login')
  }
}
