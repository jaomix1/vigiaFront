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

import {MatSort, Sort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-pendientesGenerales',
  templateUrl: './pendientesGenerales.component.html',
  styleUrls: ['./pendientesGenerales.component.scss']
})
export class PendientesGeneralesComponent extends BaseFormComponent implements OnInit {
 
  id : number =0;
  //public respuestas : Respuesta3[] = null;
  public sedes : Combo[] = null;
  
  displayedColumns: string[] = ['Periodo', 'Sede', 'Orden', 'Pregunta', 'Valor', 'Observacion', 'Limite', 'Delegada', 'Realizacion', 'Indicador', 'Cumplimiento', 'Comentario'];
  dataSource = new MatTableDataSource();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mys: SolService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    super();
  }

  @ViewChild(MatSort) sort: MatSort;


  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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
      this.cargarRespuestas();
  }

  cargarRespuestas(){
    this.loanding = true;
    this.mys.cargarPendientesGenerales()
      .subscribe(response => {
        this.loanding = false;         
        this.dataSource = new MatTableDataSource(response);  
        this.dataSource.sort = this.sort; 
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

  cargarSedes(){
    this.loanding = true;
    this.mys.Sedes()
      .subscribe(response => {
        this.loanding = false;       
        this.sedes = response.map(c=> <Combo> { Id : c.SedeId, Descripcion : c.Sede});
        this.sedes.unshift({ Id : null, Descripcion : 'Seleccione una sede'})
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
  }  

  cancelar() {

  }

  
}
