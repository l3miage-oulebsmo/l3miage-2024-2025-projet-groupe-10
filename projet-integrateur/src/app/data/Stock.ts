
import { Entrepot } from './Entrepot';

export interface Stock {
    jdds: string;
    reference: string;
    entrepot: Entrepot;
    produitEnStock: string;
    quantite: number;
  }
    