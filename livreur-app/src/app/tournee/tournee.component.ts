// import { Component, OnInit, inject } from '@angular/core';
// import { NgFor } from '@angular/common';
// import { ServiceLivraison } from '../services/tournee.service';

// @Component({
//   selector: 'app-tournee',
//   standalone: true,


//   templateUrl: './tournee.component.html',
// })
// export class TourneeComponent implements OnInit {
//   service = inject(ServiceLivraison);

//   async ngOnInit() {
//     await this.service.chargerTournee('test@mail.com');
//   }

//   changerStatut(livraison: any, statut: any) {
//     this.service.changerStatut(livraison, statut);
//   }
// }

import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ServiceLivraison } from '../services/tournee.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-tournee',
  standalone: true,
  imports: [
    NgFor,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule
  ],
  templateUrl: './tournee.component.html'
})
export class TourneeComponent implements OnInit {
  service = inject(ServiceLivraison);

  async ngOnInit() {
    await this.service.chargerTournee('test@mail.com');
  }

  changerStatut(livraison: any, statut: any) {
    this.service.changerStatut(livraison, statut);
  }
}


