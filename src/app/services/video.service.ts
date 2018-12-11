import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  getVideos(lat: any, lng: any, radius: any) {
    lat = lat || 56.8770413;
    lng = lng || 14.8092744;
    radius = radius || 12;
    const url =  'https://content.googleapis.com/youtube/v3/search?part=snippet&maxResults=7&location='+lat+','+lng+'&locationRadius='+ radius+'km&type=video&key=AIzaSyANNKdsj57oxTNR3LWExatX-l-t26OrhwI'
    //'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ lat+','+ lng+'&key=AIzaSyDs0WJS-0UQ8F3N-8qhxyPXDniFVmS0uHQ';
    return this.http.get(url);
  }
}
