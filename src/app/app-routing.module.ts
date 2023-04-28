import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'authMean',
    loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: 'auth-application',
    loadChildren: ()=>import('./protected/protected.module').then(m=>m.ProtectedModule)
  },
  {
    path:'**',
    redirectTo:'authMean'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
