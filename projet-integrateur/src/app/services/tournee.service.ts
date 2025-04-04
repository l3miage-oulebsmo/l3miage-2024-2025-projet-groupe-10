import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TourneeService {

  private tournees: any[] = [];  // Tableau de tournées (en mémoire)

  constructor() {}

  // Récupérer toutes les tournées
  getAllTournees(): any[] {
    return this.tournees;
  }

  // Ajouter une nouvelle tournée
  addTournee(tournee: any): void {
    const newTournee = { id: Date.now(), name: tournee.name };  // Ajouter un ID unique à la tournée
    this.tournees.push(newTournee);  // Ajouter la nouvelle tournée au tableau
  }

  // Modifier une tournée existante
  updateTournee(tourneeId: number, tournee: any): void {
    const index = this.tournees.findIndex(t => t.id === tourneeId);
    if (index !== -1) {
      this.tournees[index].name = tournee.name;  // Mettre à jour le nom de la tournée
    }
  }

  // Supprimer une tournée
  deleteTournee(tourneeId: number): void {
    this.tournees = this.tournees.filter(t => t.id !== tourneeId);  // Supprimer la tournée du tableau
  }
}
