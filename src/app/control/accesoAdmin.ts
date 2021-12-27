import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { MenuService } from 'src/app/servicios/menu.service';
import jwt_decode from "jwt-decode";



@Injectable({
  providedIn: 'root'
})
export class AccesoAdmin implements CanActivate {
  cookieValue = '';
  icon = '';

  public loginId: string;
  public _baseUrlLogin: string;

  constructor(private router: Router,
    @Inject('UrlLogin') baseUrlLogin: string,
    public cookieService: CookieService,  
    private m : MenuService
    ) {
    this._baseUrlLogin = baseUrlLogin;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    this.loginId = this.cookieService.get('token');  
    this.m.datos(this.loginId) 
    
    if (this.loginId == "" || this.loginId == undefined || (this.m.datosUsuario.Rol != "Administrador")) {
      const tree: UrlTree = this.router.parseUrl(this._baseUrlLogin);
      return tree;
    }
  
    return true;
  }

}
