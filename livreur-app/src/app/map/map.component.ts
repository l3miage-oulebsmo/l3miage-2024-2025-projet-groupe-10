import { Component, computed, effect, Input, model, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Icon, icon, LatLng, latLng, Layer, MapOptions, marker, Marker, polyline, Polyline, tileLayer } from 'leaflet';
import { HeaderComponent } from "../header/header.component";


@Component({
  selector: 'app-map',
  imports: [
    LeafletModule,
    FormsModule,
    HeaderComponent
],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  public readonly latitude = model<number>(45.166672);
  public readonly longitude = model<number>(5.71667);
  public readonly zoom = model<number>(12);

  public readonly markerPosition = model<LatLng | null>(null);

  private readonly markerLayer = computed<Marker | null>(() => 
    this.markerPosition() ? latLngToMarker(this.markerPosition()!) : null
  );

  protected readonly centre = computed<LatLng>(
    () => latLng(this.latitude(), this.longitude())
  );

  private readonly backgroundMap = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' });
  
  protected readonly layers = computed<Layer[]>(() => {
    const layers: Layer[] = [this.backgroundMap];
    if (this.markerLayer()) {
      layers.push(this.markerLayer()!);
    }
    return layers;
  });

  updateCentre(latLng: LatLng): void {
    this.latitude .set(latLng.lat);
    this.longitude.set(latLng.lng);
  }

  updateZoom(zoom: number): void {
    this.zoom.set(zoom);
  }

  onMapClick(event: any): void {
    const clickedLatLng = event.latlng;
    this.markerPosition.set(clickedLatLng);
  }
}

function latLngToMarker(latLng: LatLng): Marker {
  return marker(
    [latLng.lat, latLng.lng], {
      icon: icon({
        ...Icon.Default.prototype.options,
        iconUrl: 'assets/marker-icon.png',
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    }
  );
}