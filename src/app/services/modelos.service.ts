import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class ModelosService {

  urlModelos:string = 'http://apimodelaje.ourproject.cl/public/modelos';
  ImgsUrl:string = 'http://apimodelaje.ourproject.cl/public/imgs/';
  EditImgModelos:string = 'http://apimodelaje.ourproject.cl/public/EditImgModelos';

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

  EliminarModelos(id) {
    return this.http.delete(this.urlModelos + '/' + id)
      .map(data => {
        return data.json();
      });
  }

  editarModelos(id, nombre, nivel, descripcion) {
    let body = {
      'nombreCompleto' : nombre,
      'nivel': nivel,
      'descripcion' : descripcion
    }
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let url = this.urlModelos + '/' + id;
    return this.http.put( url, body, { headers })
      .map( res => {
        return res.json();
      });
  }

  editarImgMod(id, idimg, archivos){

    return Observable.create(observer => {

      let formData = new FormData();
      formData.append('id_d', id);
      formData.append('id_img', idimg);
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

      xhr.open('POST', this.EditImgModelos, true);
      xhr.setRequestHeader('enctype', 'multipart/form-data');
      xhr.setRequestHeader('cache-control', 'no-cache');
      xhr.send(formData);
    });
  }
}
