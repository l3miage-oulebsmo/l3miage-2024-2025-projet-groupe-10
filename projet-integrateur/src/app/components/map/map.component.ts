import { Component, computed, effect, EventEmitter, input, model, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Icon, icon, LatLng, latLng, Layer, MapOptions, marker, Marker, polyline, Polyline, tileLayer, Zoom, LayerGroup } from 'leaflet';
import * as Papa from 'papaparse';


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
    MatInputModule
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
  private readonly backgroundMap = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' });

  // Couches (layers) de la carte
  protected readonly layers = computed((): Layer[] => [this.backgroundMap, this.layerGroup]);

  private map!: L.Map;
  constructor() {
    this.loadCSV();  // Charge le CSV dès que le composant est initialisé
  }

  // Charger les données CSV
  loadCSV(): void {
   // const csvFile = 'locations.csv';
   const csvFile = 'assets/locations.csv'; 

    Papa.parse(csvFile, {
      download: true,
      header:true,
      skipEmptyLines: true ,
      complete: (result: Papa.ParseResult<any>) => {
        console.log("Données CSV chargées :", result.data);
        this.locations = result.data.map(location=> ({
          name: location.name,
          latitude: parseFloat(location.latitude),
          longitude : parseFloat(location.longitude)
        })); 
        this.addMarkers(); // Ajoute les marqueurs à la carte
        this.calculateRoute(); // Calcule l'itinéraire optimal
      },
     
    });
  }

  onMapReady(map: L.Map) {
    this.map = map; // Stocke la référence à la carte Leaflet
    this.map.addLayer(this.layerGroup);
    this.layerGroup.addTo(this.map); // Ajoute le LayerGroup à la carte
    console.log("Carte prête et LayerGroup ajouté");
  }
  

  // Déclare un LayerGroup pour gérer les différentes couches de manière appropriée
  protected readonly layerGroup = new LayerGroup();

  // Ajouter les marqueurs à la carte
  addMarkers(): void {
    this.layerGroup.clearLayers(); // Nettoie la carte avant d'ajouter de nouveaux marqueurs
  
    this.locations.forEach(location => {
      const { latitude, longitude, name } = location;
  
      marker([latitude, longitude], {
        icon: icon({
          iconUrl: 'assets/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41]
        })
      })
      .addTo(this.layerGroup) // Ajoute au LayerGroup
      .bindPopup(location.name);
    });
  
    this.layerGroup.addTo(this.map);
  }

  // Calculer et afficher l'itinéraire avec OpenRoute
  calculateRoute(): void {
    if (this.locations.length > 1) {
      const coordinates = this.locations.map(location => [
        parseFloat(location.longitude),
        parseFloat(location.latitude)
      ]);
  
      const apiKey = "5b3ce3597851110001cf6248eff7631745e44590b4103fd172e3856b"; 
      const openRouteApiUrl = "https://api.openrouteservice.org/v2/directions/driving-car";
  
      const body = JSON.stringify({
        coordinates: coordinates,
        optimize: true
      });
  
      fetch(openRouteApiUrl, { 
        method: 'POST',
        headers: {
          'Authorization': apiKey,
          'Content-Type': 'application/json'
        },
        body: body
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log("Données de l'itinéraire reçues :", data);
  
        // Vérification que la réponse contient des routes
        if (data.routes && data.routes.length > 0) {
          alert('Itinéraire trouvé!'); // Affichage d'un message
          if (this.route) {
            this.layerGroup.removeLayer(this.route); // Supprime l'ancien itinéraire
          }
  
          // Récupérer les coordonnées de l'itinéraire dans le format correct
          const routeCoordinates = data.routes[0].geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]]);
  
          // Créer et afficher la polyline (itinéraire) sur la carte
          this.route = polyline(routeCoordinates, { color: 'blue', weight: 4 }).addTo(this.layerGroup); 
          console.log('Itinéraire ajouté à la carte');
        } else {
          alert('Aucune route trouvée');
          console.error('Aucune route trouvée dans la réponse');
        }
      })
      .catch(error => console.error('Error fetching route:', error));
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
