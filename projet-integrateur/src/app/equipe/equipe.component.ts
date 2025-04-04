// import { Component, inject } from '@angular/core';
// import { EmployeeService } from '../data/Employee.service';



// @Component({
//     selector: 'app-equipe',
//     templateUrl: './equipe.component.html',
//     styleUrl: './equipe.component.scss',
//     imports: []
//   })
//   export class EquipeComponent {
//     private employeeService = inject(EmployeeService);
  
//     // Signal public pour accéder aux équipes
//     public equipes: any = this.employeeService.equipes; // Replace 'any' with the actual type if known
  
//     // Méthode appelée au clic pour générer automatiquement les équipes
//     genererEquipes() {
//       this.employeeService.genererEquipesAuto();
//    }
// }