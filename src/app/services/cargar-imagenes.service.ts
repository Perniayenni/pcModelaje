import { Injectable } from '@angular/core';
import { FileItem } from '../models/file-item';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";


@Injectable()
export class CargarImagenesService {
  //galeriaURl: string = 'http://localhost:8000/galeria';
  //ImgsUrl:string = 'http://localhost:8000/imgs/';
  AddMasImagenes:string = 'http://apimodelaje.ourproject.cl/public/AddMasImagenes';
  galeriaURl: string = 'http://apimodelaje.ourproject.cl/public/galeria';
  ImgsUrl:string = 'http://apimodelaje.ourproject.cl/public/imgs/';

  constructor(private http: Http) { }

  guardarImg(titulo, descripcion, archivos: FileItem[]) {
    //this.cargar_imagenes(archivos);
    return Observable.create(observer => {

      let formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('descripcion', descripcion);
      for(let nar of archivos){
        formData.append('file[]', nar.archivo);
      }

      let xhr: XMLHttpRequest = new XMLHttpRequest();

      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          console.log(this.response);
          observer.next(this.responseText);
          observer.complete();
        }
      });

      xhr.open('POST', this.galeriaURl, true);
      xhr.setRequestHeader('enctype', 'multipart/form-data');
      xhr.setRequestHeader('cache-control', 'no-cache');
      xhr.send(formData);


    });
  }

  ObtenerGaleria() {
    return this.http.get(this.galeriaURl)
      .map(data => {
        return data.json();
      });
  }

  cargar_imagenes(ref, id) {
    console.log('desde cargar_imagenes');
    return this.http.get(this.ImgsUrl + ref + '/' + id)
      .map(data => {
        return data.json();
      });
  }

  eliminar_imagen(id) {
    return this.http.delete(this.ImgsUrl + id)
      .map(data => {
        return data.json();
      });
  }

  eliminar_evento(id){
    return this.http.delete(this.galeriaURl + '/' + id)
      .map(data => {
        return data.json();
      });
  }

  // Este metodo carga las imagenes individuales segun el evento.
  guardarMasImg(id_g, titulo, archivos: FileItem[]) {

    return Observable.create(observer => {

      let formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('id_g', id_g);
      for(let nar of archivos){
        formData.append('file[]', nar.archivo);
      }
      console.log(JSON.stringify(formData));

      let xhr: XMLHttpRequest = new XMLHttpRequest();

      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          observer.next(this.responseText);
          observer.complete();
        }
      });

      xhr.open('POST', this.AddMasImagenes, true);
      xhr.setRequestHeader('enctype', 'multipart/form-data');
      xhr.setRequestHeader('cache-control', 'no-cache');
      xhr.send(formData);
    });

  }
}
