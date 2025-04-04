// 


import { Camion } from './Camion';
import { Employee } from './Employee';
export interface Tournee {
  reference: string; 
  camion: Camion;
  livreur: Employee[];
  itineraire?: { latitude: number, longitude: number }[];
}