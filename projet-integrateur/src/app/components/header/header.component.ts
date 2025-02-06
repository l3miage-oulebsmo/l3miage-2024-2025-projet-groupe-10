import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-header',
    imports: [MatToolbarModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})

export class HeaderComponent {
    constructor(private router: Router) {}
    
    goToMap() {
        this.router.navigate(['/map']);
      }

    goToLivreur() {
        this.router.navigate(['/livreur']);
      }

    goToPlanificateur() {
        this.router.navigate(['/planificateur']);
      }
}