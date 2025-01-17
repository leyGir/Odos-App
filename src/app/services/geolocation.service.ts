import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

import { Observable } from 'rxjs';

import { City } from '../models/city';


let BigDataCloudAPI = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private http: HttpClient, private geolocation: Geolocation) { }

  // function that return a promise of coordinates
  getGeolocation(): Promise<Coordinates> {
    return this.geolocation.getCurrentPosition()
      .then((position: Geoposition) => {
        const coords = position.coords;
        console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
        return coords;
      })

  }

// function that transforms coordinates into city full informations
  getCity(x, y): Observable<City> {
    const latitude = "latitude=" + x;
    const longitude = "&longitude=" + y;
    const query = latitude + longitude + "&localityLanguage=fr";
    return this.http.get<City>(BigDataCloudAPI += query);
  }
}
