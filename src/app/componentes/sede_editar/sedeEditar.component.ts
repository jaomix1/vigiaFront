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
  selector: 'app-sedeEditar',
  templateUrl: './sedeEditar.component.html',
  styleUrls: ['./sedeEditar.component.scss']
})
export class SedeEditarComponent extends BaseFormComponent {
  loanding = true;
  public encuestaId: number;
  public respuestaId: number;
  public respuesta: Respuesta4;
  public delegados: [string, string][] = []
  public seguimientos : any;

  
  displayedColumns: string[] = ['Tipo', 'Detalle', 'NombreCompleto', 'Fecha'];

  public demo1TabIndex = 0;


   submitForm2 = new FormGroup({
    DelegadoId: new FormControl('1', [Validators.required]),
    Cumplimiento: new FormControl('1', [Validators.required]),
  })


  constructor(
    private mys: SolService,
    public dialogRef: MatDialogRef<SedeEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.loanding = true;
    this.encuestaId = parseInt(data.EncuestaId);
    this.respuestaId = data.RespuestaId;
    this.obtenerPqr(this.encuestaId, this.respuestaId);
    //this.CargarSubMotivos()
  }

  obtenerPqr(encuestaId: number, respuestaId: number) {
    this.submitForm2.reset();
    this.loanding = true;
    debugger
    this.mys.cargarRespuesta(encuestaId, respuestaId).subscribe(req => {
      
      this.respuesta = req;
      this.loanding = false;
    }, error => {
      debugger
      this.loanding = false;
      this.error(error);
    }, () => {
        this.cargarDelegados();      
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

  cargarDelegados(){
    this.loanding = true;
    this.submitForm2.controls['DelegadoId'].setValue('');
    this.mys.cargarComboDelegados()
    .subscribe(response => {
      this.loanding = false;
      response.forEach(obj=> {
        this.delegados[obj.Id.toString()] = obj.Descripcion
      })
    }, error => {
      this.loanding = false;
      this.error(error);
    }, () => {
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
  cambiarDelegado(RespuestaId){
    Swal.fire({
      title: 'Cambio de delegado',
      input: 'select',
      inputOptions:  this.delegados ,
      inputPlaceholder: 'Seleccione un delegado',
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        if (!result.value) throw "Debe seleccionar un delegado";
        let dato = { EncuestaId : this.encuestaId, RespuestaId : RespuestaId, DelegadoId : parseInt(result.value) }
        this.mys.cambiarDelegadoRespuesta(dato)
        .subscribe(response => {
          this.loanding = false;
          this.obtenerPqr(this.encuestaId, this.respuestaId);
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

  cambiarIndicardor(RespuestaId){
    Swal.fire({
      title: 'Cambio de % Indicador',
      input: 'text',
      inputPlaceholder: 'Ingrese el % del Indicador',
      inputValue: 0,
      inputAttributes: {
        min: '0',
        max: '100'
      },
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        if (!result.value) throw "Debe Ingresar el % del Indicador";
        debugger
        let dato = { EncuestaId : this.encuestaId, RespuestaId : RespuestaId, Indicador : parseInt(result.value) }
        this.mys.cambiarIndicardorRespuesta(dato)
        .subscribe(response => {
          this.loanding = false;
          this.obtenerPqr(this.encuestaId, this.respuestaId);
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

  cambiarCumplimiento(RespuestaId){
    Swal.fire({
      title: 'Cambio de % cumplimiento',
      input: 'number',
      inputPlaceholder: 'Ingrese el % del cumplimiento',
      inputValue: 0,
      inputAttributes: {
        min: '0',
        max: '100'
      },
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        if (!result.value) throw "Debe Ingresar el % del cumplimiento";
        debugger
        let dato = { EncuestaId : this.encuestaId, RespuestaId : RespuestaId, Cumplimiento : parseInt(result.value) }
        this.mys.cambiarCumplimientoRespuesta(dato)
        .subscribe(response => {
          this.loanding = false;
          this.obtenerPqr(this.encuestaId, this.respuestaId);
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
          this.obtenerPqr(this.encuestaId, this.respuestaId);
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

  // submit2() {
  //   this.procArchivo = 0;
  //   if (this.submitForm2.valid) {
  //     this.loanding = true;
  //     this.mys.trasladarPqr(this.PQRid, this.submitForm2.value)
  //       .subscribe(response => {
  //           this.loanding = false;
  //           this.obtenerPqr(this.PQRid);
  //       }, error => {
  //         this.loanding = false;
  //         this.error(error);
  //       }, () => {
  //       })
  //   }
  // }



  // displayColunmasPQR: string[] = ['key', 'value', 'action'];
  // dataPQR = [];

  // displayColunmasPQRdetalles: string[] = ['Solicitud', 'Estado', 'Creacion', 'Ver'];
  // dataPQRdetalles = [];

  // displayColunmasPQRarchivos: string[] = ['Id', 'Archivo'];
  // dataPQRarchivos = [];





  // /**
  //  * consulta las sedes de una empresa
  //  * @param {number} EmpresaId - id de la empresa seleccionada.
  //  */


  // mostrarDetalle(dato : string){
  //   Swal.fire({
  //     html: '<p style="font-size: small">' + dato + '</p>',
  //     width: "100%",
  //     customClass: {
  //       popup: 'format-pre'
  //     }
  //   })
  // }

  // cambiarEstado(estado: number) {
  //   Swal.fire({
  //     title: 'Cambiar estado PQR',
  //     input: 'textarea',
  //     inputPlaceholder: 'Ingrese un comentario del seguimiento',
  //     inputAttributes: {  maxlength: "2000" },
  //     showCancelButton: true,
  //   }).then(result => {

  //     if (!result) throw null;

  //     if(result.isConfirmed ){
  //       if (!result.value) throw "Debe ingresar un comentario";

  //       this.loanding = true;
  //       this.newDetalle  = { Guid : this.pqr.Guid, Descripcion : result.value, EstadoId : estado };
  //       this.mys.crearPqrDetalle(this.newDetalle).subscribe(req => {
  //         this.obtenerPqr(this.pqr.Guid);
  //         this.demo1TabIndex = 1;
  //         this.loanding = false;
  //       }, error => {
  //         this.loanding = false;
  //         this.error(error);
  //       })
  //     }
  //   }).catch(err => {
  //     this.loanding = false;
  //     this.error(err);
  //   })
  // }



  // guardar(): void {
  //   this.loanding = true;
  // }


  // procArchivo: number = 0;


  // CargarSubMotivos() {
  //   this.loanding = true;
  //   this.mys.SubMotivos()
  //     .subscribe(response => {
  //       this.loanding = false;
  //       response.forEach(obj=> {
  //         this.subMotivos[obj.Id.toString()] = obj.Descripcion
  //       })
  //       console.dir(this.subMotivos)
  //     }, error => {
  //       this.loanding = false;
  //       this.error(error);
  //     }, () => {
  //     })
  // }


}
