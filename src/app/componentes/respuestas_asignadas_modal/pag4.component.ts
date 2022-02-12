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
  selector: 'app-pag4',
  templateUrl: './pag4.component.html',
  styleUrls: ['./pag4.component.scss']
})
export class Pag4Component extends BaseFormComponent {
  loanding = true;
  public encuestaId: number;
  public respuestaId: number;
  public respuesta: Respuesta4;
  public delegados: [string, string][] = []
  public seguimientos : any;
  maxDate = this.fechaHoyMasDias(0)
  
  displayedColumns: string[] = ['Tipo', 'Detalle', 'NombreCompleto', 'Fecha'];

  public demo1TabIndex = 0;


  submitForm3 = new FormGroup({
    inicio: new FormControl(this.fechaHoyMasDias(0), [Validators.required])
  })

  submit(){
    if (this.submitForm3.valid) {
    let dato = { EncuestaId :this.encuestaId, RespuestaId :  this.respuestaId, Fecha : this.submitForm3.value.inicio  }
        this.mys.cambiarFechaRealizacionRespuesta(dato)
        .subscribe(response => {
          this.loanding = false;
          this.cargarRespuesta(this.encuestaId, this.respuestaId);
        }, error => {
          this.loanding = false;
          this.error(error);
          }, () => {
        })
      }
  }

  constructor(
    private mys: SolService,
    public dialogRef: MatDialogRef<Pag4Component>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.loanding = true;
    this.encuestaId = parseInt(data.EncuestaId);
    this.respuestaId = data.RespuestaId;
    this.cargarRespuesta(this.encuestaId, this.respuestaId);
    //this.CargarSubMotivos()
  }

  cargarRespuesta(encuestaId: number, respuestaId: number) {
    this.loanding = true;
    this.mys.cargarRespuesta(encuestaId, respuestaId).subscribe(req => {
      
      this.respuesta = req;
      this.loanding = false;
    }, error => {
      debugger
      this.loanding = false;
      this.error(error);
    }, () => {  
        this.obtenertSeguimiento(respuestaId);
    })
  }

  obtenertSeguimiento(respuestaId){
    
    this.mys.cargarSeguimiento(respuestaId).subscribe(req => {
      
      this.seguimientos = req;
      this.loanding = false;
    }, error => {
      debugger
      this.loanding = false;
      this.error(error);
    }, () => {
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
  cambiarComentario(RespuestaId){
    Swal.fire({
      title: 'Cambio de Comentario',
      input: 'textarea',
      inputPlaceholder: 'Ingrese un Comentario',
      inputAttributes: {  maxlength: "500" },
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        if (!result.value) throw "Debe Ingresar un Comentario";
        debugger
        let dato = { EncuestaId : this.encuestaId, RespuestaId : RespuestaId, Comentario : result.value }
        this.mys.cambiarComentarioRespuesta(dato)
        .subscribe(response => {
          this.loanding = false;
          this.cargarRespuesta(this.encuestaId, this.respuestaId);
        }, error => {
          this.loanding = false;
          this.error(error);
          }, () => {
        })

      }
    }).catch(err => {
      this.loanding = false;
      this.error(err);
    });


  }
  
}
