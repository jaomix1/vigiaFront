
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
import { GlobalComponent } from '../componentes/historico_global/global.component';
import { EditarComponent } from '../componentes/encuesta_editar/editar.component';
import { SedeComponent } from '../componentes/sede/sede.component';
import { AsignadasComponent } from '../componentes/respuestas_asignadas/asignadas.component';
import { PeriodoComponent } from '../componentes/periodo/periodo.component';
import { ReporteComponent } from '../componentes/reporte/reporte.component';
import { PendientesSedeComponent } from '../componentes/pendientes_sede/pendientesSede.component';
import { PendientesGeneralesComponent } from '../componentes/pendientes_generales/pendientesGenerales.component';

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
          path: 'historicoUsuario',
          component: HistoricoComponent,
          canActivate: [Acceso]
      },
      {
          path: 'historico',
          component: GlobalComponent,
          canActivate: [Acceso]
      },
      {
          path: 'sede',
          component: SedeComponent,
          canActivate: [Acceso]
      },
      {
          path: 'periodo',
          component: PeriodoComponent,
          canActivate: [Acceso]
      },
      {
          path: 'reporte',
          component: ReporteComponent,
          canActivate: [Acceso]
      },
      {
          path: 'editar/:id',
          component: EditarComponent,
          canActivate: [Acceso]
      },
      {
          path: 'pendientes',
          component: PendientesSedeComponent,
          canActivate: [Acceso]
      },
      {
          path: 'pendientesGenerales',
          component: PendientesGeneralesComponent,
          canActivate: [Acceso]
      },

      
      {
          path: 'asignada',
          component: AsignadasComponent,
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
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
