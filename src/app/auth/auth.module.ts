import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { LogupComponent } from './pages/logup/logup.component';
import { MainComponent } from './pages/main/main.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnersModule } from '../shared/spinners/spinners.module';
import { AlertsModule } from '../shared/alerts/alerts.module';
import { ResetAccountComponent } from './pages/reset-account/reset-account.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    LogupComponent,
    MainComponent,
    ResetAccountComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    AlertsModule,
    SpinnersModule,
  ]
})
export class AuthModule { }
