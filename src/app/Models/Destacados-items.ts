import {Fotos} from './Fotos';
export class DestacadosItems {

  public id_d: number;
  public titulo: string;
  public descripcion: string;
  public fecha: string;
  public fotos: Fotos[];

  constructor(id_d, titulo, descripcion, fecha, fotos) {
    this.id_d = id_d;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.fotos = fotos;
  }
}
