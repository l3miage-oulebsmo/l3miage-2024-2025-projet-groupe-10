import { Produit } from "./Produit";

export interface Commande {
    reference: string;
    etat: 'ouverte' | 'livrée'| 'notée' ;
    dateDeCreation: string;
    client: string; // email du client
    //produits: string[]; // liste d'ID produits
  }
  