import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

// Directivas
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';

// Componentes
import { GaleriaComponent } from './components/galeria/galeria.component';

// rutas
import { app_routing } from './app.routes';

// service
import { CargarImagenesService } from './services/cargar-imagenes.service';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { DestacadosComponent } from './components/destacados/destacados.component';

@NgModule({
  declarations: [
    AppComponent,
    NgDropFilesDirective,
    GaleriaComponent,
    DestacadosComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    HttpModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  providers: [
    CargarImagenesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
