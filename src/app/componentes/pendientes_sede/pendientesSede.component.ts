import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from '../baseComponent';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { SolService } from 'src/app/servicios/sol.service';
import { MisSede, Sede } from 'src/app/modelos/sede';
import { Encuesta, Encuesta2, Pregunta, Respuesta, Respuesta2, Respuesta3 } from 'src/app/modelos/pregunta';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Pag3Component } from '../encuesta_editar_modal/pag3.component';
import { Combo } from 'src/app/modelos/combos';

@Component({
  selector: 'app-pendientesSede',
  templateUrl: './pendientesSede.component.html',
  styleUrls: ['./pendientesSede.component.scss']
})
export class PendientesSedeComponent extends BaseFormComponent implements OnInit {

  id: number = 0;
  public respuestas: Respuesta3[] = null;
  public sedes: Combo[] = null;

  displayedColumns: string[] = ['Periodo', 'Orden', 'Pregunta', 'Valor', 'Observacion', 'Limite', 'Delegada', 'Realizacion', 'Indicador', 'Cumplimiento', 'Comentario'];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mys: SolService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  tamano: any = { col: 1, row: 1 };
  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.tamano = { col: 4, row: 1 };
        } else {
          this.tamano = { col: 4, row: 1 };
        }
      });


    this.cargarSedes();
  }

  cargarRespuestas(sedeId) {
    this.loanding = true;
    this.mys.cargarPendientesSede(sedeId)
      .subscribe(response => {
        this.loanding = false;
        this.respuestas = response;
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
  }

  ver(observacion: string) {
    Swal.fire({
      html: '<p style="font-size: small">' + observacion + '</p>',
      width: "100%",
      customClass: {
        popup: 'format-pre'
      }
    })
  }

  cargarSedes() {
    this.loanding = true;
    this.mys.cargarComboSedes()
      .subscribe(response => {
        this.loanding = false;
        this.sedes = response;
        this.sedes.unshift({ Id: null, Descripcion: 'Seleccione una sede' })
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
  }


  submitForm = new FormGroup({
    SedeId: new FormControl(null, [Validators.required]),
  })

  submit() {
    if (this.submitForm.valid) {
      this.cargarRespuestas(this.submitForm.value.SedeId);
    }
  }


  // modificar(guid: any) {
  //   const dialogRef = this.dialog.open(Pag3Component, {
  //     width: '800px',
  //     height: '700px',
  //     data: { EncuestaId : this.id, RespuestaId : guid},
  //     //disableClose: true
  //   });
  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     this.cargarEncuestaDetalles(this.id);      
  //   });
  // }

  /**
 * restaura el formulario a valores iniciales
 */
  cancelar() {

  }


}
