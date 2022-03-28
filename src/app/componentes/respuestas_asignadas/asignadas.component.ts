import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from '../baseComponent';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { SolService } from 'src/app/servicios/sol.service';
import { MisSede } from 'src/app/modelos/sede';
import { Asignada, Encuesta, Encuesta2, Pregunta, Respuesta, Respuesta2, Respuesta3 } from 'src/app/modelos/pregunta';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Pag3Component } from '../encuesta_editar_modal/pag3.component';
import { Combo } from 'src/app/modelos/combos';
import { Pag4Component } from '../respuestas_asignadas_modal/pag4.component';

import {MatSort, Sort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-asignadas',
  templateUrl: './asignadas.component.html',
  styleUrls: ['./asignadas.component.scss']
})
export class AsignadasComponent extends BaseFormComponent implements OnInit {
 
  id : number =0;
  //public respuestas : Asignada[] = null;
  public delegados : Combo[] = null;
  public empresas : Combo[] = null;
  
  displayedColumns: string[] = ['Empresa', 'Sede', 'Pregunta', 'Observacion', 'Valor', 'Limite', 'Realizacion', 'Estado', 'accion'];
  respuestas = new MatTableDataSource();


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

  submitForm = new FormGroup({
    EmpresaId: new FormControl(0, []),
    DelegadoId: new FormControl(null, [Validators.required]),
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

      this.cargarEmpresas();
      this.cargardelegados();
  }

  cargardelegados(){
    this.loanding = true;
    this.mys.cargarComboDelegados()
      .subscribe(response => {
        this.loanding = false;       
        this.delegados = response;
        this.delegados.unshift({ Id : null, Descripcion : 'Seleccione un delegado'})
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
  }  

  cargarEmpresas(){
    this.loanding = true;
    this.mys.cargarComboEmpresas()
      .subscribe(response => {
        this.loanding = false;       
        this.empresas = response;
        this.empresas.unshift({ Id : 0, Descripcion : 'Seleccione una empresa (opcional)'})
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
  }  
  
  cargarAsignadas(EmpresaId : number, DelegadoId : number){
    this.loanding = true;
    this.mys.cargarRespuestasAsignadas(EmpresaId,DelegadoId)
      .subscribe(response => {
        this.loanding = false;       
        this.respuestas= new MatTableDataSource(response);  
        this.respuestas.sort = this.sort; 
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
  } 

  submit() {
    if (this.submitForm.valid) {      

      this.cargarAsignadas(this.submitForm.value.EmpresaId,this.submitForm.value.DelegadoId);
    }
  }

  modificar(encuestaId: any,  respuestaId: number) {
    const dialogRef = this.dialog.open(Pag4Component, {
      width: '800px',
      height: '700px',
      data: { EncuestaId : encuestaId, RespuestaId : respuestaId},
      //disableClose: true
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.submit();     
    });
  }

  // modificar(encuestaId: any,  respuestaId: number) {
  //   Swal.fire({
  //     title: 'Finalizar',
  //     text: 'desea finalizar la tarea?',
  //     showCancelButton: true
  //   }).then(result => {
  //     if (result.isConfirmed) {        
  //       let dato = { EncuestaId : encuestaId, RespuestaId : respuestaId, DelegadoId : parseInt(result.value) }
  //       this.mys.cambiarFechaRealizacionRespuesta(dato)
  //       .subscribe(response => {
  //         this.loanding = false;
  //         this.submit();
  //       }, error => {
  //         this.loanding = false;
  //         this.error(error);
  //         }, () => {
  //       })
  //     }
  //   }).catch(err => {
  //     this.loanding = false;
  //     this.error(err);
  //   });
  // }

}
