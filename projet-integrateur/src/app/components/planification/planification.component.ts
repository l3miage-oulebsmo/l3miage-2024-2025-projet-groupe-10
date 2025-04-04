import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { forkJoin } from 'rxjs';

import { Camion, Client, Commande, Employe, Entrepot, Journee } from '../models/models';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-planification',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule
  ],
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.css']
})
export class PlanificationComponent implements OnInit {
  employes: Employe[] = [];
  clients: Client[] = [];
  commandes: Commande[] = [];
  camions: Camion[] = [];
  livreursDisponibles: Employe[] = [];
  entrepot!: Entrepot;

  journee!: Journee;
  referenceJournee: string = '';
  datePlanification: Date | null = null;

  minDate: Date = new Date();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.loadData();

    const interval = setInterval(() => {
      if (this.entrepot && this.camions.length > 0 && this.livreursDisponibles.length >= 2 && this.datePlanification) {
        clearInterval(interval);
        this.onDateSelected();
      }
    }, 500);
  }

  private getLivreurs(employes: Employe[]): Employe[] {
    return employes.filter(employe => employe.emploi.toLowerCase() === 'livreur');
  }

  loadData(): void {
    forkJoin({
      employes: this.dataService.getEmployes(),
      clients: this.dataService.getClients(),
      commandes: this.dataService.getCommandes(),
      entrepot: this.dataService.getEntrepot(),
      camions: this.dataService.getCamions()
    }).subscribe({
      next: (results: any) => {
        this.employes = results.employes;
        this.clients = results.clients;
        this.commandes = results.commandes;
        this.entrepot = results.entrepot[0];
        this.camions = results.camions;
        this.livreursDisponibles = this.getLivreurs(this.employes);
        console.log('✅ Données chargées:', {
          employes: this.employes,
          clients: this.clients,
          commandes: this.commandes,
          entrepot: this.entrepot,
          camions: this.camions
        });
      },
      error: (err: any) => {
        console.error('❌ Erreur lors du chargement des données:', err);
      }
    });
  }

  getDayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  generateJourneeReference(date: Date, entrepotLettre: string): string {
    const dayOfYear = this.getDayOfYear(date);
    const dayFormatted = dayOfYear.toString().padStart(3, '0');
    return `j${dayFormatted}${entrepotLettre}`;
  }

  onDateSelected(): void {
    console.log('📅 Date sélectionnée :', this.datePlanification);
    console.log('👀 Entrepôt dispo ?', this.entrepot);
    console.log('🚚 Camions dispo ?', this.camions);
    console.log('🚹 Livreurs dispo ?', this.livreursDisponibles);

    if (!this.datePlanification || !this.entrepot || this.livreursDisponibles.length < 2 || this.camions.length === 0) {
      console.warn('❌ Données manquantes pour créer la tournée automatiquement.');
      return;
    }

    this.referenceJournee = this.generateJourneeReference(this.datePlanification, this.entrepot.lettre);
    this.journee = {
      reference: this.referenceJournee,
      date: this.datePlanification,
      entrepot: this.entrepot.nom,
      tournees: []
    };

    const tournee = {
      reference: `t${this.referenceJournee.substring(1)}.1`,
      livreur: [this.livreursDisponibles[0], this.livreursDisponibles[1]],
      camion: this.camions[0],
      itineraire: []
    };

    this.journee.tournees.push(tournee);
    console.log('✅ Tournée générée automatiquement :', tournee);
    console.log('📦 Journée complète :', this.journee);
  }
}
