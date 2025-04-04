// import { Component, OnInit } from '@angular/core';
// import { DataService } from '../../services/DataService';
// import { Journee } from '../../data/Journee';
// import { Employee } from   '../../data/Employee';
// import { Camion } from '../../data/Camion';
// import { Commande } from '../../data/Commande';

// @Component({
//   selector: 'app-planification',
//   templateUrl: './planification.component.html',
//   styleUrls: ['./planification.component.css']
// })
// export class PlanificationComponent implements OnInit {
//   // Données pour la journée, tournées, livreurs et camions
//   employes: Employee[] = [];
//   camions: Camion[] = [];
//   commandes: Commande[] = [];
//   livreursDisponibles: Employee[] = [];
//   journee: Journee | null = null;
//   referenceJournee: string = '';
//   datePlanification: Date | null = null;

//   minDate: Date = new Date(); // Date du jour
//   dateSelectionnee: boolean = false;
//   tourneeFormVisible: boolean = false;
//   tourneeConfirmee: boolean = false;

//   // Exemple de données (tu peux les remplacer par des appels à l'API ou à ton service)
//   constructor(private dataService: DataService) {}

//   ngOnInit(): void {
//     this.loadData();
//   }

//   loadData(): void {
//     // Charger les données nécessaires (livreurs, camions, commandes, etc.)
//     this.dataService.getEmployes().subscribe(employes => {
//       this.employes = employes;
//       this.livreursDisponibles = this.employes.filter(employe => employe.emploi.toLowerCase() === 'livreur');
//     });

//     this.dataService.getCamions().subscribe(camions => {
//       this.camions = camions;
//     });

//     this.dataService.getCommandes().subscribe(commandes => {
//       this.commandes = commandes;
//     });
//   }

//   onDateSelected(): void {
//     if (this.datePlanification) {
//       this.referenceJournee = this.generateJourneeReference(this.datePlanification);
//       this.initJournee();
//       this.dateSelectionnee = true;
//     }
//   }

//   generateJourneeReference(date: Date): string {
//     const dayOfYear = this.getDayOfYear(date); // Exemple pour générer une référence de journée
//     return `J${dayOfYear}`;
//   }

//   initJournee(): void {
//     if (this.referenceJournee && this.datePlanification) {
//       this.journee = {
//         reference: this.referenceJournee,
//         date: this.datePlanification,
//         entrepot: 'Entrepôt A', // Remplacer par un entrepôt dynamique
//         tournees: []
//       };
//     }
//   }

//   // Créer une tournée avec 2 livreurs et un camion
//   creerTournee(): void {
//     if (this.livreursDisponibles.length > 1 && this.camions.length > 0) {
//       const livreur1 = this.livreursDisponibles[0];
//       const livreur2 = this.livreursDisponibles[1];
//       const camion = this.camions[0];

//       const newTournee = {
//         reference: `T${this.journee?.reference}-${this.journee?.tournees.length + 1}`,
//         livreur: [livreur1, livreur2],
//         camion: camion,
//         commandes: this.commandes.slice(0, 5)  // Ex: Attribuer les 5 premières commandes à la tournée (exemple)
//       };

//       this.journee?.tournees.push(newTournee);
//       this.livreursDisponibles = this.livreursDisponibles.slice(2); // Retirer les livreurs utilisés
//       this.camions = this.camions.slice(1); // Retirer le camion utilisé
//     }
//   }

//   // Récupérer le jour de l'année pour générer une référence
//   getDayOfYear(date: Date): number {
//     const start = new Date(date.getFullYear(), 0, 0);
//     const diff = date.getTime() - start.getTime();
//     const oneDay = 1000 * 60 * 60 * 24;
//     return Math.floor(diff / oneDay);
//   }
// }


