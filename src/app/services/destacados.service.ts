import { Injectable } from '@angular/core';
import { FileItem } from '../models/file-item';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";


@Injectable()
export class DestacadosService {

  fechaActual:string = new Date().toJSON().slice(0, 10);
  urlDestacados:string = 'http://apimodelaje.ourproject.cl/public/destacados';
  ImgsUrl:string = 'http://apimodelaje.ourproject.cl/public/imgs/';

  constructor(private http: Http) { }

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

  ObtenerDestacados() {
    return this.http.get(this.urlDestacados)
      .map(data => {
        return data.json();
      });
  }

  obtener_imagenes(ref, id) {
    console.log('desde cargar_imagenes');
    return this.http.get(this.ImgsUrl + ref + '/' + id)
      .map(data => {
        return data.json();
      });
  }

  EliminarDestacados(id) {
    return this.http.delete(this.urlDestacados + '/' + id)
      .map(data => {
        return data.json();
      });
  }

  editarDestacados(id, titulo, descripcion) {
    let body = {
      'titulo' : titulo,
      'descripcion' : descripcion
    }
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let url = this.urlDestacados + '/' + id;

    return this.http.put( url, body, { headers })
      .map( res => {
        return res.json();
      });
  }

}
