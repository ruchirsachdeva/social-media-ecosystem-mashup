import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FourSquareService {

  constructor(private http: HttpClient) { }

  getCity(lat: any, lng: any) {

    lat = lat || 28.6472799;
    lng = lng || 76.8130667;
    const url =  'https://api.foursquare.com/v2/venues/search?ll='+ lat+','+ lng+'&client_id=NC4MUDMHD4VWNORDITX2EFVPTWV11GJEHEV1EQTSUJ3IT01C&client_secret=GQICVNXYDU3BMIRKG0JCR1DDFOFJAXSLSMKED4SBWEWUXIQS&v=20181211'
    //'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ lat+','+ lng+'&key=AIzaSyDs0WJS-0UQ8F3N-8qhxyPXDniFVmS0uHQ';
      return this.http.get(url);
  }

}
