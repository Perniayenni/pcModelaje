import { Injectable } from '@angular/core';
import { FileItem } from '../models/file-item';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";


@Injectable()
export class CargarImagenesService {
  galeriaURl: string = 'http://apimodelaje.ourproject.cl/public/galeria';

  constructor(private http: Http) { }

  guardarImg(titulo, descripcion, archivos:FileItem[]) {
    //this.cargar_imagenes(archivos);
    return Observable.create(observer => {

      let formData=new FormData();
      formData.append('titulo', titulo);
      formData.append('descripcion', descripcion);
      for(let nar of archivos){
        formData.append('file[]', nar.archivo);
      }
      console.log(JSON.stringify(formData));

      let xhr: XMLHttpRequest = new XMLHttpRequest();

      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          console.log(this.responseText);
          return this.responseText;
        }
      });

      xhr.open('POST', this.galeriaURl, true);
      xhr.setRequestHeader('enctype', 'multipart/form-data');
      xhr.setRequestHeader('cache-control', 'no-cache');
      xhr.send(formData);


    });
  }

  cargar_imagenes(ref) {
    console.log('desde cargar_imagenes');

  }
}
