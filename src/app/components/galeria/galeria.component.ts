import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { NgForm } from '@angular/forms';
import { CargarImagenesService } from '../../services/cargar-imagenes.service';

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

  constructor(public _cargaImagenes: CargarImagenesService) { }

  archivoSobreDropZone( e:boolean ){
    this.estaSobreDropZone = e;
  }


  cargarImagenesGaleria(){
    this.permiteCargar = false;
    this._cargaImagenes.guardarImg( this.titulo, this.descripcion, this.archivos)
      .subscribe(data => {
        console.log(data);
    });
  }


  limpiarArchivos(){
    this.archivos = [];
    this.permiteCargar = true;
  }


}
