import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { MenuModule } from '../menu/menu.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { AdminComponent } from './admin.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// { CrearComponent } from './crear/crear.component';
//import { EditarComponent } from './editar/editar.component';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card'

@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatTableModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatCardModule,
    /* MatCardModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatProgressBarModule,
    ,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule, */


  ],
  providers: [
  ],
})

export class AdminModule { }
