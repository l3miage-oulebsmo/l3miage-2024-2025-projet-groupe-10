import { Tournee } from './Tournee';

export interface Journee {
    reference: string;
    date: Date; 
    entrepot: string;
    tournees: Tournee[];
  }