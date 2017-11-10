import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { GaleriaItems } from '../../Models/Galeria-items';
import { Fotos } from '../../Models/Fotos';
import { NgForm } from '@angular/forms';
import { CargarImagenesService } from '../../services/cargar-imagenes.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent  {

  titulo:string;
  descripcion:string;

  estaSobreDropZone: boolean = false;
  permiteCargar: boolean = true;

  archivos: FileItem[] = [];

  Imagenes: Fotos[]= [];
  Galeria: GaleriaItems[]= [];

  Modal:boolean = false;
  ModalAddImg:boolean = false;
  ModalEliminar:boolean =false;
  ModalAEditEvento:boolean= false;

  tituloAddImg:string;
  id_gAddImg:string;

  tituloEliminar:string;
  id_Imagen:string;
  TipoEventEliminar:string;

  sms:string = ''; // Mensaje de Alerta
  mostrarAlert: boolean = false; // Se inicia la alerta en false hasta que se muestre.
  ColorAlert:string = 'alert-success';

  indxEvento: number;
  indxImgs: number;

  idGaleria:number;

  constructor(public _cargaImagenes: CargarImagenesService) {
    this.cargarGaleria();

  }

  archivoSobreDropZone( e:boolean ){
    this.estaSobreDropZone = e;
  }


  cargarImagenesGaleria() {
    this.permiteCargar = false;
    this._cargaImagenes.guardarImg( this.titulo, this.descripcion, this.archivos)
      .subscribe(data => {
        if ( data === 'true') {
          this.Modal = false;
          this.limpiarArchivos();
          this.limpiarDatos();
          this.cargarGaleria();
          this.sms = 'Evento guardado';
          this.ColorAlert = 'alert-success';
          this.mostrarAlert = true;
          setTimeout( () => this.mostrarAlert = false, 4000);
        }else{
          this.Modal = false;
          this.limpiarArchivos();
          this.limpiarDatos();
          this.sms = 'Ocurrio un error al subir los datos, intente de nuevo';
          this.ColorAlert = 'alert-danger';
          this.mostrarAlert = true;
          setTimeout( () => this.mostrarAlert = false, 4000);
        }
    });
  }

  limpiarDatos(){
    this.titulo = '';
    this.descripcion = '';
  }

  limpiarArchivos() {
    this.archivos = [];
    this.permiteCargar = true;
  }

  cargarGaleria() {
    this.Galeria = [];
    let galeria;
    let fts;
    this._cargaImagenes.ObtenerGaleria()
      .subscribe(data => {
        console.log(data);
        for (let res of data){
          this._cargaImagenes.cargar_imagenes('Galeria', res.id_g)
            .subscribe(data1 => {
              for (let res1 of data1) {
                fts = new Fotos (res1.id_img, res1.url, res1.ref, res1.id_g, res1.id_m, res1.id_d);
                this.Imagenes.push(fts);
              }
              galeria = new GaleriaItems(res.id_g, res.titulo, res.descripcion,  this.Imagenes);
              this.Galeria.push(galeria);
              this.Imagenes = [];
            });
        }
      });
  }

  AbrirModalAddImg(titulo, id) {
    this.tituloAddImg = titulo;
    this.id_gAddImg = id;
    this.ModalAddImg = true;
  }

  cargarMasImagenes(){
    this.permiteCargar = false;
    this._cargaImagenes.guardarMasImg( this.id_gAddImg, this.tituloAddImg, this.archivos)
      .subscribe(data => {
        if (data === 'true') {
          this.ModalAddImg = false;
          this.limpiarArchivos();
          this.limpiarDatos();
          this.cargarGaleria();
          this.sms = 'Se añadieron más imagenes';
          this.ColorAlert = 'alert-success';
          this.mostrarAlert = true;
          setTimeout( () => this.mostrarAlert = false, 4000);
        }else {
          this.ModalAddImg = false;
          this.limpiarArchivos();
          this.limpiarDatos();
          this.sms = 'Ocurrio un error al subir los datos, intente de nuevo';
          this.ColorAlert = 'alert-danger';
          this.mostrarAlert = true;
          setTimeout( () => this.mostrarAlert = false, 4000);
        }


      });
  }

  AbrirModalEliminar(id, evt, idcEvento, idxImgs ) {
    this.TipoEventEliminar = evt;
    this.indxEvento = idcEvento;
    this.indxImgs = idxImgs;
    if (evt == 'evento') {
      console.log(this.TipoEventEliminar);
      this.tituloEliminar = 'Esta seguro que desea eliminar el evento';
      this.id_gAddImg = id;
      this.ModalEliminar = true;
    }else {
      console.log(this.TipoEventEliminar);
      this.tituloEliminar = 'Esta seguro que desea eliminar la imagen del evento';
      this.id_Imagen = id;
      this.ModalEliminar = true;
    }

  }

  EliminarEvento() {
    console.log(this.id_gAddImg);
    this._cargaImagenes.eliminar_evento(this.id_gAddImg)
      .subscribe(data => {
        this.ModalEliminar = false;
        this.Galeria.splice(this.indxEvento, 1);
        this.sms = 'Evento eliminado';
        this.ColorAlert = 'alert-success';
        this.mostrarAlert = true;
        setTimeout( () => this.mostrarAlert = false, 4000);
      });
  }

  EliminarImg() {
    this._cargaImagenes.eliminar_imagen(this.id_Imagen)
      .subscribe(data => {
        this.ModalEliminar = false;
        //this.Galeria[].fotos.splice(this.indx, 1);
        this.Galeria[this.indxEvento].fotos.splice(this.indxImgs, 1);
        this.sms = 'Imagen Eliminada';
        this.ColorAlert = 'alert-success';
        this.mostrarAlert = true;
        setTimeout( () => this.mostrarAlert = false, 4000);

      });
  }

  AbrirModalEditarEvento(id, titulo, descrip){
    this.titulo = titulo;
    this.descripcion = descrip;
    this.idGaleria = id;
    this.ModalAEditEvento = true;
  }

  EditarEvento(){
    this._cargaImagenes.editarEvento(this.idGaleria, this.titulo, this.descripcion)
      .subscribe(data => {
        if (data.mensaje == true){
          this.ModalAEditEvento = false;
          this.sms = 'Evento editado';
          this.ColorAlert = 'alert-success';
          this.mostrarAlert = true;
          this.cargarGaleria();
          setTimeout( () => this.mostrarAlert = false, 4000);
        }

      });
  }
}
