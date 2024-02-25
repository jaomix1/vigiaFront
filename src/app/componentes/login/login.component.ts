import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BaseFormComponent } from '../baseComponent';
//import { DataBase } from '../modelos/base';
import { LoginService } from 'src/app/servicios/login.service';
import { MenuService } from 'src/app/servicios/menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit {


  tamano: any = { col: 1 };
  tamano2: any = { col: 1 };
  hidePassword = true;
  loginForm = new FormGroup({
    Usuario: new FormControl('', [Validators.required,]),
    Clave: new FormControl('', [Validators.required]),
  })


  constructor(
    private breakpointObserver: BreakpointObserver,
    public cookieService: CookieService,
    private router: Router,
    private ls: LoginService,
    private m: MenuService
  ) {
    super();
  }

  ngOnInit(): void {
    this.cookieService.set("token", "");

    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.tamano = { col: 0, row: 1 };
          this.tamano2 = { col: 3, row: 1 };
        } else {
          this.tamano = { col: 1, row: 1 };
          this.tamano2 = { col: 1, row: 1 };
        }
      });
  }

  login() {
    if (this.loginForm.valid) {
      this.loanding = true;
      this.ls.login(this.loginForm.value).subscribe(req => {
        this.cookieService.set("token", req);
        this.m.datos(req)
        this.router.navigate(["/index"]);
      }, error => {
        this.loginForm.reset();
        this.error(error);
        this.loanding = false;
      }, () => this.loanding = false)
    }
  }

}
