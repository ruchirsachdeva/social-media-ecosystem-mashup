import {Component, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {FlickrService} from '../services/flickr.service';
import {MouseEvent, AgmCircle} from '@agm/core';
import {FourSquareService} from "../services/foursquare.service";
import {ForsquareData} from "../model/api";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  DEFAULT_MAP_ZOOM = 12;
  DEFAULT_MAP_LAT = 56.8770413;
  DEFAULT_MAP_LNG = 14.8092744;

  @ViewChild(AgmCircle) child;

  @Output() mapEvent = new EventEmitter();

  markers: marker[] = [];
  circle: circle = null;

  preventSingleClick = false;
  timer: any;
  delay: Number;

  constructor(private flickrService: FlickrService,
              public mapService: FourSquareService,) {
  }

  ngOnInit() {
    this.initMapWithFlickr(56.8770413, 14.8092744);
  }

  initMapWithFlickr(lat: number, lng: number) {
    this.circle = null;
    this.markers = [];
    //TODO get city name and load lat, lng marker.
    lng = lng || 14.8092744;
    lat = lat || 56.8770413;
    const args: Object = {lat: lat, lon: lng, radius: 4, per_page: 10, has_geo: true};

    this.flickrService.search(args)
      .subscribe((response) => {
          const items = response['photos']['photo'];
          for (const item of items) {
            this.getLocationFromPhotos(item, item.id);
          }
        },
        error => console.error(error)
      );

    this.mapService.getCity(lat,lng).subscribe(
      data => {
        this.mapEvent.emit({
          lat: lat,
          lng: lng,
          venues: (<ForsquareData>data).response.venues
        });
      },
      err => console.error(err)
    );


  }

  getLocationFromPhotos(item, id) {
    this.flickrService.getLocation(id)
      .subscribe((response) => {
          this.appendToMap(item, response);
        },
        error => console.error(error)
      );
  }

  appendToMap(item, geoInfo) {
    const lati = Number(geoInfo.photo.location.latitude);
    const langi = Number(geoInfo.photo.location.longitude);
    const imgSrc = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_q.jpg';

    this.markers.push({
      lat: lati,
      lng: langi,
      title: item.title,
      img: imgSrc,
      draggable: true
    });
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  test($event: MouseEvent) {
    console.log(this.child.latitude);
    console.log(this.child.longitude);
    console.log(this.child.radius);
    console.log(this.child.getBounds())
  }

  mapClicked($event: MouseEvent) {
    this.preventSingleClick = false;
    const delay = 200;
    this.timer = setTimeout(() => {
      // if preventSingleClick set to true within 200ms(by dblClick), don't perform any operation.
      if (!this.preventSingleClick) {
        this.initMapWithFlickr($event.coords.lat, $event.coords.lng);
      }
    }, delay);
  }

  mapDblClicked($event: MouseEvent) {
    console.log(this.child);
    this.preventSingleClick = true;
    clearTimeout(this.timer);
    this.circle = {
      lat: $event.coords.lat,
      lng: $event.coords.lng
    };
    this.markers=[];
  }



  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }


}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  title?: string;
  img?: string;
  draggable: boolean;
}

// just an interface for type safety.
interface circle {
  lat: number;
  lng: number;
}


