export interface Journee {
  reference: string;
  date: Date; 
  entrepot: string;
  tournees: Tournee[];
}

export interface Tournee {
  reference: string; 
  camion: Camion;
  livreur: Employe[];
  itineraire?: { latitude: number, longitude: number }[];
}

export interface Camion {
  code: string;
  immatriculation: string;
  kilometrage: number;
  idEntrepot: string;
  type: TypeCamion;
}

export enum TypeCamion {
  KANGOO_VAN,
  TRANSPORTER,
  MASTER_FOURGON,
  PRUEBA_SCANIA_280
}


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
  employes: Employe[];
}
  
export interface Client {
  email: string;
  prenom: string;
  nom: string;
  adresse: string;
  latitude: number;
  longitude: number;
  commandes : Commande[];
}
  
export interface Commande {
  id: string;
  etat: EtatCommande;
  date: Date;  
  //note: string;
  //commentaire: string;
  client: Client;
  //lignes: string[];
}
  
export interface Employe {
  id: string;
  prenom: string;
  nom: string;
  photo: string;
  telephone: string;
  email: string;
  emploi: string;
  entrepot: string;
  tournee: Tournee;
  Entrepot: Entrepot;
}
  
export interface Stock {
  jdds: string;
  reference: string;
  entrepot: Entrepot;
  produitEnStock: string;
  quantite: number;
}
  
export enum EtatCommande {
  OUVERTE,
  PLANIFIEE,
  EN_LIVRAISON,
  LIVREE,
  NOTEE
}

  


