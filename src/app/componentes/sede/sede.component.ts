import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from '../baseComponent';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { SolService } from 'src/app/servicios/sol.service';
import { MisSede, Sede } from 'src/app/modelos/sede';
import { Encuesta, Encuesta2, Pregunta, Respuesta } from 'src/app/modelos/pregunta';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SedeEditarComponent } from '../sede_editar/sedeEditar.component';
import { SedeCrearComponent } from '../sede_crear/sedeCrear.component';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.scss']
})
export class SedeComponent extends BaseFormComponent implements OnInit {
 
  //sedes : Sede[] = null;
  dataSource: MatTableDataSource<Sede>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
//displayedColumns: string[] = ['EmpresaId', 'Empresa', 'SedeId','Sede','UsuarioId','Usuario','accion'];
displayedColumns: string[] = ['Empresa', 'Sede','Usuario', 'Base','accion'];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mys: SolService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    super();
    this.cargarSedes();
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

  cargarSedes(){
    this.loanding = true;
    this.mys.Sedes()
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

  openDialog(): void {
    const dialogRef = this.dialog.open(SedeCrearComponent, {
      width: '600px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(() => {
        this.cargarSedes();
    });
  }

  editar(SedeId, EmpresaId, Sede, UsuarioId, Base){
    const dialogRef = this.dialog.open(SedeEditarComponent, {
      width: '600px',
      data: { SedeId: SedeId, EmpresaId: EmpresaId, Sede : Sede, UsuarioId :UsuarioId, Base:Base }
    });

    dialogRef.afterClosed().subscribe(() => {
        this.cargarSedes();
    });
    
  }
   /**
  * restaura el formulario a valores iniciales
  */
  cancelar() {

  }

  
}
