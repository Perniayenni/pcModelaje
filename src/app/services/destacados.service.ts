import { Injectable } from '@angular/core';
import { FileItem } from '../models/file-item';
import 'rxjs/Rx';
import {Observable} from "rxjs";


@Injectable()
export class DestacadosService {

  fechaActual:string = new Date().toJSON().slice(0, 10);
  urlDestacados:string = 'http://apimodelaje.ourproject.cl/public/destacados';

  constructor() { }

  guardarDestacados(titulo, descripcion, archivos: File[]) {
    return Observable.create(observer => {

      let formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('descripcion', descripcion);
      formData.append('fecha', this.fechaActual);
      for(let nar of archivos){
        formData.append('file[]', nar);
      }

      let xhr: XMLHttpRequest = new XMLHttpRequest();

      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          console.log(this.responseText);
          observer.next(this.responseText);
          observer.complete();
        }
      });

      xhr.open('POST', this.urlDestacados, true);
      xhr.setRequestHeader('enctype', 'multipart/form-data');
      xhr.setRequestHeader('cache-control', 'no-cache');
      xhr.send(formData);


    });
  }

}
