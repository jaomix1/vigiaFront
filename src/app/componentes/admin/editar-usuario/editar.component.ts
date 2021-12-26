import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { BaseFormComponent } from '../../baseComponent';
import { UsuarioService } from '../../../servicios/usuario.service';
import { Usuario } from '../../../modelos/user';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent extends BaseFormComponent {

  hidePassword = true;

  pacienteForm = new FormGroup({
    guid: new FormControl('', [Validators.required]),
    nombreCompleto: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    usuario: new FormControl('', [Validators.required]),
    perfilId: new FormControl('Comun', [Validators.required]),
    passwords: new FormGroup({
      clave: new FormControl('', [Validators.required]),
      repetirClave: new FormControl('', [Validators.required]),
  }, {validators: this.passwordConfirming})
  })
  
  constructor(
    private us: UsuarioService,
    public dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {

      super();
      this.cargarUsuario(data);
    }

  onNoClick(): void {
    this.pacienteForm.reset();
    this.dialogRef.close();
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('clave').value !== c.get('repetirClave').value) {
        return {invalid: true};
    }
}

cargarUsuario(dato : string){
  this.loanding = true;
  this.us.consultarUsuario(dato)
  
  .subscribe(req => {
    this.pacienteForm.controls['guid'].setValue(req.guid);
    this.pacienteForm.controls['correo'].setValue(req.correo);
    this.pacienteForm.controls['usuario'].setValue(req.usuario);
    this.pacienteForm.controls['perfilId'].setValue(req.perfilId);
    this.pacienteForm.controls['nombreCompleto'].setValue(req.nombreCompleto);
    this.loanding = false;
  }, error => {
    this.loanding = false;
    this.error(error);
  }
  )
}

  guardar(): void{
    if (this.pacienteForm.valid) {
      this.loanding = true;
      let usuario =  new Usuario;
      usuario.guid = this.pacienteForm.value.guid;
      usuario.correo = this.pacienteForm.value.correo;
      usuario.usuario = this.pacienteForm.value.usuario;
      usuario.clave = this.pacienteForm.value.passwords.clave;
      usuario.perfilId = this.pacienteForm.value.perfilId;
      usuario.nombreCompleto = this.pacienteForm.value.nombreCompleto;
      
      this.us.editarUsuario(usuario)
      .subscribe(req => {
        this.loanding = false;
        this.dialogRef.close(req);
      }, error => {
        this.loanding = false;
        this.error(error);
      }
      )
    }
  }
}
