import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  private apiKey = '5b3ce3597851110001cf62483205eb7437a94c589d0333804202fb88';  // remplacer par votre clé OpenRouteService
  private baseUrl = 'https://api.openrouteservice.org/v2/directions/driving-car';
  // ou autre endpoint, selon le cas

  constructor(private http: HttpClient) {}

  async getRoute (coords: [number, number][]): Promise<any> {
    // coords doit être de la forme [[lon, lat], [lon, lat], ...]
    const headers = new Headers({
      'Authorization': this.apiKey,
      'Content-Type': 'application/json'
    });

    const body = {
      coordinates: coords
    };

    let response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });
    return response.json();
  }
}
