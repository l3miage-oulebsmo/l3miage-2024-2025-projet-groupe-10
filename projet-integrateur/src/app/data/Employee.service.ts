// import { Injectable, signal } from '@angular/core';
// import { Employee } from './Employee';
// import { Camion } from './Camion';
// import { Equipe } from './Equipes';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService {

//   // Liste des employés prise de code 

//   private _employees = signal<Employee[]>([
//     { trigramme: 'EBD', prenom: 'élisa', nom: 'BERAND', email: 'ebd@mobilis.fr' },
//     { trigramme: 'SWL', prenom: 'sophie', nom: 'WHEEL', email: 'swl@mobilis.fr' },
//     { trigramme: 'MPK', prenom: 'marja', nom: 'POLIK', email: 'mpk@mobilis.fr' },
//     { trigramme: 'CMJ', prenom: 'citeb', nom: 'MARUJ', email: 'cmj@mobilis.fr' },
//     { trigramme: 'MKR', prenom: 'malik', nom: 'KEPLER', email: 'mkr@mobilis.fr' },
//     { trigramme: 'OET', prenom: 'olga', nom: 'EKKART', email: 'oet@mobilis.fr' }
//   ]);

//   // Liste des camions prise de coda 
//   private _camions = signal<Camion[]>([
//     { code: 'cg123', type: 'Kangoo Van', volume: 3.6 },
//     { code: 'cg456', type: 'Transporter', volume: 6.1 },
//     { code: 'cg789', type: 'Master fourgon', volume: 18.0 },
//     { code: 'cg852', type: 'Master fourgon', volume: 18.0 },
//     { code: 'cg987', type: 'Prueba Scania 280', volume: 35.0 },
//   ]);

//   // Liste des équipes => ca donnes des équipes
//   // avec 2 employés et 1 camion
//   private _equipes = signal<Equipe[]>([]);

  
//   public employees = this._employees;
//   public camions = this._camions;
//   public equipes = this._equipes;

//   /**
//    * Génère automatiquement des équipes avec 2 employés et 1 camion.
//    * Aucun employé ou camion ne sera utilisé deux fois.
//    */
//   genererEquipesAuto() {
//     const empDispo = [...this._employees()]; 
//     const camionsDispo = [...this._camions()];
//     const equipesGenerees: Equipe[] = [];

//     while (empDispo.length >= 2 && camionsDispo.length >= 1) {
//       const e1 = empDispo.shift()!;
//       const e2 = empDispo.shift()!;
//       const camion = camionsDispo.shift()!;

//       const equipe: Equipe = {
//         Employe1: e1,
//         Employe2: e2,
//         camion: camion
//       };

//       equipesGenerees.push(equipe);
//     }

//     this._equipes.set(equipesGenerees);
//   }

//   /**
//    * Vérifie si une équipe peut être formée avec ces personnes et ce camion
//    */
//   estEquipeValide(e1: Employee, e2: Employee, camion: Camion): boolean {
//     if (e1.trigramme === e2.trigramme) return false;

//     const dejaPris = this._equipes().some(eq =>
//       eq.Employe1.trigramme === e1.trigramme ||
//       eq.Employe2.trigramme === e1.trigramme ||
//       eq.Employe1.trigramme === e2.trigramme ||
//       eq.Employe2.trigramme === e2.trigramme ||
//       eq.camion.code === camion.code
//     );

//     return !dejaPris;
//   }

//   /**
//    * Ajoute manuellement une équipe (si valide)
//    */
//   ajouterEquipe(e1: Employee, e2: Employee, c: Camion) {
//     if (this.estEquipeValide(e1, e2, c)) {
//       const nouvelleEquipe: Equipe = {
//         Employe1: e1,
//         Employe2: e2,
//         camion: c
//       };
//       this._equipes.update(eq => [...eq, nouvelleEquipe]);
//     } else {
//       console.warn("Équipe invalide : employé ou camion déjà utilisé.");
//     }
//   }
// }
