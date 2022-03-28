import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from '../baseComponent';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { SolService } from 'src/app/servicios/sol.service';
import { Periodo } from 'src/app/modelos/periodo';
import { Encuesta, Encuesta2, Pregunta, Respuesta } from 'src/app/modelos/pregunta';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PeriodoCrearComponent } from '../periodo_crear/periodoCrear.component';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.scss']
})
export class PeriodoComponent extends BaseFormComponent implements OnInit {
 
  //sedes : Sede[] = null;
  dataSource: MatTableDataSource<Periodo>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
//displayedColumns: string[] = ['EmpresaId', 'Empresa', 'SedeId','Sede','UsuarioId','Usuario','accion'];
displayedColumns: string[] = ['Periodo', 'FechaActivacion','FechaFin','FechaCierre', 'Estado', 'accion'];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mys: SolService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    super();
    this.cargarPeriodos();
  }

  tamano: any = { col: 1, row: 1 };
  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.tamano = { col: 4, row: 14 };
        } else {
          this.tamano = { col: 4, row: 14 };
        }
      });
  }

  cargarPeriodos(){
    this.loanding = true;
    this.mys.Periodos()
      .subscribe(response => {
        this.loanding = false;
        //this.sedes = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        console.log(response)
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
  }

  activarPeriodo(periodoId){
    alert(periodoId)
    this.loanding = true;
    this.mys.ActivarPeriodo(periodoId)
      .subscribe(response => {
        this.loanding = false;
        this.cargarPeriodos();
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

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PeriodoCrearComponent, {
      width: '600px',
      data: { correo: '', guid: '', usuario: '', bloquedo: '', }
    });

    dialogRef.afterClosed().subscribe(() => {
        this.cargarPeriodos();
    });
  }

  
}
