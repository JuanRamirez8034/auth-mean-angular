import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackComponent } from './snack/snack.component';



@NgModule({
  declarations: [
    SnackComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SnackComponent,
  ]
})
export class AlertsModule { }
