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
    goToHomepage() {
        this.router.navigate(['/homepage']);
      }
    
    goToMap() {
        this.router.navigate(['/map']);
      }
    goToTournee() {
        this.router.navigate(['/tournee']);
      }  

}