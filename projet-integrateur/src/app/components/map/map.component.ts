// import { Component, signal, computed, model, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { LeafletModule } from '@bluehalo/ngx-leaflet';
// import { Icon, icon, LatLng, latLng, Layer, LayerGroup, marker, Marker, polyline, Polyline, tileLayer} from 'leaflet';
// import { HeaderComponent } from '../header/header.component';
// import { InputData, requeteData } from '../../components/service/inputData';
// import { requestOutputData } from '../../components/service/requestOutputData';
// import { OptimisationService } from '../../components/service/optimisation.service';

// @Component({
//   selector: 'app-map',
//   standalone: true,
//   imports: [
//     LeafletModule,
//     FormsModule,
//     HeaderComponent
//   ],
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.scss']
// })
// export class MapComponent {
//   protected options = {
//     layers: [
//       tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })
//     ]
//   };

//   private readonly backgroundMap = tileLayer(
//     'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//     { maxZoom: 18, attribution: '...' }
//   );

//   private readonly depotIcon = icon({
//     ...Icon.Default.prototype.options,
//     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//     iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'
//   });

//   private readonly jobIcon = icon({
//     ...Icon.Default.prototype.options,
//     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
//     iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'
//   });

//   protected createJobMarker(pos: LatLng): Marker {
//     return marker([pos.lat, pos.lng], { icon: this.jobIcon });
//   }

//   protected createDepotMarker(pos: LatLng): Marker {
//     return marker([pos.lat, pos.lng], { icon: this.depotIcon });
//   }

//   protected createJobMarkers(addresses: LatLng[]): LayerGroup {
//     const group = new LayerGroup();
//     addresses.forEach((position: LatLng) => {
//       group.addLayer(this.createJobMarker(position));
//     });
//     return group;
//   }

//   protected createDepotMarkers(addresses: LatLng[]): LayerGroup {
//     const group = new LayerGroup();
//     addresses.forEach((position: LatLng) => {
//       group.addLayer(this.createDepotMarker(position));
//     });
//     return group;
//   }

//   protected createRoutePolyline(addresses: LatLng[], color: string): Polyline {
//     return polyline(addresses, { color: color, weight: 4 });
//   }

//   public readonly latitude = model<number>(45.0);
//   public readonly longitude = model<number>(5.9);
//   public readonly zoom = model<number>(8);
//   protected readonly centre = computed<LatLng>(() => latLng(this.latitude(), this.longitude()));
//   public signaltest = signal<requestOutputData | undefined>(undefined);
//   readonly inputJobLocations: LatLng[] = requeteData.jobs.map(job => latLng(job.location[1], job.location[0]));
//   readonly depotLocations: LatLng[] = requeteData.vehicles.map(v => latLng(v.start[1], v.start[0]));

//   layersControl = {
//     baseLayers: {},
//     overlays: {
//       'Jobs': this.createJobMarkers(this.inputJobLocations),
//       'Depots': this.createDepotMarkers(this.depotLocations)
//     }
//   };

//   public optimizedRouteLayer = signal<Layer | null>(null);

//   protected allLayers = computed<Layer[]>(() => {
//     const layersArr: Layer[] = [
//       this.backgroundMap,
//       this.layersControl.overlays['Jobs'],
//       this.layersControl.overlays['Depots']
//     ];
//     if (this.optimizedRouteLayer()) {
//       layersArr.push(this.optimizedRouteLayer() as Layer);
//     }
//     return layersArr;
//   });

//   public optimisationService = inject(OptimisationService);

//   public async buttonOptimization() {
//     try {
//       const inputData: InputData = requeteData;
//       const result = await this.optimisationService.optimization(inputData);
//       this.signaltest.set(result);
  
//       if (result && result.routes && result.routes.length > 0) {
//         const routeColors = ['blue', 'green', 'orange', 'purple', 'brown', 'magenta'];
//         let optimizedLayers: Layer[] = [];
  
//         for (let i = 0; i < result.routes.length; i++) {
//           const route = result.routes[i];

//           const jobSteps = route.steps.filter(
//             step => step.type === 'job' && step.location !== undefined
//           );
//           const jobWaypoints: LatLng[] = jobSteps.map(step => latLng(step.location![1], step.location![0]));
//           const jobMarkersLayer = this.createJobMarkers(jobWaypoints);
//           const allSteps = route.steps.filter(step => step.location !== undefined);
//           const allWaypoints: LatLng[] = allSteps.map(step => latLng(step.location![1], step.location![0]));
//           const detailedCoordinates = await this.optimisationService.getDetailedRoute(allWaypoints);
//           const color = routeColors[i % routeColors.length];
//           const polylineLayer = this.createRoutePolyline(detailedCoordinates, color);
//           const group = new LayerGroup([polylineLayer, jobMarkersLayer]);
//           optimizedLayers.push(group);
//         }
//         const optimizedGroup = new LayerGroup(optimizedLayers);
//         this.optimizedRouteLayer.set(optimizedGroup);
//       }
//     } catch (error) {
//       console.error("Erreur lors de l'optimisation :", error);
//     }
//   }
// }









