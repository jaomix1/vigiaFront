import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from '../baseComponent';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { SolService } from 'src/app/servicios/sol.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Encuesta2, Respuesta2 } from 'src/app/modelos/pregunta';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-respuesta',
  templateUrl: './respuesta.component.html',
  styleUrls: ['./respuesta.component.scss']
})
export class RespuestaComponent extends BaseFormComponent implements OnInit {

  id : number =0;
  public respuestas : Respuesta2[] = null;
  public detalles : Encuesta2 = null;

  displayedColumns: string[] = ['Orden', 'Pregunta', 'Valor', 'Observacion'];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mys: SolService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.cargarEncuestaDetalles(this.id);      
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
    this.mys.cargarRespuestas(PeriodoSedeId)
      .subscribe(response => {
        this.loanding = false;       
        this.respuestas = response;
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
  }


   /**
  * restaura el formulario a valores iniciales
  */
  cancelar() {
    this.router.navigate(['/index/crear'])
  }

}
