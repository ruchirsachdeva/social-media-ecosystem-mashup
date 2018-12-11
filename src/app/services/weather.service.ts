import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWheather(lat: any, lng: any) {

    lat = lat || 28.6472799;
    lng = lng || 76.8130667;
    const url = 'https://api.wunderground.com/api/cc988597833ce2b4/forecast/q/'+ lat+','+ lng+'.json';
    https://www.wunderground.com/weather/api/d/docs?d=data/geolookup&_ga=2.262331596.1177834777.1543878176-975081029.1543878176
    return this.http.get(url);
  }
}
