// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Commande } from './Commande';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CommandesService {
//   private readonly commandesUrl = '/assets/data/commandes.json' // URL du fichier JSON

//   constructor(private http: HttpClient) {}

//   /**
//    * Charge les commandes depuis un fichier JSON
//    */
//   loadCommandes(): Observable<Commande[]> {
//     return this.http.get<Commande[]>(this.commandesUrl);
//   }
// }

import { Injectable, signal } from '@angular/core';
import { Commande } from './Commande';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {
  private _commandes = signal<Commande[]>([
    {
      reference: 'c001',
      etat: 'ouverte',
      dateDeCreation: '2024-01-04',
      client: 'amartin@wan.fr'
    },
    {
      reference: 'c002',
      etat: 'livrée',
      dateDeCreation: '2024-01-05',
      client: 'azainab@m6.com'
    },
    {
      reference: 'c003',
      etat: 'notée',
      dateDeCreation: '2024-01-09',
      client: 'lsaleh@brt.fr'
    },
    {
      reference: 'c004',
      etat: 'livrée',
      dateDeCreation: '2024-01-09',
      client: 'lsaleh@brt.fr'
    },
    {
      reference: 'c005',
      etat: 'livrée',
      dateDeCreation: '2024-01-11',
      client: 'apascal@or.fr'
    }
  ]);

  public commandes = this._commandes;

  /**
   * Pour filtrer les commandes par état
   */
  getCommandesParEtat(etat: 'ouverte' | 'livrée' | 'notée') {
    return this._commandes().filter(cmd => cmd.etat === etat);
  }

  /**
   * Pour ajouter une commande si besoin
   */
  ajouterCommande(commande: Commande) {
    this._commandes.update(cmds => [...cmds, commande]);
  }
}


