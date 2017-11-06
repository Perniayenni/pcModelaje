import { Injectable } from '@angular/core';
import { FileItem } from '../models/file-item';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";


@Injectable()
export class CargarImagenesService {
  private CARPETA_IMAGENES: string = 'img';
  SentImgURl: string = 'http://localhost:8000/sendImg';
  galeriaURl: string = 'http://localhost:8000/galeria';

  constructor(private http: Http) { }

  guardarImg(titulo, descripcion, archivos:FileItem[]) {
    //this.cargar_imagenes(archivos);
    return Observable.create(observer => {

      let formData=new FormData();
      formData.append('titulo', titulo);
      formData.append('descripcion', descripcion);
      for(let nar of archivos){
        formData.append('file', nar.archivo);
      }
      console.log(JSON.stringify(formData[0]));

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

  cargarDatosGaleria(titulo, descripcion, url) {
    let body = {
      'titulo': titulo,
      'descripcion': descripcion,
      'url': url
    }
    let headers = new Headers({
      'Content-Type':'multipart/form-data'
    });
    return this.http.post( this.galeriaURl, body,{headers})
      .map( res => {
        return res;
      });
  }
  cargar_imagenes( archivos: FileItem[] ) {
    console.log('desde cargar_imagenes');
   // var reader = new FileReader();
   /* for( let item of archivos ){
      item.estaSubiendo = true;
      console.log(item);
    }*/
  }
}
