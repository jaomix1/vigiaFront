import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from '../baseComponent';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { SolService } from 'src/app/servicios/sol.service';
import { MisSede } from 'src/app/modelos/sede';
import { Encuesta, Encuesta2, Pregunta, Respuesta } from 'src/app/modelos/pregunta';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent extends BaseFormComponent implements OnInit {
 
  encuestas : Encuesta2[] = null;
  
//  displayedColumns: string[] = ['EncuestaId', 'SedeId', 'Sede', 'PeriodoId','Periodo', 'FechaCreacion', 'Usuario', 'accion'];

displayedColumns: string[] = ['Empresa', 'Sede', 'Periodo', 'FechaCreacion','Usuario','accion'];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mys: SolService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    super();
    this.cargarEncuestas();
  }

  tamano: any = { col: 1, row: 1 };
  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.tamano = { col: 4, row: 15 };
        } else {
          this.tamano = { col: 4, row: 11 };
        }
      });
  }

  cargarEncuestas(){
    this.loanding = true;
    this.mys.cargarEncuestasALL()
      .subscribe(response => {
        this.loanding = false;
        this.encuestas = response;
        console.log(response)
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
  }

  ver(encuestaId){
    window.open("/consultar/"+encuestaId, "_blank");
  }

  editar(encuestaId){
    this.router.navigate(['/index/editar', encuestaId])
  }
   /**
  * restaura el formulario a valores iniciales
  */
  cancelar() {

  }

  
}
