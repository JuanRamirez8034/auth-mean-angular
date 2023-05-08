import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LogupComponent } from './pages/logup/logup.component';
import { MainComponent } from './pages/main/main.component';
import { ResetAccountComponent } from './pages/reset-account/reset-account.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

const routes: Routes = [
    {
        path:'', 
        component: MainComponent,
        children : [
            {
              path: 'login',
              component: LoginComponent
            },
            {
              path: 'logup',
              component: LogupComponent
            },
            {
              path: 'forgot-password',
              component: ForgotPasswordComponent
            },
            {
              path: 'recovery-password/account/:token',
              component: ResetAccountComponent
            },
            {
              path: '**',
              redirectTo: 'login'
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }