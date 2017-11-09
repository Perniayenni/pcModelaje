import { RouterModule, Routes } from '@angular/router';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { DestacadosComponent } from './components/destacados/destacados.component';

const app_routes: Routes = [
  { path: 'galeria', component: GaleriaComponent },
  { path: 'destacados', component: DestacadosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'galeria' }
];

export const app_routing = RouterModule.forRoot(app_routes);
