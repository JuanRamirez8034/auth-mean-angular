import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidInputService {
  private form!:FormGroup;

  constructor () {
    
  }

  public buildInstanceForm(form:FormGroup):void{
    this.form = form;
  }

  public valid(controlName:string):boolean{
    return (this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched) ?? true;
  }
}
