import { Component, Inject } from '@angular/core';
import { BaseFormComponent } from '../baseComponent';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SolService } from 'src/app/servicios/sol.service';
import { Respuesta4 } from 'src/app/modelos/pregunta';
import { Combo } from 'src/app/modelos/combos';


@Component({
  selector: 'app-periodoCrear',
  templateUrl: './periodoCrear.component.html',
  styleUrls: ['./periodoCrear.component.scss']
})
export class PeriodoCrearComponent extends BaseFormComponent {
  

  public demo1TabIndex = 0;
  minDate = this.fechaHoyMasDias(0,0)

  submitForm = new FormGroup({
    Periodo: new FormControl('', [Validators.required]),
    FechaActivacion: new FormControl(this.fechaHoyMasDias(0, 5), [Validators.required]),
    FechaFin: new FormControl(this.fechaHoyMasDias(0, 5), [Validators.required]),
    FechaCierre: new FormControl(this.fechaHoyMasDias(0, 5), [Validators.required]),
  })

  constructor(
    private mys: SolService,
    public dialogRef: MatDialogRef<PeriodoCrearComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.loanding = false;
  }

  
  submit() {
    if (this.submitForm.valid) {
      this.loanding = true;
      this.mys.CrearPeriodo(this.submitForm.value)
        .subscribe(response => {
            this.loanding = false;
            this.dialogRef.close(response);
        }, error => {
          this.loanding = false;
          this.error(error);
        }, () => {
        })
    }
  }

}
