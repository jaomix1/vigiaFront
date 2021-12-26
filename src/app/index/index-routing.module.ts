
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Acceso } from '../control/Acceso';
import { AccesoAdmin } from '../control/accesoAdmin';
import { EncuestaComponent } from '../componentes/encuesta/encuesta.component';
import { AdminComponent } from '../componentes/admin/admin.component';
// import { AccesoAdmin } from '../control/accesoAdmin';
// import { Consulta1Component } from '../modulos/consulta1/consulta1.component';
// import { Consulta2Component } from '../modulos/consulta2/consulta2.component';
// import { IndexUserComponent } from '../modulos/usuarios/index/index.component';
import { IndexComponent } from './index.component';

import { RespuestaComponent } from '../componentes/respuesta/respuesta.component';
import { HistoricoComponent } from '../componentes/historico/historico.component';
import { EditarComponent } from '../componentes/encuesta_editar/editar.component';

const routes: Routes = [
  {
    path: 'index', component : IndexComponent, canActivate: [Acceso],
    children: [
      {
          path: 'crear',
          component: EncuestaComponent,
          canActivate: [Acceso]
      },
      {
          path: 'historico',
          component: HistoricoComponent,
          canActivate: [Acceso]
      }  ,
      {
          path: 'editar/:id',
          component: EditarComponent,
          canActivate: [Acceso]
      } 
    ]
  },
  {
    path: 'admin', component : IndexComponent, canActivate: [AccesoAdmin],
    children: [
      {
          path: 'users',
          component: AdminComponent,
          canActivate: [AccesoAdmin]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }