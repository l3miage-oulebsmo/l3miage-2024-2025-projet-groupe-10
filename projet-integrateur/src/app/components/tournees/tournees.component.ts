// import { Component, inject } from '@angular/core';
// import { EmployeeService } from '../../data/Employee.service';
// import { Equipe } from '../../data/Equipes';

// @Component({
//   selector: 'app-tournee',
//   standalone: true,
//   templateUrl: './tournees.component.html',
//   styleUrls: ['./tournees.component.scss']
// })
// export class TourneeComponent {
//   private service = inject(EmployeeService);
//   private equipes = this.service.equipes;

//   public tournees: Equipe[] = [];

//   creerTournees() {
//     this.tournees = [...this.equipes()]; // Chaque équipe devient une tournée
//   }
// }













// // //*********************************
// // import { Component, inject } from '@angular/core';
// // import { EmployeeService } from '../../data/Employee.service';
// // import { CommandesService } from '../../data/Commandes.service';
// // import { Tournee } from '../../data/Tournee';
// // import { Commande } from '../../data/Commande';

// // @Component({
// //   selector: 'app-tournee',
// //   standalone: true,
// //   templateUrl: './tournees.component.html',
// //   styleUrls: ['./tournees.component.scss']
// // })
// // export class TourneeComponent {
 
  
// //   private service = inject(EmployeeService);
// //   private commandesService = inject(CommandesService);

// //   public tournees: Tournee[] = [];

// //   creerTournees() {
// //     const equipes = this.service.equipes();
// //     const commandes = this.commandesService.commandes();
  
// //     const nbEquipes = equipes.length;
// //     const commandesParEquipe = Math.floor(commandes.length / nbEquipes);
// //     let reste = commandes.length % nbEquipes;
// //     let index = 0;
  
// //     this.tournees = equipes.map(equipe => {
// //       const extra = reste-- > 0 ? 1 : 0;
// //       const count = commandesParEquipe + extra;
// //       const assigned = commandes.slice(index, index + count);
// //       index += count;
  
// //       return {
// //         ...equipe,
// //         commandes: assigned
// //       };
// //     });
// //   }
// // }
  
