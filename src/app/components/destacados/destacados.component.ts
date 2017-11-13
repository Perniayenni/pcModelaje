import { Component, OnInit } from '@angular/core';
import { DestacadosService } from '../../services/destacados.service';
import { DestacadosItems } from '../../Models/Destacados-items';
import { Fotos } from '../../Models/Fotos';

@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.component.html',
  styleUrls: ['./destacados.component.css']
})
export class DestacadosComponent implements OnInit {


  loadingPr:boolean = true ;
  loadingM:boolean = false;

  VerEquiz:boolean = false;

  // Alert
  sms: string = ''; // Mensaje de Alerta
  mostrarAlert: boolean = false; // Se inicia la alerta en false hasta que se muestre.
  ColorAlert: string = 'alert-success';

  // Modals
  Modal: boolean = false;
  ModalEliminar: boolean = false;
  ModalAEditDest: boolean = false;
  ModalAEditarImgDes: boolean = false;

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
    this.loadingM = true;
    this.serv_des.guardarDestacados(this.titulo, this.descripcion, this.archivos)
      .subscribe(data => {
        if ( data === 'true') {
          this.loadingM = false;
          this.Modal = false;
          this.limpiarDatos();
          this.ObtenerDestacados();
          this.sms = 'Evento guardado';
          this.ColorAlert = 'alert-success';
          this.mostrarAlert = true;
          setTimeout( () => this.mostrarAlert = false, 4000);
        }else{
          this.loadingM = false;
          this.Modal = false;
          this.limpiarDatos();
          this.ObtenerDestacados();
          this.sms = 'Imagen ya éxiste para un articulo';
          this.ColorAlert = 'alert-danger';
          this.mostrarAlert = true;
          setTimeout( () => this.mostrarAlert = false, 4000);
        }
      });
  }

  limpiarDatos() {
    this.titulo = '';
    this.descripcion = '';
  }

  ObtenerDestacados() {
    this.Destacados = [];
    let fts;
    let destacados;
    this.serv_des.ObtenerDestacados()
      .subscribe(data => {
        if (data != ''){
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
                this.loadingPr = false;
              });
          }
        }else{
          this.loadingPr = false;
        }

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

  cerrarModalEditarDestacados(){
    this.titulo = '';
    this.descripcion = '';
    this.ModalAEditDest = false;
  }

  EditarDestacads(){
    this.loadingM = true;
    console.log(this.id_d);
    this.serv_des.editarDestacados(this.id_d, this.titulo, this.descripcion)
      .subscribe(data => {
        if (data.mensaje == true){
          this.loadingM= false;
          this.ModalAEditDest = false;
          this.sms = 'Evento editado';
          this.ColorAlert = 'alert-success';
          this.mostrarAlert = true;
          this.ObtenerDestacados();
          setTimeout( () => this.mostrarAlert = false, 4000);
        }else{
          this.loadingM = false;
          this.ModalAEditDest = false;
          this.sms = 'Ocurrio un error porfavor intente mas tarde';
          this.ColorAlert = 'alert-danger';
          this.mostrarAlert = true;
          setTimeout( () => this.mostrarAlert = false, 4000);
        }

      });
  }

  AbrirlModalEditarImgDes(id){
    this.id_d = id;
    this.ModalAEditarImgDes = true;
  }

  EditarImggenDestaca() {
    if (this.archivos === undefined){
      this.sms = 'Debe ingresar un archivo';
      this.ColorAlert = 'alert-danger';
      this.mostrarAlert = true;
      setTimeout( () => this.mostrarAlert = false, 3000);
    }
    console.log(this.id_d);
    console.log(this.archivos);
  }
}
