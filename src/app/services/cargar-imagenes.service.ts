import { Injectable } from '@angular/core';
import { FileItem } from '../models/file-item';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class CargarImagenesService {
  private CARPETA_IMAGENES: string = 'img';
  galeriaURl: string = 'http://localhost:8000/galeria';

  constructor(private http: Http) { }

  cargarDatosGaleria(titulo, descripcion, archivos: FileItem[]){
    //this.cargar_imagenes(archivos);
    let body = archivos;
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    console.log(body);
    return this.http.post( this.galeriaURl, body, { headers })
      .map( res => {
        return res.json();
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
