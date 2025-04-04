// // services/data.service.ts
// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { Employee } from '../data/Employee';
// import { Commande } from '../data/Commande';
// import { Camion } from '../data/Camion';
// import { Equipe } from '../data/Equipes';
// import { Client } from '../data/Client';


// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {

//   // Données simulées pour les employés
//   private _employees: Employee[] = [
//     { trigramme: 'EBD', prenom: 'élisa', nom: 'BERAND', email: 'ebd@mobilis.fr' },
//     { trigramme: 'SWL', prenom: 'sophie', nom: 'WHEEL', email: 'swl@mobilis.fr' },
//     { trigramme: 'MPK', prenom: 'marja', nom: 'POLIK', email: 'mpk@mobilis.fr' },
//     { trigramme: 'CMJ', prenom: 'citeb', nom: 'MARUJ', email: 'cmj@mobilis.fr' },
//     { trigramme: 'MKR', prenom: 'malik', nom: 'KEPLER', email: 'mkr@mobilis.fr' },
//     { trigramme: 'OET', prenom: 'olga', nom: 'EKKART', email: 'oet@mobilis.fr' }
//   ];

//   // Données simulées pour les camions
//   private _camions: Camion[] = [
//     { code: 'cg123', type: 'Kangoo Van', volume: 3.6 },
//     { code: 'cg456', type: 'Transporter', volume: 6.1 },
//     { code: 'cg789', type: 'Master fourgon', volume: 18.0 },
//     { code: 'cg852', type: 'Master fourgon', volume: 18.0 },
//     { code: 'cg987', type: 'Prueba Scania 280', volume: 35.0 },
//   ];

//   // Données simulées pour les équipes
//   private _equipes: Equipe[] = [];

//   // Données simulées pour les commandes
//   private _commandes: Commande[] = [
//     { reference: 'c001', etat: 'ouverte', dateDeCreation: '2024-01-04', client: 'amartin@wan.fr' },
//     { reference: 'c002', etat: 'livrée', dateDeCreation: '2024-01-05', client: 'azainab@m6.com' },
//     { reference: 'c003', etat: 'notée', dateDeCreation: '2024-01-09', client: 'lsaleh@brt.fr' },
//     { reference: 'c004', etat: 'livrée', dateDeCreation: '2024-01-09', client: 'lsaleh@brt.fr' },
//     { reference: 'c005', etat: 'livrée', dateDeCreation: '2024-01-11', client: 'apascal@or.fr' }
//   ];

//   // Méthodes pour récupérer les données

//   public getEmployees(): Observable<Employee[]> {
//     return of(this._employees); // Retourne un Observable avec les employés
//   }

//   public getCamions(): Observable<Camion[]> {
//     return of(this._camions); // Retourne un Observable avec les camions
//   }

//   public getEquipes(): Observable<Equipe[]> {
//     return of(this._equipes); // Retourne un Observable avec les équipes
//   }

//   public getCommandes(): Observable<Commande[]> {
//     return of(this._commandes); // Retourne un Observable avec les commandes
//   }


//   /**
//    * Filtrer les commandes par état
//    */
//   public getCommandesParEtat(etat: 'ouverte' | 'livrée' | 'notée'): Observable<Commande[]> {
//     const filteredCommandes = this._commandes.filter(cmd => cmd.etat === etat);
//     return of(filteredCommandes); // Retourne les commandes filtrées
//   }

//   /**
//    * Ajouter une nouvelle commande
//    */
//   public ajouterCommande(commande: Commande): Observable<Commande> {
//     this._commandes.push(commande); // Ajoute la commande à la liste locale
//     return of(commande); // Retourne la commande ajoutée
//   }

//   // Méthode pour ajouter une équipe manuellement (simule un appel API POST)
//   public ajouterEquipe(equipe: Equipe): Observable<Equipe> {
//     this._equipes.push(equipe);  // Ajouter l'équipe à la liste locale
//     return of(equipe); // Retourner l'équipe ajoutée via un Observable, comme si c'était une réponse d'API
//   }

//   // Méthode pour générer automatiquement des équipes
//   public genererEquipesAuto(): Observable<Equipe[]> {
//     const equipesGenerees: Equipe[] = [];
//     const empDispo = [...this._employees];  // Copie des employés
//     const camionsDispo = [...this._camions];  // Copie des camions

//     while (empDispo.length >= 2 && camionsDispo.length >= 1) {
//       const e1 = empDispo.shift()!;
//       const e2 = empDispo.shift()!;
//       const camion = camionsDispo.shift()!;

//       equipesGenerees.push({
//         Employe1: e1,
//         Employe2: e2,
//         camion: camion
//       });
//     }

//     this._equipes = equipesGenerees;  // Met à jour la liste des équipes générées
//     return of(equipesGenerees);  // Retourner les équipes générées comme si c'était une réponse d'API
//   }
// }
