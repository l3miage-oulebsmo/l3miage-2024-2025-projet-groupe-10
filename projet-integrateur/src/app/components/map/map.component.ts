import { Component, computed, EventEmitter, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Icon, icon, LatLng, latLng, MapOptions, marker, Polyline, polyline, tileLayer } from 'leaflet';
import { HeaderComponent } from '../header/header.component';

import * as Papa from 'papaparse';
import axios from 'axios'; 

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    LeafletModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    HeaderComponent
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  public readonly latitude = model<number>(45.166672);
  public readonly longitude = model<number>(5.71667);
  public readonly zoom = model<number>(12);
  public readonly leafletCenterChange = output<LatLng>();
  public readonly leafletZoomChange = output<number>();

  // Données pour les adresses et itinéraires
  public locations: any[] = [];
  public route: Polyline | undefined;

  // Centre de la carte
  protected readonly centre = computed<LatLng>(() => latLng(this.latitude(), this.longitude()));

  // Carte de fond
  public readonly backgroundMap = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' });

  private map!: L.Map;

  constructor() {
    this.loadCSV();  // Charge le CSV dès que le composant est initialisé
  }

  // Charger les données CSV
  loadCSV(): void {
    const csvFile = 'assets/locations.csv'; // Chemin du fichier CSV

    Papa.parse(csvFile, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result: Papa.ParseResult<any>) => {
        console.log("Données CSV chargées :", result.data);
        this.locations = result.data.map(location => ({
          name: location.name,
          latitude: parseFloat(location.latitude),
          longitude: parseFloat(location.longitude)
        }));
        this.addMarkers(); // Ajoute les marqueurs à la carte
        this.calculateRoute(); // Calcule l'itinéraire optimal
      }
    });
  }

  // Initialisation de la carte
  onMapReady(map: L.Map) {
    this.map = map; // Stocke la référence à la carte Leaflet
    this.map.addLayer(this.backgroundMap); // Ajoute la carte de fond
    console.log("Carte prête");
  }

  // Ajouter les marqueurs à la carte
  addMarkers(): void {
    this.locations.forEach(location => {
      const { latitude, longitude, name } = location;

      marker([latitude, longitude], {
        icon: icon({
          iconUrl: 'assets/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41]
        })
      })
      .addTo(this.map) // Ajoute directement à la carte
      .bindPopup(location.name);
    });
  }

  // Calculer et afficher l'itinéraire avec OpenRoute en utilisant axios
  calculateRoute(): void {
    if (this.locations.length > 1) {
      const coordinates = this.locations.map(location => [
        parseFloat(location.longitude),
        parseFloat(location.latitude)
      ]);

      const apiKey = "5b3ce3597851110001cf6248eff7631745e44590b4103fd172e3856b"; 
      const openRouteApiUrl = "https://api.openrouteservice.org/v2/directions/driving-car";

      const body = {
        coordinates: coordinates,
        optimize: true
      };

      // Utilisation d'axios pour envoyer la requête POST
      axios.post(openRouteApiUrl, body, {
        headers: {
          'Authorization': apiKey,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log("Données de l'itinéraire reçues :", response.data);

        // Vérification que la réponse contient des routes
        const data = response.data as { routes: any[] };
        if (data.routes && data.routes.length > 0) {
          alert('Itinéraire trouvé!');

          // Récupérer les coordonnées de l'itinéraire dans le format correct
          const routeCoordinates = (response.data as any).routes[0].geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]]);

          // Créer et afficher la polyline (itinéraire) sur la carte
          if (this.route) {
            this.map.removeLayer(this.route); // Supprime l'ancien itinéraire
          }

          this.route = polyline(routeCoordinates, { color: 'blue', weight: 4 }).addTo(this.map); // Ajoute à la carte
          console.log('Itinéraire ajouté à la carte');
        } else {
          alert('Aucune route trouvée');
          console.error('Aucune route trouvée dans la réponse');
        }
      })
      .catch(error => console.error('Erreur lors de la récupération de l\'itinéraire :', error));
    }
  }

  // Changer la latitude
  public latChange(lat: number) {
    this.latitude.set(lat);
    this.leafletCenterChange.emit(latLng(this.latitude(), this.longitude()));
  }

  // Changer la longitude
  public longChange(long: number) {
    this.longitude.set(long);
    this.leafletCenterChange.emit(latLng(this.latitude(), this.longitude()));
  }

  // Changer le centre
  public centerChange(centre: LatLng) {
    this.latChange(centre.lat);
    this.longChange(centre.lng);
  }

  // Changer le zoom
  public zoomChange(zoom: number) {
    this.zoom.set(zoom);
    this.leafletZoomChange.emit(this.zoom());
  }

  // Réinitialiser la carte
  public resetMap() {
    this.latitude.set(45.166672);
    this.longitude.set(5.71667);
    this.zoom.set(12);
  }
}