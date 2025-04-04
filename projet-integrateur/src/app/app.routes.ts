import { Routes } from '@angular/router';
// import { PlanificateurComponent } from './components/planificateur/planificateur.component';
import { MapComponent } from './components/map/map.component';
import { loginComponent } from './components/login/login.component';
import { LivreurComponent } from './components/livreur/livreur.component';
// import { TourneeComponent } from './components/tournees/tournees.component';
// import { EquipeComponent } from './equipe/equipe.component';
import { PlanificationComponent } from './components/planification/planification.component';
import { TestApiComponent } from './components/test-api/test-api.component';


export const routes: Routes = [{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
},

{
    path: 'login',
    component: loginComponent
},
{
    path: 'testApi',
    component: TestApiComponent
},
{
    path: 'map',
    component: MapComponent
},
{ 
    path: 'planification',
    component: PlanificationComponent
},
// {
//     path : 'equipe',
//     component : EquipeComponent
// }, 
// {
//     path: 'tournees',
//     component: TourneeComponent
// }
// {
//     path: 'planificateur',
//     component: PlanificateurComponent



{ path: '**', redirectTo: 'livreurs' }
];
