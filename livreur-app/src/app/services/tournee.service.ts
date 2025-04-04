// import { computed, inject, Injectable, signal } from '@angular/core';
// import { Tournee } from '../modeles/tournee.models';
// import { Livraison } from '../modeles/livraison.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class ServiceLivraison {



//     private date =inject(Date);
//     dateactuelle = this.date.transform(new Date(), 'yyyy-MM-dd');



//      // Signal : tournée planifiée
//     private _tourneeSignal = signal<Tournee>({
//         date : this.dateactuelle,
//         refTournee: '',
//         livraisons : [],
//         livreur : '',
//         camion : '',
//         entrepot : '',
//         cordoneesEntrepot : [0,0]
//     });

// tourneeObservable = computed(() => this._tourneeSignal);


//   // Signal : tournée en cours
//   private _tourneeEnCoursSignal = signal<Tournee>({
//     date : this.dateactuelle,
//     refTournee: '',
//     livraisons : [],
//     livreur : '',
//     camion : '',
//     entrepot : '',
//     cordoneesEntrepot : [0,0]
// });

// tourneeEnCoursObservable = computed(() => this._tourneeEnCoursSignal);


// //Génère un identifiant du jour (ex: J023)
// getIdDuJour(): string {
//     const aujourdHui = new Date(this.dateactuelle);
//     const debutAnnee = new Date(this.dateactuelle.substring(0, 4) + "-01-01");

//     const diff = Math.floor(
//       (Date.UTC(aujourdHui.getFullYear(), aujourdHui.getMonth(), aujourdHui.getDate())
//       - Date.UTC(debutAnnee.getFullYear(), debutAnnee.getMonth(), debutAnnee.getDate()))
//       / (1000 * 60 * 60 * 24)
//     );

//     if (diff < 9) return "J00" + (diff + 1);
//     if (diff < 99) return "J0" + (diff + 1);
//     return "J" + (diff + 1);
//   }
  
//   async chargerTournee(email: string) {
//     const tournee = await this.protocoleLivraison.getDeliveryTour(email);
//     this._tourneeSignal.set(tournee);
//   }

//   async changerStatutLivraison(
//     livraison: Livraison,
//     idTournee: string,
//     statut: statutLivraison
//   ) {
//     await this.protocoleLivraison.changeDeliveryStatus(livraison.id, idTournee, statut).finally(() => {
//       this._tourneeEnCoursSignal.update((tournee) => ({
//         ...tournee,
//         livraisons: tournee.livraisons.map((l) =>
//           l.id === livraison.id ? { ...l, statut } : l
//         )
//       }));
//       localStorage.setItem('tourEnCours', JSON.stringify(this.tourneeEnCoursObservable()));
//     });
//   }

//   async demarrerTournee() {
//     const sauvegardee = localStorage.getItem('tourEnCours');
//     if (!sauvegardee || JSON.parse(sauvegardee).date !== this.getIdDuJour()) {
//       this._tourneeEnCoursSignal.set(this.tourneeObservable());
//       this._tourneeEnCoursSignal().livraisons.forEach((liv) => liv.statut = 'planifiee');
//       await this.changerStatutLivraison(
//         this.tourneeEnCoursObservable().livraisons[0],
//         this.tourneeEnCoursObservable().refTournee,
//         'en_cours'
//       );
//     } else {
//       this._tourneeEnCoursSignal.set(JSON.parse(sauvegardee));
//     }
//   }

//   async passageEntrepot(l: Livraison, t: string) {
//     await this.changerStatutLivraison(l, t, 'dechargement');
//   }

//   async chezClient(l: Livraison, t: string) {
//     await this.changerStatutLivraison(l, t, 'chez_client');
//   }

//   async terminerLivraison(l: Livraison, t: string) {
//     await this.changerStatutLivraison(l, t, 'terminee');
//     await this.passerALaSuivante(l, t);
//   }

//   async passerALaSuivante(livraison: Livraison, idTournee: string) {
//     const index = this.tourneeEnCoursObservable().livraisons.findIndex(l => l.id === livraison.id);
//     if (index < this.tourneeEnCoursObservable().livraisons.length - 1) {
//       await this.changerStatutLivraison(
//         this.tourneeEnCoursObservable().livraisons[index + 1],
//         idTournee,
//         'en_cours'
//       );
//     } else {
//       console.log("Tournée terminée !");
//     }
//   }

//   async replanifierLivraison(livraison: Livraison, idTournee: string) {
//     const index = this.tourneeEnCoursObservable().livraisons.findIndex(l => l.id === livraison.id);
//     if (index < this.tourneeEnCoursObservable().livraisons.length - 1) {
//       await this.changerStatutLivraison(livraison, idTournee, 'planifiee');
//       await this.passerALaSuivante(livraison, idTournee);
//       this._tourneeEnCoursSignal().livraisons.splice(index, 1);
//       livraison.statut = 'planifiee';
//       this._tourneeEnCoursSignal.update((t) => ({
//         ...t,
//         livraisons: [...this._tourneeEnCoursSignal().livraisons, livraison]
//       }));
//       localStorage.setItem('tourEnCours', JSON.stringify(this.tourneeEnCoursObservable()));
//       return 0;
//     }
//     return 1;
//   }
// }
import { Injectable, computed, signal } from '@angular/core';
import { Tournee } from '../modeles/tournee.models';
import { Livraison, statutLivraison } from '../modeles/livraison.model';    
import { MockProtocoleLivraison } from  '../core/adaptateurs/mock-protocole-livraison';

@Injectable({ providedIn: 'root' })
export class ServiceLivraison {
  private api = new MockProtocoleLivraison();

  private _tourneeSignal = signal<Tournee | null>(null);
  tourneeObservable = computed(() => this._tourneeSignal());

  async chargerTournee(email: string) {
    const tournee = await this.api.recupererTournee(email);
    this._tourneeSignal.set(tournee);
  }

  async changerStatut(livraison: Livraison, statut: statutLivraison) {
    const tournee = this._tourneeSignal();
    if (!tournee) return;

    await this.api.changerStatutLivraison(livraison.id, tournee.refTournee, statut);

    const nouvellesLivraisons = tournee.livraisons.map(l =>
      l.id === livraison.id ? { ...l, statut } : l
    );

    this._tourneeSignal.set({ ...tournee, livraisons: nouvellesLivraisons });
  }
}
