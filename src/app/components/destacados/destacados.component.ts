import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { DestacadosService } from '../../services/destacados.service';
import { DestacadosItems } from '../../Models/Destacados-items';
import { Fotos } from '../../Models/Fotos';

@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.component.html',
  styleUrls: ['./destacados.component.css']
})
export class DestacadosComponent implements OnInit {

  // Alert
  sms: string = ''; // Mensaje de Alerta
  mostrarAlert: boolean = false; // Se inicia la alerta en false hasta que se muestre.
  ColorAlert: string = 'alert-success';

  // Modals
  Modal: boolean = false;
  ModalEliminar: boolean = false;
  ModalAEditDest: boolean = false;

  titulo: string;
  descripcion: string;
  archivos: File[];

  Imagenes: Fotos[]= [];
  Destacados: DestacadosItems[]= [];

  tituloEliminar:string;
  id_d:number;
  idxDestacados:number;

  constructor(public serv_des: DestacadosService) {
    this.ObtenerDestacados();
  }

  ngOnInit() {
  }

  fileEvent(event) {
    this.archivos = event.target.files;
  }

  AgregarDestacados() {
    this.serv_des.guardarDestacados(this.titulo, this.descripcion, this.archivos)
      .subscribe(data => {
        if ( data === 'true') {
          this.Modal = false;
          this.limpiarDatos();
          this.ObtenerDestacados();
          this.sms = 'Evento guardado';
          this.ColorAlert = 'alert-success';
          this.mostrarAlert = true;
          setTimeout( () => this.mostrarAlert = false, 4000);
        }else{
          this.Modal = false;
          this.limpiarDatos();
          this.sms = 'Ocurrio un error al subir los datos, intente de nuevo';
          this.ColorAlert = 'alert-danger';
          this.mostrarAlert = true;
          setTimeout( () => this.mostrarAlert = false, 4000);
        }
      });
  }

  limpiarDatos(){
    this.titulo = '';
    this.descripcion = '';
  }

  ObtenerDestacados(){
    let fts;
    let destacados;
    this.serv_des.ObtenerDestacados()
      .subscribe(data => {
        for (let res of data){
          this.serv_des.obtener_imagenes('Destacados', res.id_d)
            .subscribe(data1 => {
              for (let res1 of data1) {
                fts = new Fotos (res1.id_img, res1.url, res1.ref, res1.id_g, res1.id_m, res1.id_d);
                this.Imagenes.push(fts);
              }
              destacados = new DestacadosItems(res.id_d, res.titulo, res.descripcion, res.fecha, this.Imagenes);
              this.Destacados.push(destacados);
              this.Imagenes = [];
            });
        }
        console.log(this.Destacados);
      });
  }

  AbrirModalEliminard(id, idx) {
    this.id_d = id;
    this.idxDestacados = idx;
    this.tituloEliminar = 'Seguro que desera eliminar'
    this.ModalEliminar = true;

  }

  EliminarDestacados() {
    this.serv_des.EliminarDestacados(this.id_d)
      .subscribe(data => {
        this.ModalEliminar = false;
        this.Destacados.splice(this.idxDestacados, 1);
        this.sms = 'Articulo eliminado';
        this.ColorAlert = 'alert-success';
        this.mostrarAlert = true;
        setTimeout( () => this.mostrarAlert = false, 4000);
      });
  }

  AbrirlModalEditarDestacados(id, ti, des){
    this.id_d = id;
    this.titulo = ti;
    this.descripcion = des;
    this.ModalAEditDest = true;
  }
}
