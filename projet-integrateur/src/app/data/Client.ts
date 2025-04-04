

import { Commande } from './Commande';
export interface Client {
    code: string;            // x065, etc.
    email: string;           // aandre@sfr.fr
    prenom: string;          // arthur
    nom: string;             // ANDRE
    adresse: string;         // 19 Chemin de Malanot
    codePostal: string;      // 38700
    ville: string;           // Corenc
    latitude: number;        // 45.2176
    longitude: number;       // 5.7351
    commmandes: Commande[]; // Array of Commande objects
    etat: string;           // Etat of the client
  }
  