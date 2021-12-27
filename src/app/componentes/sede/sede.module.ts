import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SedeComponent } from './sede.component';


import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import { NgPipesModule } from 'ngx-pipes';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    SedeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatButtonModule,

    // MatFormFieldModule,
    MatIconModule,
    MatProgressBarModule,
    MatRadioModule,
    // MatDividerModule,
    NgPipesModule
  ],
  providers: [
  ],
})

export class SedeModule { }
