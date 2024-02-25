import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


export function getUrlLogin() {
  return "login";
}

let URL = "http://190.145.26.91:8091"; //EXTE
//let URL = "http://localhost:8091"; //lOCAL

export function getUrlApiSecure() {
  return URL + "/V1/"
}

export function getUrlApi() {
  return URL + "/V1/"
}

export function getUrlFile() {
  return URL
}

const provider = [
  { provide: "UrlLogin", useFactory: getUrlLogin, deps: [] },
  { provide: "UrlApiSecure", useFactory: getUrlApiSecure, deps: [] },
  { provide: "UrlApi", useFactory: getUrlApi, deps: [] },
  { provide: "UrlFile", useFactory: getUrlFile, deps: [] },
  // { provide: "UrlApi", useFactory: getUrlApi, deps: [] },
  // { provide: "UrlMain", useFactory: getUrlMain, deps: [] },
  // { provide: "UrlFile", useFactory: getUrlFile, deps: [] },
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(provider).bootstrapModule(AppModule)
  .catch(err => console.error(err));
