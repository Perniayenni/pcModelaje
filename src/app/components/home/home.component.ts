import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario:string= '';
  contrasena:string= '';
  DatosUS:any = [];

  sms:string = ''; // Mensaje de Alerta
  mostrarAlert: boolean = false; // Se inicia la alerta en false hasta que se muestre.
  ColorAlert:string = 'alert-success';

  constructor(public servLogin: LoginService) { }

  ngOnInit() {
  }

  obtenerUsuario() {
    this.servLogin.ObtenerUsuario(this.usuario, this.contrasena)
      .subscribe(data => {
        if (data == false){
          this.limpiarDatos();
          this.sms = 'Usuario o contraseña incorrecta';
          this.ColorAlert = 'alert-danger';
          this.mostrarAlert = true;
          setTimeout( () => this.mostrarAlert = false, 4000);
        }
      });
  }

  limpiarDatos(){
    this.usuario = '';
    this.contrasena = '';
  }
}
