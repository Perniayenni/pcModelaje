import { Injectable } from '@angular/core';
import { FileItem } from '../models/file-item';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";


@Injectable()
export class CargarImagenesService {
  private CARPETA_IMAGENES: string = 'img';
  galeriaURl: string = 'http://localhost:8000/galeria';

  constructor(private http: Http) { }

  cargarDatosGaleria(titulo, descripcion, archivos:FileItem[]) {
    //this.cargar_imagenes(archivos);


    return Observable.create(observer => {

      let ListAr: File[]=[];
      let formData=new FormData();
      for(let nar of archivos){
        ListAr.push(nar.archivo);
        formData.append('file',nar.archivo);
      }
      let arc={file:ListAr[0]};


      let body =formData;
      console.log(body);

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


  /*  let headers = new Headers({
      'enctype':'multipart/form-data',
      'Content-Type':'multipart/form-data'
    });
    return this.http.post( this.galeriaURl, formData,{headers})
      .map( res => {
        return res;
      }); */
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
