import { Component, Inject } from '@angular/core';
import { BaseFormComponent } from '../baseComponent';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SolService } from 'src/app/servicios/sol.service';


@Component({
  selector: 'app-sedeEditar',
  templateUrl: './sedeEditar.component.html',
  styleUrls: ['./sedeEditar.component.scss']
})
export class SedeEditarComponent extends BaseFormComponent {
  empresas: any = [];
  encuestadores: any = [];
  departamentos: any = [];
  sedeId: number = 0;
  tipos: any = [{ id: 1, nombre: "EMPRESA GRANDE" }, { id: 2, nombre: "EMPRESA MEDIANA" }, { id: 3, nombre: "EMPRESA PEQUEÑA" }, { id: 5, nombre: "EMPRESA TERCERA" }, { id: 4, nombre: "DISPENSARIO" }];

  public demo1TabIndex = 0;
  minDate = this.fechaHoyMasDias(0, 0)

  submitForm = new FormGroup({
    EmpresaId: new FormControl('', [Validators.required]),
    Sede: new FormControl('', [Validators.required]),
    UsuarioId: new FormControl('', [Validators.required]),
    Base: new FormControl(0, [Validators.required]),
    Tipo: new FormControl(0, [Validators.required]),
    Codigo: new FormControl(0, [Validators.required]),
    DepartamentoId: new FormControl('1', [Validators.required]),
  })

  constructor(
    private mys: SolService,
    public dialogRef: MatDialogRef<SedeEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.loanding = false;
    this.cargarEmpresas();
    this.cargarSedeEncuestadores();
    this.cargarDepartamentos();
    this.sedeId = data.SedeId;

    this.submitForm.controls['EmpresaId'].setValue(data.EmpresaId);
    this.submitForm.controls['Sede'].setValue(data.Sede);
    this.submitForm.controls['UsuarioId'].setValue(data.UsuarioId);
    this.submitForm.controls['Base'].setValue(data.Base);
    this.submitForm.controls['Tipo'].setValue(data.Tipo);
    this.submitForm.controls['Codigo'].setValue(data.Codigo);
    this.submitForm.controls['DepartamentoId'].setValue(data.DepartamentoId);
  }



  submit() {
    if (this.submitForm.valid) {
      this.loanding = true;
      this.mys.EditarSede(this.sedeId, this.submitForm.value)
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

  cargarEmpresas() {
    this.loanding = true;
    this.mys.cargarComboEmpresas()
      .subscribe(response => {
        this.loanding = false;
        this.empresas = response;
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
  }


  cargarSedeEncuestadores() {
    this.loanding = true;
    this.mys.SedeEncuestadores()
      .subscribe(response => {
        this.loanding = false;
        this.encuestadores = response;
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
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

  onNoClick(): void {
    this.submitForm.reset();
    this.dialogRef.close();
  }

}
