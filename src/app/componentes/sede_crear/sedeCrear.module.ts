import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SedeCrearComponent } from './sedeCrear.component';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    SedeCrearComponent,
  ],
  imports: [    
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,


    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatButtonModule,

    // MatFormFieldModule,
    MatIconModule,
    MatProgressBarModule,
    // MatDividerModule,

    MatTableModule,
    MatDialogModule,
    MatTabsModule,
    MatListModule,

  ],
  providers: [
  ],
})

export class SedeCrearModule { }
