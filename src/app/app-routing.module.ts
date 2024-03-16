import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RespuestaComponent } from './componentes/respuesta/respuesta.component';
import { Acceso } from './control/Acceso';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', redirectTo: '/index/crear', pathMatch: 'full' },
  { path: 'index', redirectTo: '/index/crear', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'consultar/:id', component: RespuestaComponent },
  {
    path: 'index', component: IndexComponent, canActivate: [Acceso]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
