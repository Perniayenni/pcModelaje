import {Fotos} from './Fotos';

export class GaleriaItems {

  public id_g:number;
  public titulo:string;
  public descripcion:string;
  public fotos: Fotos[];

  constructor ( id_g, titulo, descripcion, fotos) {
    this.id_g = id_g;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.fotos = fotos;
  }

}
