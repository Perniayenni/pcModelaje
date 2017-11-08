import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { GaleriaItems } from '../../Models/Galeria-items';
import { Fotos } from '../../Models/Fotos';
import { NgForm } from '@angular/forms';
import { CargarImagenesService } from '../../services/cargar-imagenes.service';
import {forEach} from '@angular/router/src/utils/collection';
import {AlertsService} from '../../services/alerts.service';

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

  constructor(public _cargaImagenes: CargarImagenesService, private alert:AlertsService) {
    this.cargarGaleria();

  }

  archivoSobreDropZone( e:boolean ){
    this.estaSobreDropZone = e;
  }


  cargarImagenesGaleria() {
    this.permiteCargar = false;
    this._cargaImagenes.guardarImg( this.titulo, this.descripcion, this.archivos)
      .subscribe(data => {
        let msgs;
        for (let res of data){
          msgs = msgs + res + '<br>';
        }
        console.log(msgs);
        this.alert.show_alert('RRRRRR', 'alert-success');

    });
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

  EliminarImg(id){
    this._cargaImagenes.eliminar_imagen(id)
      .subscribe(data =>{
        console.log(data);
        this.cargarGaleria();
      });
  }

  /*for (let res of data){
        this.Galeria.push(res.id_g, res.titulo, res.descripcion);
         /*this._cargaImagenes.cargar_imagenes('Galeria', res.id)
           .subscribe(data1 => {
             for (let res1 of data1) {
               this.Imagenes.push(res1.id_img, res1.url, res1.refc, res1.id_g, res1.id_m, res1.id_d);
             }
           });
} */

 /* cargarImsg(id) {
    return this._cargaImagenes.cargar_imagenes('Galeria', '3')
      .subscribe(data => {
         this.Imagenes = data;
      });
  }*/

}
