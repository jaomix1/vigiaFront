import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from '../baseComponent';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { SolService } from 'src/app/servicios/sol.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent extends BaseFormComponent implements OnInit {
 
  data : any = null;
  TotalSedes : any;
  EncuestaPeriodoActivo : any
  SedePendientes : any
  Consolidados : any
  TopSedes : any
  TopEmpresas : any
  CumplimientoDelados : any
  public _baseUrl: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mys: SolService,
    public dialog: MatDialog,
    private router: Router,
    @Inject('UrlApi') baseUrl: string,
  ) {
    super();
    this.cargarreportePeriodoActivo();
    this._baseUrl = baseUrl;
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

  cargarreportePeriodoActivo(){
    this.loanding = true;
    this.mys.ReportePeriodoActivo()
      .subscribe(response => {
        this.loanding = false;
        this.data = response;
        this.TotalSedes = response[0][0].TotalSedes
        this.EncuestaPeriodoActivo = response[1][0].EncuestaPeriodoActivo
        this.SedePendientes =response[2]
        this.Consolidados = response[3]
        this.TopSedes= response[4]
        this.TopEmpresas = response[5]
        this.CumplimientoDelados = response[6]
        console.log(response)
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
  }

  exportar(){
    window.open(this._baseUrl + "SOL/Reporte/Excel", "_blank");
  }
  
}
