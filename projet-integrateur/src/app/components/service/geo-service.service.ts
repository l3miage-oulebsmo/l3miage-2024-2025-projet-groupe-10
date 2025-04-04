import { Injectable } from '@angular/core';
import { LatLng, latLng, FeatureGroup } from 'leaflet';
import { FeatureCollection, GeoJsonObject, Point } from 'geojson';
import { GeoCodeProperties, GeoCodePropertiesSchema, getParserJSONFeatureCollection } from '../../data/GeoCodeProperties';
import { GeoJSON2DPointSchema } from 'zod-geojson';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  constructor(){}
  reverseGeocode(cord: LatLng){
    const PromiseData = fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${cord.lng}&lat=${cord.lat}`).then(
      (R) => R.status === 200 ? R.json() : Promise.reject(R.status)
    ).then((data)=>{
      //console.log(data);
      const parser = getParserJSONFeatureCollection(GeoJSON2DPointSchema,GeoCodePropertiesSchema);
      return parser(data);
    }).catch((e)=>{
      return undefined;
    });
    return PromiseData;
  }
  geoCode(address:string,postalCode:string) {
    const addressEncoded = encodeURIComponent(address);
    const postcodeEncoded = encodeURIComponent(postalCode);
    const PromiseData = fetch(`https://api-adresse.data.gouv.fr/search/?q=${addressEncoded}&postcode=${postcodeEncoded}`).then(
      (R) => R.status === 200 ? R.json() : Promise.reject(R.status)
    ).then((data) => {
      const features:FeatureCollection = data;
      if (features.features && features.features.length > 0 && features.features[0].geometry.type == "Point") {
        return latLng(features.features[0].geometry.coordinates[1], features.features[0].geometry.coordinates[0]);
      }
      return undefined;
    }).catch((e) => {
      return undefined;
    });
    return PromiseData;
  }
  getItenerary(points:[lat:number,lon:number][]):Promise<[lng:number,lat:number][]>{
    const promiseData = fetch(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: '5b3ce3597851110001cf62483205eb7437a94c589d0333804202fb88'
        },
        body: JSON.stringify({
          coordinates: points,
        })
      }
    ).then(R => R.status === 200 ? R.json() : Promise.reject( R.status )).then((info) => info.features[0].geometry.coordinates);

    return promiseData;
  }
}