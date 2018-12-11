import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  getVideos(lat: any, lng: any) {

    lat = lat || 28.6472799;
    lng = lng || 76.8130667;
    const url =  'https://content.googleapis.com/youtube/v3/search?part=snippet&maxResults=7&q=surfing&key=AIzaSyD-a9IF8KKYgoC3cpgS-Al7hLQDbugrDcw'
    //'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ lat+','+ lng+'&key=AIzaSyDs0WJS-0UQ8F3N-8qhxyPXDniFVmS0uHQ';
    return this.http.get(url);
  }
}
