export class Fotos {
  public id_img:number;
  public url:string;
  public ref:string;
  public id_g:number;
  public id_m:number;
  public id_d:number;
  public isVisible:boolean;

  constructor(id_img, url, ref, id_g, id_m, id_d) {
    this.id_img = id_img;
    this.url = url;
    this.ref = ref;
    this.id_g = id_g;
    this.id_m = id_m;
    this.id_d = id_d;
    this.isVisible = false;
  }
}

