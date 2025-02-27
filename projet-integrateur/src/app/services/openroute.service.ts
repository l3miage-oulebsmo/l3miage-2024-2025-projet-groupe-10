import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class OpenRouteService {
  private apiKey = '5b3ce3597851110001cf6248eff7631745e44590b4103fd172e3856b'; 
  private baseUrl = 'https://api.openrouteservice.org/v2/directions/driving-car';

  constructor() { }

  async getRoute(start: number[], end: number[]): Promise<any> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          api_key: this.apiKey,
          start: start.join(','), // Format: longitude,latitude
          end: end.join(',')
        }
      });

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l’itinéraire :', error);
      throw error;
    }
  }
}

