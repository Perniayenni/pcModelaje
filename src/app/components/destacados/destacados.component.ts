import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { DestacadosService } from '../../services/destacados.service';

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
  ModalAddImg: boolean = false;
  ModalEliminar: boolean = false;
  ModalAEditEvento: boolean = false;

  titulo: string;
  descripcion: string;
  archivos: File[];

  constructor(public serv_des: DestacadosService) {
  }

  ngOnInit() {
  }

  fileEvent(event) {
    console.log(event.target.files);
    this.archivos = event.target.files;
  }

  AgregarDestacados() {
    console.log(this.titulo);
    console.log(this.descripcion);
    console.log(this.archivos);
    this.serv_des.guardarDestacados(this.titulo, this.descripcion, this.archivos)
      .subscribe(data => {});
  }
}
