import { Injectable } from '@angular/core';

@Injectable()
export class AlertsService {

  constructor() { }

  mostrarAlert: boolean = false;
  sms:string='Hola';
  ColorAlert:string = 'alert-success';

    show_alert(sms, color) {
      this.ColorAlert = color;
      this.sms = sms;

      this.mostrarAlert = true;
      console.log(this.mostrarAlert+" "+this.sms+" Imprimiendo esto");

      // cierra las alertas
      setTimeout( () => this.mostrarAlert = false, 3000);
    }

}
