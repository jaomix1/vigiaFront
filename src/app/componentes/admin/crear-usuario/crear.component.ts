import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { BaseFormComponent } from '../../baseComponent';
import { UsuarioService } from '../../../servicios/usuario.service';
import { Usuario } from '../../../modelos/user';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent extends BaseFormComponent {

  hidePassword = true;

  pacienteForm = new FormGroup({
    correo: new FormControl('', [Validators.required]),
    usuario: new FormControl('', [Validators.required]),
    nombreCompleto: new FormControl('', [Validators.required]),
    perfilId: new FormControl('Encuestador', [Validators.required]),
    passwords: new FormGroup({
      clave: new FormControl('', [Validators.required]),
      repetirClave: new FormControl('', [Validators.required]),
  }, {validators: this.passwordConfirming})
  })
  
  constructor(
    private us: UsuarioService,
    public dialogRef: MatDialogRef<CrearComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario) {

    super();
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

  guardar(): void{
    if (this.pacienteForm.valid) {
      this.loanding = true;
      let usuario =  new Usuario;
      usuario.correo = this.pacienteForm.value.correo;
      usuario.usuario = this.pacienteForm.value.usuario;
      usuario.clave = this.pacienteForm.value.passwords.clave;
      usuario.perfilId = this.pacienteForm.value.perfilId;
      usuario.nombreCompleto = this.pacienteForm.value.nombreCompleto;
      console.log(usuario)
      this.us.crearUsuario(usuario)
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
