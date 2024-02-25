import { Component, Inject } from '@angular/core';
import { BaseFormComponent } from '../baseComponent';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  private control: FormArray;
  public demo1TabIndex = 0;
  minDate = this.fechaHoyMasDias(0, 0);
  departamentos: any = [];

  submitForm = new FormGroup({
    Periodo: new FormControl(this.fechaHoyMasDias(0, 5).toString().substring(0, 7), [Validators.required]),
    Departamentos: new FormControl('', [Validators.required]),
  })

  constructor(
    private mys: SolService,
    public dialogRef: MatDialogRef<PeriodoCrearComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();

    this.loanding = false;
    this.cargarDepartamentos();
  }

  cargarDepartamentos() {
    this.loanding = true;
    this.mys.cargarComboDepartamentos()
      .subscribe(response => {
        this.loanding = false;
        this.departamentos = response;
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
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

  onNoClick(): void {
    this.submitForm.reset();
    this.dialogRef.close();
  }
}
