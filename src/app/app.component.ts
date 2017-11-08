import { Component } from '@angular/core';
import {AlertsService} from './services/alerts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public alert:AlertsService){

  }


}
