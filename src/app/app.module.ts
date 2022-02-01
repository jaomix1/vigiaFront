import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { IndexModule } from './index/index.module';
import { LoginModule } from './componentes/login/login.module';
import { RespuestaModule } from './componentes/respuesta/respuesta.module';
import { EditarModule } from './componentes/encuesta_editar/editar.module';
import { AsignadasModule } from './componentes/respuestas_asignadas/asignadas.module';


import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './control/Interceptor';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { GoogleChartsModule } from 'angular-google-charts';
import { CrearComponent } from './componentes/admin/crear-usuario/crear.component';
import { EditarComponent } from './componentes/admin/editar-usuario/editar.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RespuestaComponent } from './componentes/respuesta/respuesta.component';


@NgModule({
  declarations: [
    AppComponent,
    CrearComponent,
    EditarComponent,
   // RespuestaComponent
  ],
  imports: [        
    AppRoutingModule,

    //Index
    IndexModule,

    //login
    LoginModule,

    // Respuesta
    RespuestaModule,

    EditarModule,
    AsignadasModule,

    //otros globales
    SweetAlert2Module.forRoot(),
    
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatTreeModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, 
      useValue: { appearance: 'outline' } 
    },
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
