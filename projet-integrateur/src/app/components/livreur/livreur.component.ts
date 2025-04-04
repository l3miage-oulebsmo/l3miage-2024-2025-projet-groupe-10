// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HeaderComponent } from "../header/header.component";

// interface Livreur {
//   id: number;
//   code: string;
//   email: string;
//   nom: string;
//   prenom: string;
//   adresse: string;
//   codePostal: number;
//   ville: string;
//   latitude: number;
//   longitude: number;
//   commandes: string[];
//   disponible: boolean;
//   equipeSelectionnee?: number; // On stockera l'ID de l'équipe
// }

// interface Equipe {
//   id: number;
//   membres: Livreur[];
// }

// @Component({
//   selector: 'app-livreur',
//   standalone: true,
//   imports: [FormsModule,HeaderComponent],
//   templateUrl: './livreur.component.html',
//   styleUrl: './livreur.component.scss'
// })
// export class LivreurComponent {
//   // Liste des livreurs
//   livreurs: Livreur[] = [
//     { id: 1, code: "ABC", email: "iliass.chafi@grenoble-mobilis.fr", prenom: "Iliass", nom: "CHAFI", adresse: "15 Rue de la République", codePostal: 38000, ville: "Grenoble", latitude: 45.1878, longitude: 5.7263, commandes: ["c501", "c502"], disponible: true},
//     { id: 2, code: "DEF", email: "marie.favre@fontaine-mobilis.fr", prenom: "Marie", nom: "FAVRE", adresse: "8 Avenue du Vercors", codePostal: 38600, ville: "Fontaine", latitude: 45.1911, longitude: 5.6947, commandes: ["c503", "c504", "c505"], disponible: false},
//     { id: 3, code: "GHI", email: "luc.morel@echirolles-mobilis.fr", prenom: "Luc", nom: "MOREL", adresse: "24 Boulevard Jean Jaurès", codePostal: 38130, ville: "Échirolles", latitude: 45.1535, longitude: 5.7103, commandes: ["c506"], disponible: true},
//     { id: 4, code: "GKLM", email: "sophie.bernard@grenoble-mobilis.fr", prenom: "Sophie", nom: "BERNARD", adresse: "5 Rue Félix Esclangon", codePostal: 38000, ville: "Grenoble", latitude: 45.1854, longitude: 5.7092, commandes: ["c507", "c508"], disponible: false},
//     { id: 6, code: "CTR", email: "ctr@mobilis.fr", prenom: "claudia", nom: "TESSIER", adresse: "1 Rue Principale", codePostal: 38000, ville: "Grenoble", latitude: 45.1878, longitude: 5.7263, commandes: ["c037","c052"], disponible: true},
//     { id: 7, code: "EBD", email: "ebd@mobilis.fr", prenom: "élisa", nom: "BERAND", adresse: "2 Rue Principale", codePostal: 38000, ville: "Grenoble", latitude: 45.1878, longitude: 5.7263, commandes: ["c058"], disponible: false },
//     { id: 8, code: "SWL", email: "swl@mobilis.fr", prenom: "sophie", nom: "WHEEL", adresse: "3 Rue Principale", codePostal: 38000, ville: "Grenoble", latitude: 45.1878, longitude: 5.7263, commandes: ["c059"], disponible: true},
//     { id: 9, code: "MPK", email: "mpk@mobilis.fr", prenom: "marja", nom: "POLIK", adresse: "4 Rue Principale", codePostal: 38000, ville: "Grenoble", latitude: 45.1878, longitude: 5.7263, commandes: ["c067"], disponible: false},
//     { id: 10, code: "CMJ", email: "cmj@mobilis.fr", prenom: "citeb", nom: "MARUJ", adresse: "5 Rue Principale", codePostal: 38000, ville: "Grenoble", latitude: 45.1878, longitude: 5.7263, commandes: ["c062"], disponible: true},
//     { id: 11, code: "MKR", email: "mkr@mobilis.fr", prenom: "malik", nom: "KEPLER", adresse: "6 Rue Principale", codePostal: 38000, ville: "Grenoble", latitude: 45.1878, longitude: 5.7263, commandes: ["c030","c003"], disponible: false},
//     { id: 12, code: "OET", email: "oet@mobilis.fr", prenom: "olga", nom: "EKKART", adresse: "7 Rue Principale", codePostal: 38000, ville: "Grenoble", latitude: 45.1878, longitude: 5.7263, commandes: ["c028"], disponible: true}]

//   // Liste des équipes
//   equipes: Equipe[] = [
//     { id: 1, membres: [] },
//     { id: 2, membres: [] },
//     { id: 3, membres: [] },
//     { id: 4, membres: [] }
//   ];

//   // Variables
//   afficherFormulaire = false;
//   edition = false;
//   filtreDisponibilite: string = 'tous';

//   /**
//    * Ajouter un livreur à une équipe
//    */
//   ajouterLivreurDansEquipe(livreur: Livreur) {
//     if (!livreur.equipeSelectionnee) {
//       alert("Veuillez choisir une équipe !");
//       return;
//     }
//     // Retirer ce livreur des autres équipes pour éviter les doublons
//     this.equipes.forEach(equipe => {
//       equipe.membres = equipe.membres.filter(membre => membre.id !== livreur.id);
//     });

