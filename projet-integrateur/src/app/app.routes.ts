import { Routes } from '@angular/router';
import { PlanificateurComponent } from './components/planificateur/planificateur.component';
import { MapComponent } from './components/map/map.component';
import { loginComponent } from './components/login/login.component';
import { LivreurComponent } from './components/livreur/livreur.component';

export const routes: Routes = [{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
},{
    path: 'login',
    component: loginComponent
}, {
    path: 'planificateur',
    component: PlanificateurComponent
}, {
    path: 'map',
    component: MapComponent
}, {
    path: 'livreur',
    component: LivreurComponent
}];
