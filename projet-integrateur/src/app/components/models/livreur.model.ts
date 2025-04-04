export interface Livreur {
    id: number;
    code: string;
    email: string;
    nom: string;
    prenom: string;
    adresse: string;
    codePostal: number;
    ville: string;
    latitude: number;
    longitude: number;
    commandes: string[];
    disponible: boolean;
    equipeSelectionnee?: number;
  }
  
  export interface Equipe {
    id: number;
    membres: Livreur[];
  }
  