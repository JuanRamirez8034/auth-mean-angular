import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LogupComponent } from './pages/logup/logup.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
    {
        path:'',
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
              path: 'main', 
              component: MainComponent
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