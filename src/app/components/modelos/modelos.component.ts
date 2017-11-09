import { Component, OnInit } from '@angular/core';
import { ModelosService } from '../../services/modelos.service';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})
export class ModelosComponent implements OnInit {

  // Alert
  sms: string = ''; // Mensaje de Alerta
  mostrarAlert: boolean = false; // Se inicia la alerta en false hasta que se muestre.
  ColorAlert: string = 'alert-success';

  // Modals
  Modal: boolean = false;

  Nivel = [
    'Joven',
    'Adulto'
  ];
  nivel:string;
  nombre: string;
  descripcion: string;
  archivos: File[];

  constructor(private servMod: ModelosService) { }

  ngOnInit() {
  }

  fileEvent(event) {
    this.archivos = event.target.files;
  }

  AgregarModelo(){
    this.servMod.GuardarModelos(this.nombre, this.nivel, this.descripcion, this.archivos)
      .subscribe(data => {
        if ( data === 'true') {
          this.Modal = false;
          this.limpiarDatos();
          this.sms = 'Modelo guardada';
          this.ColorAlert = 'alert-success';
          this.mostrarAlert = true;
          setTimeout( () => this.mostrarAlert = false, 4000);
        }else{
          this.Modal = false;
          this.limpiarDatos();
          this.sms = 'Ocurrio un error al subir los datos, intente de nuevo';
          this.ColorAlert = 'alert-danger';
          this.mostrarAlert = true;
          setTimeout( () => this.mostrarAlert = false, 4000);
        }
      });
  }

  limpiarDatos(){
    this.nombre = '';
    this.nivel = '';
    this.descripcion = '';
  }
}
