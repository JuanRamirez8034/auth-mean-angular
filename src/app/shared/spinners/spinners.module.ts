import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Spinner1Component } from './components/spinner1/spinner1.component';



@NgModule({
  declarations: [
    Spinner1Component
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Spinner1Component,
  ]
})
export class SpinnersModule { }
