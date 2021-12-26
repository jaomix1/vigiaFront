import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { BaseService } from '../control/baseService';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {
  constructor(
    @Inject('UrlApi') baseUrl: string,
    private http: HttpClient,
    //private router: Router,       
  ) {
    super(baseUrl);
  }


  login(dato: any) {
  return this.http.post<any>(
    this._baseUrl + `User/Login`, dato
  )
    .pipe(
      catchError(this.errorMgmt)
    );
}

}