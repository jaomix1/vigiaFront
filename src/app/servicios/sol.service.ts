import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { BaseService } from '../control/baseService';
import { MisSede } from '../modelos/sede';
import { Encuesta, Encuesta2, Pregunta, Respuesta2, Respuesta3 } from '../modelos/pregunta';

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