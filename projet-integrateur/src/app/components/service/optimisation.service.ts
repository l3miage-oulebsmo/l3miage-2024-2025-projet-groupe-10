import { Injectable } from '@angular/core';
import { InputData } from './inputData';
import { requestOutputData } from './requestOutputData';
import { LatLng, latLng } from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class OptimisationService {
  private url = 'https://api.openrouteservice.org/optimization';
  // Idéalement, stockez votre clé API dans environment.ts
  private apiKey = '5b3ce3597851110001cf62483205eb7437a94c589d0333804202fb88';

  async optimization(_data: InputData): Promise<requestOutputData> {
    const headers = {
      Accept: 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
      Authorization: this.apiKey,
      'Content-Type': 'application/json; charset=utf-8',
    };

    // Ajout d'options pour demander la géométrie et les étapes
    const payload = {
      ..._data,
      options: {
        g: true,
        geometry_format: 'polyline',
        profile: 'driving-car',
        steps: true,
      },
    };

    try {
      const answer = await fetch(this.url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
      });
      const result = await answer.json();
      console.log("Yes yes yes !!", result);
      return result;
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API :", error);
      throw error;
    }
  }

  /**
   * Appelle l'API Directions pour obtenir la géométrie détaillée d'une route
   * à partir d'un ensemble de waypoints.
   * @param waypoints Tableau de coordonnées (LatLng) correspondant aux arrêts
   * @returns Une promesse résolvant en un tableau de LatLng représentant la route détaillée.
   */
  async getDetailedRoute(waypoints: LatLng[]): Promise<LatLng[]> {
    // Convertir les waypoints en tableau de [lon, lat]
    const coordinates = waypoints.map(p => [p.lng, p.lat]);
    const payload = {
      coordinates,
      format: 'geojson'
    };

    const directionsUrl = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';

    try {
      const response = await fetch(directionsUrl, {
        method: 'POST',
        headers: {
          'Authorization': this.apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      // Vérifie que la réponse contient des features avec une géométrie
      if (data && data.features && data.features.length > 0) {
        return data.features[0].geometry.coordinates.map((coord: number[]) => latLng(coord[1], coord[0]));
      } else {
        throw new Error("Aucune route trouvée dans la réponse Directions");
      }
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API Directions :", error);
      throw error;
    }
  }
}