
import { Camion } from './Camion';
import { Employee } from './Employee';

export interface Entrepot {
    nom: string;
    lettre: string;
    photo: string;
    adresse: string;
    codePostal: number;
    ville: string;
    latitude: number;
    longitude: number;
    camions: Camion[];
    employes: Employee[];
  }
    