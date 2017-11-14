import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Router} from '@angular/router';
import {Observable} from "rxjs";


@Injectable()
export class LoginService {

  SessioStart: boolean = false;
  Token:string;
  IdUsuario:number;
  UrlLogin:string = 'http://apimodelaje.ourproject.cl/public/login';

  constructor(private http:Http, private _route: Router) { }

  ObtenerUsuario(usuario, contrasena){
    let body = {
      'usuario' : usuario,
      'contrasena' : contrasena
    }
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.UrlLogin, body, { headers })
      .map(data => {
        if (data.json() != false){
          for (let res of data.json())
          {
            this.Token = res.token;
            this.IdUsuario = res.id_login;

          }
          this.SessioStart = true;
          this._route.navigate(['galeria']);
          this.guardarStorage();
        }
        return data.json();
      });
  }

  Activo() {
    if (this.Token) {
      return true;
    }else {
      return false;
    }
  }

  SessionOff(){
    this.IdUsuario = null;
    this.Token = null;
    this.SessioStart = false
    // Guardar Storage
    this.guardarStorage();
  }

  private guardarStorage() {
    if (this.Token){
      localStorage.setItem('variableSession', JSON.stringify(this.SessioStart));
      localStorage.setItem('Token', JSON.stringify(this.Token));
      localStorage.setItem('idUsuario', JSON.stringify(this.IdUsuario));
    }else{
      localStorage.removeItem('Token');
      localStorage.removeItem('idUsuario');
      localStorage.removeItem('variableSession');
    }

  }

  public cargarStorage() {
    if (localStorage.getItem('Token')){
      this.SessioStart = JSON.parse(localStorage.getItem('variableSession'));
      this.Token = JSON.parse(localStorage.getItem('Token'));
      this.IdUsuario  = JSON.parse(localStorage.getItem('idUsuario'));
    }else {
      this.SessioStart = false;
      this.IdUsuario = null;
      this.Token = null;
    }
  }

}
