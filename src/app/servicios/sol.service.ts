import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { BaseService } from '../control/baseService';
import { MisSede, Sede } from '../modelos/sede';
import { Encuesta, Encuesta2, Pregunta, Respuesta2, Respuesta3, Respuesta4 } from '../modelos/pregunta';
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
  misSedes() {
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
  cargarRespuestas(PeriodoSedeId : number) {
    return this.http.get<Respuesta2[]>(
      this._baseUrl + `SOL/Respuestas/` +PeriodoSedeId
    ).pipe(
      catchError(this.errorMgmt)
    );
  }
  cargarRespuestasDetalladas(PeriodoSedeId : number) {
    return this.http.get<Respuesta3[]>(
      this._baseUrl + `SOL/Respuestas/Detalladas/` +PeriodoSedeId
    ).pipe(
      catchError(this.errorMgmt)
    );
  }

  cargarEncuestaDetalles(EncuestaId : number) {
    return this.http.get<Encuesta2>(
      this._baseUrl + `SOL/Encuestas/` +EncuestaId
    ).pipe(
      catchError(this.errorMgmt)
    );
  }

  cargarEncuestas() {
    return this.http.get<Encuesta2[]>(
      this._baseUrl + `SOL/Encuestas/`
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

  cargarRespuesta(encuestaId:number, respuestaId: number) {    
    return this.http.get<Respuesta4>(
      this._baseUrl + `SOL/Respuesta/`+encuestaId + `/` + respuestaId
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

  cambiarDelegadoRespuesta(dato:any) {
    debugger
    return this.http.post<any>(
      this._baseUrl + `SOL/Delegado`, dato
    )
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  cambiarIndicardorRespuesta(dato:any) {
    debugger
    return this.http.post<any>(
      this._baseUrl + `SOL/Indicardor`, dato
    )
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  
  cambiarCumplimientoRespuesta(dato:any) {
    debugger
    return this.http.post<any>(
      this._baseUrl + `SOL/Cumplimiento`, dato
    )
      .pipe(
        catchError(this.errorMgmt)
      );
  }
 
  cambiarComentarioRespuesta(dato:any) {
    debugger
    return this.http.post<any>(
      this._baseUrl + `SOL/Comentario`, dato
    )
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  




  ////////////////////////////////////////PQR//////////////////////////////////////////////////////////

  // crearPqr(dato: any) {
  //   //dato.UsuarioId = "mercury";
  //   return this.http.post<transaccion>(
  //     this._baseUrl + `PQR`, dato
  //   )
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     );
  // }

}