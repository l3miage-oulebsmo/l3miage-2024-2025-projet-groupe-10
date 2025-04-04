import { Livraison } from "./livraison.model";

export interface Tournee {
    date : Date;
    refTournee: string;
    livraisons : Livraison[];
    livreur : string;
    camion : string;
    entrepot : string;
    cordoneesEntrepot : [number , number];
}