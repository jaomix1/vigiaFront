import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from '../baseComponent';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { SolService } from 'src/app/servicios/sol.service';
import { MisSede } from 'src/app/modelos/sede';
import { Encuesta, Encuesta2, Pregunta, Respuesta, Respuesta2, Respuesta3 } from 'src/app/modelos/pregunta';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent extends BaseFormComponent implements OnInit {
 
  id : number =0;
  public respuestas : Respuesta3[] = null;
  public detalles : Encuesta2 = null;
  
  displayedColumns: string[] = ['Orden', 'Pregunta', 'Valor', 'Observacion', 'Limite', 'Programacion', 'Realizacion', 'Delegada', 'Indicador', 'Cumplimiento', 'Comentario'];

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
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.cargarEncuestaDetalles(this.id);      
    });

    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.tamano = { col: 4, row: 1 };
        } else {
          this.tamano = { col: 4, row: 1 };
        }
      });
  }

  cargarEncuestaDetalles(periodoSedeId : number){
    this.loanding = true;
    this.mys.cargarEncuestaDetalles(periodoSedeId)
      .subscribe(response => {
        this.loanding = false;       
        this.detalles = response;
        this.cargarRespuestas(periodoSedeId);
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
  }

  cargarRespuestas(PeriodoSedeId){
    this.loanding = true;
    this.mys.cargarRespuestasDetalladas(PeriodoSedeId)
      .subscribe(response => {
        this.loanding = false;       
        this.respuestas = response;
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
  }

  ver(observacion : string){
    debugger
    Swal.fire({
      html: '<p style="font-size: small">' + observacion + '</p>',
      width: "100%",
      customClass: {
        popup: 'format-pre'
      }
    })
  }

   /**
  * restaura el formulario a valores iniciales
  */
  cancelar() {

  }

  
}
