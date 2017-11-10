import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class ModelosService {

  urlModelos:string = 'http://apimodelaje.ourproject.cl/public/modelos';
  ImgsUrl:string = 'http://apimodelaje.ourproject.cl/public/imgs/';

  constructor(private http: Http) { }

  GuardarModelos(nombre, nivel, descripcion, archivos: File[]){
    return Observable.create(observer => {

      let formData = new FormData();
      formData.append('nombreCompleto', nombre);
      formData.append('descripcion', descripcion);
      formData.append('nivel', nivel);
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

      xhr.open('POST', this.urlModelos, true);
      xhr.setRequestHeader('enctype', 'multipart/form-data');
      xhr.setRequestHeader('cache-control', 'no-cache');
      xhr.send(formData);
    });
  }

  ObtenerModelos() {
    return this.http.get(this.urlModelos)
      .map(data => {
        return data.json();
      });
  }

  obtener_imagenesModelo(ref, id) {
    return this.http.get(this.ImgsUrl + ref + '/' + id)
      .map(data => {
        return data.json();
      });
  }
}
