import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";


@Component({
  selector: 'app-planificateur',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './planificateur.component.html',
  styleUrl: './planificateur.component.scss'
})
export class PlanificateurComponent {

  // --- D A T A  D U  T A B L E A U  D E  B O R D --- //

  /** Date du jour */
  today = new Date();

  /** Livreurs */
  totalLivreurs = 18;
  livreursDisponibles = 12;
  livreursIndisponibles = 6;

  /** Commandes */
  commandesEnAttente = 10;    // Commandes qui n'ont pas encore de livreur
  commandesLivrables = 8;     // Commandes validées, prêtes à être livrées
  commandesEnCours = 5;       // Commandes déjà prises en charge
  commandesTerminees = 20;    // Commandes livrées avec succès
  commandesEnRetard = 2;      // Exemple de commandes en retard

  /** Équipes */
  totalEquipes = 4;

  /** Taux de satisfaction (exemple) */
  tauxSatisfaction = 87; // en %

  /** Liste d’alertes ou incidents (exemple) */
  alerts = [
    '⏰ Commande #512 en retard (client : M. Durant)',
    '⚠️ Véhicule en panne pour livreur #5',
  ];

  // --- M E T H O D E S  U T I L E S --- //

  /** Calculer le % de livreurs disponibles */
  get ratioLivreursDispos(): number {
    if (this.totalLivreurs === 0) return 0;
    return Math.round((this.livreursDisponibles / this.totalLivreurs) * 100);
  }

  /** Calculer le pourcentage de commandes en cours vs terminées, etc. (exemple possible) */
  get ratioCommandesTerminees(): number {
    const total = this.commandesEnCours + this.commandesTerminees;
    if (total === 0) return 0;
    return Math.round((this.commandesTerminees / total) * 100);
  }

  /** Retourne true si on n’a pas d’alertes */
  get noAlerts(): boolean {
    return this.alerts.length === 0;
  }
}