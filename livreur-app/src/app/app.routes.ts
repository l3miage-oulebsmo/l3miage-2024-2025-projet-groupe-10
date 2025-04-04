import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';  // Correct chemin relatif
import { MapComponent } from './map/map.component';
import { TourneeComponent } from './tournee/tournee.component';
import { HomepageComponent } from './homepage/homepage.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent  // Assure-toi que c'est bien 'LoginComponent' avec la bonne casse
  },
  {
        path: 'accueil', // ✅ Page d’accueil après login
        component: HomepageComponent
      },
  {
    path: 'homepage',
    component: HomepageComponent
  }, {
    path: 'map',
    component: MapComponent
},
{
  path :'tournee',
  component: TourneeComponent 
}

];






// import { Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
// import { MapComponent } from './map/map.component';
// import { TourneeComponent } from './tournee/tournee.component';
// import { HomepageComponent } from './homepage/homepage.component';

// export const routes: Routes = [
//   {
//     path: '',
//     component: LoginComponent // On démarre ici
//   },
//   {
//     path: 'accueil', // ✅ Page d’accueil après login
//     component: HomepageComponent
//   },
//   {
//     path: 'map',
//     component: MapComponent
//   },
//   {
//     path: 'tournee',
//     component: TourneeComponent
//   },
//   // (optionnel) Redirection vers la page d'accueil pour les routes inconnues
//   {
//     path: '**',
//     redirectTo: ''
//   }
// ];