//     // Ajouter dans la bonne équipe
//     const equipe = this.equipes.find(e => e.id === livreur.equipeSelectionnee);
//     if (equipe) {
//       equipe.membres = [...equipe.membres, livreur];
//       // Force la référence pour déclencher la détection de changement
//       this.equipes = [...this.equipes];
//     }
//   }

//   /**
//    * Filtrer les livreurs (disponible / indisponible / tous)
//    */
//   getLivreursFiltres() {
//     if (this.filtreDisponibilite === 'disponible') {
//       return this.livreurs.filter(l => l.disponible);
//     } else if (this.filtreDisponibilite === 'indisponible') {
//       return this.livreurs.filter(l => !l.disponible);
//     }
//     return this.livreurs;
//   }
// }









import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { Livreur, Equipe } from '../models/livreur.model';
import { EquipeService } from '../service/equipe.service';

@Component({
  selector: 'app-livreur',
  standalone: true,
  imports: [FormsModule, HeaderComponent],
  templateUrl: './livreur.component.html',
  styleUrls: ['./livreur.component.scss']
})
export class LivreurComponent implements OnInit {
  livreurs: Livreur[] = [
    { id: 2, code: 'DEF', email: 'marie.favre@fontaine-mobilis.fr', prenom: 'Marie', nom: 'FAVRE', adresse: '8 Avenue du Vercors', codePostal: 38600, ville: 'Fontaine', latitude: 45.1911, longitude: 5.6947, commandes: ['c503', 'c504', 'c505'], disponible: false },
    { id: 3, code: "GHI", email: "luc.morel@echirolles-mobilis.fr", prenom: "Luc", nom: "MOREL", adresse: "24 Boulevard Jean Jaurès", codePostal: 38130, ville: "Échirolles", latitude: 45.1535, longitude: 5.7103, commandes: ["c506"], disponible: true },
    { id: 4, code: "GKLM", email: "sophie.bernard@grenoble-mobilis.fr", prenom: "Sophie", nom: "BERNARD", adresse: "5 Rue Félix Esclangon", codePostal: 38000, ville: "Grenoble", latitude: 45.1854, longitude: 5.7092, commandes: ["c507", "c508"], disponible: false },
    { id: 6, code: "CTR", email: "ctr@mobilis.fr", prenom: "Claudia", nom: "TESSIER", adresse: "1 Rue Principale", codePostal: 38000, ville: "Grenoble", latitude: 45.1878, longitude: 5.7263, commandes: ["c037", "c052"], disponible: true },
    { id: 7, code: "EBD", email: "ebd@mobilis.fr", prenom: "Élisa", nom: "BERAND", adresse: "2 Rue Principale", codePostal: 38000, ville: "Grenoble", latitude: 45.1878, longitude: 5.7263, commandes: ["c058"], disponible: false },
    { id: 8, code: "SWL", email: "swl@mobilis.fr", prenom: "Sophie", nom: "WHEEL", adresse: "3 Rue Principale", codePostal: 38000, ville: "Grenoble", latitude: 45.1878, longitude: 5.7263, commandes: ["c059"], disponible: true },
    { id: 9, code: "MPK", email: "mpk@mobilis.fr", prenom: "Marja", nom: "POLIK", adresse: "4 Rue Principale", codePostal: 38000, ville: "Grenoble", latitude: 45.1878, longitude: 5.7263, commandes: ["c067"], disponible: false },
    { id: 10, code: "CMJ", email: "cmj@mobilis.fr", prenom: "Citeb", nom: "MARUJ", adresse: "5 Rue Principale", codePostal: 38000, ville: "Grenoble", latitude: 45.1878, longitude: 5.7263, commandes: ["c062"], disponible: true },
    { id: 11, code: "MKR", email: "mkr@mobilis.fr", prenom: "Malik", nom: "KEPLER", adresse: "6 Rue Principale", codePostal: 38000, ville: "Grenoble", latitude: 45.1878, longitude: 5.7263, commandes: ["c030", "c003"], disponible: false },
    { id: 12, code: "OET", email: "oet@mobilis.fr", prenom: "Olga", nom: "EKKART", adresse: "7 Rue Principale", codePostal: 38000, ville: "Grenoble", latitude: 45.1878, longitude: 5.7263, commandes: ["c028"], disponible: true }
  ];

  equipes: Equipe[] = [];
  filtreDisponibilite: string = 'tous';

  constructor(private equipeService: EquipeService) {}

  ngOnInit() {
    this.equipes = this.equipeService.getEquipes();
  }

  ajouterLivreurDansEquipe(livreur: Livreur) {
    if (!livreur.equipeSelectionnee) {
      alert('Veuillez choisir une équipe !');
      return;
    }

    this.equipes.forEach(equipe => {
      equipe.membres = equipe.membres.filter(m => m.id !== livreur.id);
    });

    const equipe = this.equipes.find(e => e.id === livreur.equipeSelectionnee);
    if (equipe) {
      equipe.membres.push(livreur);
      this.equipeService.updateEquipes(this.equipes);
    }
  }

  getLivreursFiltres(): Livreur[] {
    if (this.filtreDisponibilite === 'disponible') {
      return this.livreurs.filter(l => l.disponible);
    } else if (this.filtreDisponibilite === 'indisponible') {
      return this.livreurs.filter(l => !l.disponible);
    }
    return this.livreurs;
  }
}
