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
  ModalEliminar: boolean = false;
  ModalAEditMod:boolean = false;
  ModalAEditarImgMod:boolean = false;

  loadingPr:boolean= true;
  loadingM:boolean = false;

  Nivel = [
    'Capullitos',
    'Principiantes',
    'Infantil',
    'Juvenil',
    'Avanzadas',
    'Profesionales'
  ];
  nivel:string;
  nombre: string;
  descripcion: string;
  archivos: File[];

  Imagenes: Fotos[]= [];
  Modelos: ModelosItems[]= [];

  tituloEliminar:string;
  id_m:number;
  idxModelos:number;
  id_img:number;

  constructor(private servMod: ModelosService) {
    this.obtenerModelos();
  }

  ngOnInit() {
  }

  fileEvent(event) {
    this.archivos = event.target.files;
  }

  AgregarModelo(){
    if (this.archivos === undefined){
      this.sms = 'Debe ingresar una imagen';
      this.ColorAlert = 'alert-danger';
      this.mostrarAlert = true;
      setTimeout( () => this.mostrarAlert = false, 3000);
    }else{
      this.loadingM = true;
      this.servMod.GuardarModelos(this.nombre, this.nivel, this.descripcion, this.archivos)
        .subscribe(data => {
          if ( data === 'true') {
            this.loadingM = false;
            this.Modal = false;
            this.limpiarDatos();
            this.obtenerModelos();
            this.sms = 'Modelo guardada';
            this.ColorAlert = 'alert-success';
            this.mostrarAlert = true;
            setTimeout( () => this.mostrarAlert = false, 4000);
          }else{
            this.loadingM = false;
            this.Modal = false;
            this.limpiarDatos();
            this.sms = 'Ocurrio un error al subir los datos, intente de nuevo';
            this.ColorAlert = 'alert-danger';
            this.mostrarAlert = true;
            setTimeout( () => this.mostrarAlert = false, 4000);
          }
        });

    }
  }

  limpiarDatos(){
    this.nombre = '';
    this.nivel = '';
    this.descripcion = '';
    this.archivos = undefined;
  }

  obtenerModelos() {
    this.Modelos = [];
    let fts;
    let modelos;
    this.servMod.ObtenerModelos()
      .subscribe(data => {
        console.log(data);
        if (data != ''){
          for (let res of data){
            this.servMod.obtener_imagenesModelo('Modelos', res.id_m)
              .subscribe(data1 => {
                for (let res1 of data1) {
                  fts = new Fotos (res1.id_img, res1.url, res1.ref, res1.id_g, res1.id_m, res1.id_d);
                  this.Imagenes.push(fts);
                }
                modelos = new ModelosItems(res.id_m, res.nombreCompleto, res.descripcion, res.nivel, this.Imagenes);
                this.Modelos.push(modelos);
                this.Imagenes = [];
                this.loadingPr = false;
              });
          }
        }else{
          this.loadingPr = false;
        }

      });
  }

  AbrirModalEli(id, idx){
    this.id_m = id;
    this.idxModelos = idx;
    this.tituloEliminar = 'Seguro que desera eliminar la modelo'
    this.ModalEliminar = true;

  }

  EliminarModelos(){
    this.servMod.EliminarModelos(this.id_m)
      .subscribe(data => {
        this.ModalEliminar = false;
        this.Modelos.splice(this.idxModelos, 1);
        this.sms = 'Modelo eliminada';
        this.ColorAlert = 'alert-success';
        this.mostrarAlert = true;
        setTimeout( () => this.mostrarAlert = false, 4000);
      });
  }

  AbrirlModalEditarModelo(id, nombre, nivel, desc){
    this.ModalAEditMod = true;
    this.id_m = id;
    this.nombre = nombre;
    this.nivel = nivel;
    this.descripcion = desc;

  }

  EditarModelo(){
    this.loadingM= true;
    this.servMod.editarModelos(this.id_m, this.nombre, this.nivel, this.descripcion)
      .subscribe(data => {
        if (data.mensaje == true){
          this.loadingM= false;
          this.ModalAEditMod = false;
          this.sms = 'Modelo editada';
          this.ColorAlert = 'alert-success';
          this.mostrarAlert = true;
          this.obtenerModelos();
          setTimeout( () => this.mostrarAlert = false, 4000);
        }else{
          this.ModalAEditMod = false;
          this.loadingM= false;
          this.sms = 'Ocurrio un error porfavor intente mas tarde';
          this.ColorAlert = 'alert-danger';
          this.mostrarAlert = true;
          setTimeout( () => this.mostrarAlert = false, 4000);
        }

      });
  }

  CerrarModalEdita(){
    this.ModalAEditMod= false;
    this.nombre = '';
    this.nivel = '';
    this.descripcion = '';
    this.archivos = undefined;
  }

  AbrirlModalEditarImgMod(id, idimg){
    this.id_m = id;
    this.id_img = idimg;
    this.ModalAEditarImgMod = true;
  }

  EditarImggenModelos(){
    if (this.archivos === undefined) {
      this.sms = 'Debe ingresar un archivo';
      this.ColorAlert = 'alert-danger';
      this.mostrarAlert = true;
      setTimeout(() => this.mostrarAlert = false, 3000);
    } else {
      this.loadingM = true;
      this.servMod.editarImgMod(this.id_m, this.id_img, this.archivos)
        .subscribe(data => {
          if(data === 'true'){
            this.loadingM = false;
            this.ModalAEditarImgMod = false;
            this.sms = 'Imagen editada';
            this.ColorAlert = 'alert-success';
            this.mostrarAlert = true;
            this.limpiarDatos();
            this.obtenerModelos();
            setTimeout( () => this.mostrarAlert = false, 4000);
          }
        });
    }
  }
}
