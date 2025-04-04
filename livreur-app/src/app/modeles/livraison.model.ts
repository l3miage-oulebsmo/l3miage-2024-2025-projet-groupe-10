export type statutLivraison =
 | 'planifiee'
 | 'en_cours'
 | 'dechargement'
 | 'chez_client'
 | 'terminee' ; 

export interface Livraison {
    id:string ; 
    commandes : string [];
    client : string ; 
    adresseClient :string ; 
    cordonnees : [number , number];
    statut ?: statutLivraison ;

}
