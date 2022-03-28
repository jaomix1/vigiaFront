import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { EncuestaModule } from '../componentes/encuesta/encuesta.module';
import { Consulta3Module } from '../componentes/encuesta_editar_modal/consulta3.module';
import { PeriodoCrearModule } from '../componentes/periodo_crear/periodoCrear.module';
import { PendientesSedeModule } from '../componentes/pendientes_sede/pendientesSede.module';
import { PendientesGeneralesModule } from '../componentes/pendientes_generales/pendientesGenerales.module';
import { Consulta4Module } from '../componentes/respuestas_asignadas_modal/consulta4.module';
import { HistoricoModule } from '../componentes/historico/historico.module';
import { GlobalModule } from '../componentes/historico_global/global.module';
import { SedeModule } from '../componentes/sede/sede.module';
import { SedeEditarModule } from '../componentes/sede_editar/sedeEditar.module';
import { PeriodoModule } from '../componentes/periodo/periodo.module';
import { ReporteModule } from '../componentes/reporte/reporte.module';

import { AdminModule } from '../componentes/admin/admin.module';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    IndexComponent,
  ],
  imports: [    
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, 
    HttpClientModule,

    IndexRoutingModule,

    EncuestaModule,
    HistoricoModule,
    Consulta3Module,
    Consulta4Module,
    GlobalModule,
    SedeModule,
    SedeEditarModule,
    PeriodoModule,
    PeriodoCrearModule,
    ReporteModule,
    AdminModule,
    PendientesSedeModule,
    PendientesGeneralesModule,

    
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule, 
    // MatGridListModule,
    // MatProgressBarModule,
    
  ],
  exports :[
   IndexComponent,
 ]
})

export class IndexModule { }
