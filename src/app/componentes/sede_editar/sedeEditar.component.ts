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
  empresas : any = [];
  encuestadores : any = [];
  sedeId : number = 0;

  public demo1TabIndex = 0;
  minDate = this.fechaHoyMasDias(0,0)

  submitForm = new FormGroup({
    EmpresaId: new FormControl('', [Validators.required]),
    Sede: new FormControl('', [Validators.required]),
    UsuarioId: new FormControl('', [Validators.required]),
    Base: new FormControl(0, [Validators.required]),
  })

  constructor(
    private mys: SolService,
    public dialogRef: MatDialogRef<SedeEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.loanding = false;
    this.cargarEmpresas();
    this.cargarSedeEncuestadores();
    this.sedeId = data.SedeId;
    
    this.submitForm.controls['EmpresaId'].setValue(data.EmpresaId);    
    this.submitForm.controls['Sede'].setValue(data.Sede);    
    this.submitForm.controls['UsuarioId'].setValue(data.UsuarioId);    
    this.submitForm.controls['Base'].setValue(data.Base);
  }

  
  
  submit() {
    if (this.submitForm.valid) {
      this.loanding = true;
      this.mys.Editarede(this.sedeId, this.submitForm.value)
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

  cargarEmpresas(){
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


  cargarSedeEncuestadores(){
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

}
