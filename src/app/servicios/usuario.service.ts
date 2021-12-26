import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { BaseService } from '../control/baseService';
import { Usuario } from '../modelos/user';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService extends BaseService {

    constructor(
        @Inject('UrlApiSecure') baseUrl: string,
        private http: HttpClient,
        //private router: Router,       
    ) {
        super(baseUrl);
    }

    consultarUsuarios() {        
        return this.http.get<Usuario[]>(
            this._baseUrl + `Usuario/Index`
        ).pipe(
            catchError(this.errorMgmt)
        );
    }

    consultarUsuario(guid : string) {        
        return this.http.get<Usuario>(
            this._baseUrl + `Usuario/Index/${guid}`
        ).pipe(
            catchError(this.errorMgmt)
        );
    }

    crearUsuario(dato : Usuario) {        
        return this.http.post<Usuario>(
            this._baseUrl + `Usuario/Create`, dato
        ).pipe(
            catchError(this.errorMgmt)
        );
    }

    editarUsuario(dato : Usuario) {        
        return this.http.post<Usuario>(
            this._baseUrl + `Usuario/Edit`, dato
        ).pipe(
            catchError(this.errorMgmt)
        );
    }

    bloquearUsuario(guid : string) {        
        return this.http.post<Usuario>(
            this._baseUrl + `Usuario/Bloq/`+guid, "1"
        ).pipe(
            catchError(this.errorMgmt)
        );
    }


//     // consultarPacienteBateria(guid: string) {        
//     //     return this.http.get<DataBase>(
//     //         this._baseUrl + `paciente/bateria/${guid}`
//     //     ).pipe(
//     //         catchError(this.errorMgmt)
//     //     );
//     // }
}