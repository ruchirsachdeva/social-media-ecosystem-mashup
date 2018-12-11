import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GenomeService {


  constructor(private http: HttpClient) { }

  getGenomicAnalyses(query: any) {
    query = query || 'Växjö';
    const url =  'https://social-media-mashup-server.herokuapp.com/api/search?query='+query;
    //'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ lat+','+ lng+'&key=AIzaSyDs0WJS-0UQ8F3N-8qhxyPXDniFVmS0uHQ';
    return this.http.get(url);
  }
}
