import {Fotos} from './Fotos';
export class ModelosItems {

  public id_m: number;
  public nombre: string;
  public descripcion: string;
  public nivel: string;
  public fotos: Fotos[];

  constructor(id_m, nombre, descripcion, nivel, fotos) {
    this.id_m = id_m;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.nivel = nivel;
    this.fotos = fotos;
  }
}
