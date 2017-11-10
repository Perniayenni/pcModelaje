import { Component, OnInit } from '@angular/core';
import { ModelosService } from '../../services/modelos.service';
import { ModelosItems } from '../../Models/Modelos-items';
import { Fotos } from '../../Models/Fotos';

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

  Imagenes: Fotos[]= [];
  Modelos: ModelosItems[]= [];

  constructor(private servMod: ModelosService) {
    this.obtenerModelos();
  }

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

  obtenerModelos() {
    this.Modelos = [];
    let fts;
    let modelos;
    this.servMod.ObtenerModelos()
      .subscribe(data => {
        for (let res of data){
          this.servMod.obtener_imagenesModelo('Modelos', res.id_m)
            .subscribe(data1 => {
              for (let res1 of data1) {
                fts = new Fotos (res1.id_img, res1.url, res1.ref, res1.id_g, res1.id_m, res1.id_d);
                this.Imagenes.push(fts);
              }
              modelos = new ModelosItems(res.id_m, res.titulo, res.descripcion, res.fecha, this.Imagenes);
              this.Modelos.push(modelos);
              this.Imagenes = [];
            });
        }
        console.log(this.Modelos);
      });
  }
}
