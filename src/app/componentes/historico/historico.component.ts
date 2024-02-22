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
import { Combo } from 'src/app/modelos/combos';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent extends BaseFormComponent implements OnInit {
  periodos: Combo[] = null;
  encuestas: Encuesta2[] = null;

  //  displayedColumns: string[] = ['EncuestaId', 'SedeId', 'Sede', 'PeriodoId','Periodo', 'FechaCreacion', 'Usuario', 'accion'];

  displayedColumns: string[] = ['Empresa', 'Sede', 'Periodo', 'FechaCreacion', 'accion'];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mys: SolService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    super();
  }

  submitForm = new FormGroup({
    PeriodoId: new FormControl(0, []),
  })

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


    this.cargarPeriodos();
  }

  cargarPeriodos() {
    this.loanding = true;
    this.mys.cargarComboPeriodos()
      .subscribe(response => {
        this.loanding = false;
        this.periodos = response;
        this.periodos.unshift({ Id: 0, Descripcion: 'TODOS' })

        this.cargarMisEncuestas(0);
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
  }

  cargarMisEncuestas(periodoId: number | null = null) {
    this.loanding = true;
    this.mys.cargarEncuestas(periodoId)
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

  ver(encuestaId) {
    window.open("/consultar/" + encuestaId, "_blank");
  }

  /**
 * restaura el formulario a valores iniciales
 */
  cancelar() {

  }

  submit() {
    if (this.submitForm.valid) {

      this.cargarMisEncuestas(this.submitForm.value.PeriodoId);
    }
  }


}
