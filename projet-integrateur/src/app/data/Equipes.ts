// import { Employee } from "./Employee";
// import { Camion } from "./Camion";

// export interface Equipe {
//     Employe1 : Employee;
//     Employe2 : Employee;
//     camion: Camion;
// }


export interface Livreur {
    prenom: string;
    nom: string;
  }
  
  export interface Camion {
    code: string;
    type: string;
    volume: number;
  }
  
  export interface Equipe {
    vehicleId: number;
    livreurs: Livreur[];
    camion: Camion;
  }
  