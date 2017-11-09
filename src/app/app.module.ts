import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

// Directivas
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';

// Componentes
import { GaleriaComponent } from './components/galeria/galeria.component';
import { DestacadosComponent } from './components/destacados/destacados.component';
import { ModelosComponent } from './components/modelos/modelos.component';

// rutas
import { app_routing } from './app.routes';

// service
import { CargarImagenesService } from './services/cargar-imagenes.service';
import { DestacadosService } from './services/destacados.service';
import {  ModelosService } from './services/modelos.service';
import {AngularFontAwesomeModule} from 'angular-font-awesome';



@NgModule({
  declarations: [
    AppComponent,
    NgDropFilesDirective,
    GaleriaComponent,
    DestacadosComponent,
    ModelosComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    HttpModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  providers: [
    CargarImagenesService,
    DestacadosService,
    ModelosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
