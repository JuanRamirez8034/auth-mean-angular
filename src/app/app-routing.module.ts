import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { SesionGuard } from './guards/sesion.guard';

const routes: Routes = [
  {
    path:'authMean',
    loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule),
    canActivate: [SesionGuard]
  },
  {
    path: 'auth-application',
    loadChildren: ()=>import('./protected/protected.module').then(m=>m.ProtectedModule),
    canActivate: [AuthGuard],
    canLoad : [AuthGuard]
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
