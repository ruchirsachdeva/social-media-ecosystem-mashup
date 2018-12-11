import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FourSquareService {

  constructor(private http: HttpClient) { }

  getCity(lat: any, lng: any) {

    lat = lat || 56.8770413;
    lng = lng || 14.8092744;
    const url =  'https://api.foursquare.com/v2/venues/search?ll='+ lat+','+ lng+'&client_id=NP02NO5REPQGWUJJTGMYJSGFAZC5PLLICSPECHN03CUP15AM&client_secret=SXVLM0VLFQLEOXVXORZBXDOQDBHZVEKJCMYOEHXTNIQTX3IX&v=20181211';
    //'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ lat+','+ lng+'&key=AIzaSyDs0WJS-0UQ8F3N-8qhxyPXDniFVmS0uHQ';
    //NC4MUDMHD4VWNORDITX2EFVPTWV11GJEHEV1EQTSUJ3IT01C
    //GQICVNXYDU3BMIRKG0JCR1DDFOFJAXSLSMKED4SBWEWUXIQS
      return this.http.get(url);
  }

}