import { Component, signal, computed, model, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Icon, icon, LatLng, latLng, Layer, LayerGroup, marker, Marker, polyline, Polyline, tileLayer} from 'leaflet';
import { HeaderComponent } from '../header/header.component';
import { InputData, requeteData } from '../../components/service/inputData';
import { requestOutputData } from '../../components/service/requestOutputData';
import { OptimisationService } from '../../components/service/optimisation.service';
import { tournees } from '../../components/service/inputData';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    LeafletModule,
    FormsModule,
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  public tourneesList = tournees; // <- DOIT être une propriété de la classe

  protected options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })
    ]
  };

  private readonly backgroundMap = tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { maxZoom: 18, attribution: '...' }
  );

  private readonly depotIcon = icon({
    ...Icon.Default.prototype.options,
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'
  });

  private readonly jobIcon = icon({
    ...Icon.Default.prototype.options,
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'
  });

  protected createJobMarker(pos: LatLng): Marker {
    return marker([pos.lat, pos.lng], { icon: this.jobIcon });
  }

  protected createDepotMarker(pos: LatLng): Marker {
    return marker([pos.lat, pos.lng], { icon: this.depotIcon });
  }

  protected createJobMarkers(addresses: LatLng[]): LayerGroup {
    const group = new LayerGroup();
    addresses.forEach((position: LatLng) => {
      group.addLayer(this.createJobMarker(position));
    });
    return group;
  }

  protected createDepotMarkers(addresses: LatLng[]): LayerGroup {
    const group = new LayerGroup();
    addresses.forEach((position: LatLng) => {
      group.addLayer(this.createDepotMarker(position));
    });
    return group;
  }

  protected createRoutePolyline(addresses: LatLng[], color: string): Polyline {
    return polyline(addresses, { color: color, weight: 4 });
  }

  public readonly latitude = model<number>(45.0);
  public readonly longitude = model<number>(5.9);
  public readonly zoom = model<number>(8);
  protected readonly centre = computed<LatLng>(() => latLng(this.latitude(), this.longitude()));
  public signaltest = signal<requestOutputData | undefined>(undefined);
  readonly inputJobLocations: LatLng[] = requeteData.jobs.map(job => latLng(job.location[1], job.location[0]));
  readonly depotLocations: LatLng[] = requeteData.vehicles.map(v => latLng(v.start[1], v.start[0]));

  layersControl = {
    baseLayers: {},
    overlays: {
      'Jobs': this.createJobMarkers(this.inputJobLocations),
      'Depots': this.createDepotMarkers(this.depotLocations)
    }
  };

  public optimizedRouteLayer = signal<Layer | null>(null);

  protected allLayers = computed<Layer[]>(() => {
    const layersArr: Layer[] = [
      this.backgroundMap,
      this.layersControl.overlays['Jobs'],
      this.layersControl.overlays['Depots']
    ];
    if (this.optimizedRouteLayer()) {
      layersArr.push(this.optimizedRouteLayer() as Layer);
    }
    return layersArr;
  });

  public optimisationService = inject(OptimisationService);

  public async buttonOptimization() {
    try {
      const inputData: InputData = requeteData;
      const result = await this.optimisationService.optimization(inputData);
      this.signaltest.set(result);
  
      if (result && result.routes && result.routes.length > 0) {
        const routeColors = ['blue', 'green', 'orange', 'purple', 'brown', 'magenta'];
        let optimizedLayers: Layer[] = [];
  
        for (let i = 0; i < result.routes.length; i++) {
          const route = result.routes[i];

          const jobSteps = route.steps.filter(
            step => step.type === 'job' && step.location !== undefined
          );
          const jobWaypoints: LatLng[] = jobSteps.map(step => latLng(step.location![1], step.location![0]));
          const jobMarkersLayer = this.createJobMarkers(jobWaypoints);
          const allSteps = route.steps.filter(step => step.location !== undefined);
          const allWaypoints: LatLng[] = allSteps.map(step => latLng(step.location![1], step.location![0]));
          const detailedCoordinates = await this.optimisationService.getDetailedRoute(allWaypoints);
          const color = routeColors[i % routeColors.length];
          const polylineLayer = this.createRoutePolyline(detailedCoordinates, color);
          const group = new LayerGroup([polylineLayer, jobMarkersLayer]);
          optimizedLayers.push(group);
        }
        const optimizedGroup = new LayerGroup(optimizedLayers);
        this.optimizedRouteLayer.set(optimizedGroup);
      }
    } catch (error) {
      console.error("Erreur lors de l'optimisation :", error);
    }
  }
}


