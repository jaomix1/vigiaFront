import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { BaseService } from '../control/baseService';
import { MisSede, Sede } from '../modelos/sede';
import { Periodo } from '../modelos/periodo';
import { Asignada, Encuesta, Encuesta2, Pregunta, Respuesta2, Respuesta3, Respuesta4 } from '../modelos/pregunta';
import { Combo } from '../modelos/combos';

@Injectable({
  providedIn: 'root'
})
export class SolService extends BaseService {

  constructor(
    @Inject('UrlApi') baseUrl: string,
    private http: HttpClient,
    //private router: Router,       
  ) {
    super(baseUrl);
  }

  ////////////////////////////////////////Combos//////////////////////////////////////////////////////////
  misSedesAencuestar() {
    return this.http.get<MisSede[]>(
      this._baseUrl + `SOL/Sedes`
    ).pipe(
      catchError(this.errorMgmt)
    );
  }

  Sedes() {
    return this.http.get<Sede[]>(
      this._baseUrl + `SOL/Sedes/Config`
    ).pipe(
      catchError(this.errorMgmt)
    );
  }


  SedeEncuestadores() {
    return this.http.get<Sede[]>(
      this._baseUrl + `SOL/Sedes/Encuestadores`
    ).pipe(
      catchError(this.errorMgmt)
    );
  }


  CrearSede(datos: Sede) {
    return this.http.post<any>(
      this._baseUrl + `SOL/Sedes/Crear`, datos
    )
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  EditarSede(sedeId: number, datos: Sede) {
    return this.http.post<any>(
      this._baseUrl + `SOL/Sedes/Editar/` + sedeId, datos
    )
      .pipe(
        catchError(this.errorMgmt)
      );
  }



  Periodos() {
    return this.http.get<Periodo[]>(
      this._baseUrl + `SOL/Periodos`
    ).pipe(
      catchError(this.errorMgmt)
    );
  }

  ActivarPeriodo(periodoId: number) {
    var periodo = { PeriodoId: periodoId }
    return this.http.post<Periodo[]>(
      this._baseUrl + `SOL/Periodo`, periodo
    )
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  CrearPeriodo(periodo: Periodo) {
    return this.http.post<any>(
      this._baseUrl + `SOL/Periodos/Crear`, periodo
    )
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  cargarPreguntas() {
    return this.http.get<Pregunta[]>(
      this._baseUrl + `SOL/Preguntas`
    ).pipe(
      catchError(this.errorMgmt)
    );
  }


  guardarRespuestas(dato: Encuesta) {
    return this.http.post<any>(
      this._baseUrl + `SOL/Respuestas`, dato
    )
      .pipe(
        catchError(this.errorMgmt)
      );
  }
  cargarRespuestas(PeriodoSedeId: number) {
    return this.http.get<Respuesta2[]>(
      this._baseUrl + `SOL/Respuestas/` + PeriodoSedeId
    ).pipe(
      catchError(this.errorMgmt)
    );
  }
  cargarRespuestasDetalladas(PeriodoSedeId: number) {
    return this.http.get<Respuesta3[]>(
      this._baseUrl + `SOL/Respuestas/Detalladas/` + PeriodoSedeId
    ).pipe(
      catchError(this.errorMgmt)
    );
  }

  cargarEncuestaDetalles(EncuestaId: number) {
    return this.http.get<Encuesta2>(
      this._baseUrl + `SOL/Encuestas/` + EncuestaId
    ).pipe(
      catchError(this.errorMgmt)
    );
  }

  cargarEncuestas(periodoId: null | number = null) {
    return this.http.get<Encuesta2[]>(
      this._baseUrl + `SOL/EncuestasByPeriodo/` + periodoId
    ).pipe(
      catchError(this.errorMgmt)
    );
  }

  cargarEncuestasALL() {
    return this.http.get<Encuesta2[]>(
      this._baseUrl + `SOL/Encuestas/ALL`
    ).pipe(
      catchError(this.errorMgmt)
    );
  }

  cargarComboDelegados() {
    return this.http.get<Combo[]>(
      this._baseUrl + `SOL/Combo/Delegados`
    ).pipe(
      catchError(this.errorMgmt)
    );
  }

  cargarComboEmpresas() {
    return this.http.get<Combo[]>(
      this._baseUrl + `SOL/Combo/Empresas`
    ).pipe(
      catchError(this.errorMgmt)
    );
  }


  cargarComboDepartamentos() {
    return this.http.get<Combo[]>(
      this._baseUrl + `SOL/Combo/Departamentos`
    ).pipe(
      catchError(this.errorMgmt)
    );
  }

  cargarComboSedes() {
    return this.http.get<Combo[]>(
      this._baseUrl + `SOL/Combo/Sedes`
    ).pipe(
      catchError(this.errorMgmt)
    );
  }

  cargarComboPeriodos() {
    return this.http.get<Combo[]>(
      this._baseUrl + `SOL/Combo/Periodos`
    ).pipe(
      catchError(this.errorMgmt)
    );
  }

  cargarRespuesta(encuestaId: number, respuestaId: number) {
    return this.http.get<Respuesta4>(
      this._baseUrl + `SOL/Respuesta/` + encuestaId + `/` + respuestaId
    ).pipe(
      catchError(this.errorMgmt)
    );
  }

  cargarSeguimiento(respuestaId: number) {
    return this.http.get<any>(
      this._baseUrl + `SOL/Seguimiento/` + respuestaId
    ).pipe(
      catchError(this.errorMgmt)
    );
  }

  cambiarDelegadoRespuesta(dato: any) {
    return this.http.post<any>(
      this._baseUrl + `SOL/Delegado`, dato
    )
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  cambiarFechaRealizacionRespuesta(dato: any) {
    return this.http.post<any>(
      this._baseUrl + `SOL/FechaRealizacion`, dato
    )
      .pipe(
        catchError(this.errorMgmt)
      );
  }


  cambiarIndicardorRespuesta(dato: any) {
    return this.http.post<any>(
      this._baseUrl + `SOL/Indicardor`, dato
    )
      .pipe(
        catchError(this.errorMgmt)
      );
  }


  cambiarCumplimientoRespuesta(dato: any) {
    return this.http.post<any>(
      this._baseUrl + `SOL/Cumplimiento`, dato
    )
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  cambiarComentarioRespuesta(dato: any) {
    return this.http.post<any>(
      this._baseUrl + `SOL/Comentario`, dato
    )
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  cargarRespuestasAsignadas(EmpresaId: number, DelegadoId: number) {
    return this.http.get<Asignada[]>(
      this._baseUrl + `SOL/Respuestas/Asignadas/` + EmpresaId + `/` + DelegadoId
    ).pipe(
      catchError(this.errorMgmt)
    );
  }


  ReportePeriodoActivo() {
    return this.http.get<any>(
      this._baseUrl + `SOL/Reporte/PeriodoActivo`
    ).pipe(
      catchError(this.errorMgmt)
    );
  }

  cargarPendientesSede(SedeId: number) {
    return this.http.get<Respuesta3[]>(
      this._baseUrl + `SOL/Pendientes/` + SedeId
    ).pipe(
      catchError(this.errorMgmt)
    );
  }

  cargarPendientesGenerales() {
    return this.http.get<Respuesta3[]>(
      this._baseUrl + `SOL/PendientesGenerales/`
    ).pipe(
      catchError(this.errorMgmt)
    );
  }


  ReporteExportarExcel() {
    return this.http.get<any>(
      this._baseUrl + `SOL/Reporte/Excel`
    ).pipe(
      catchError(this.errorMgmt)
    );
  }

}