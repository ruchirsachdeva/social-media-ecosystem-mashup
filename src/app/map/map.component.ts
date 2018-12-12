import {Component, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {FlickrService} from '../services/flickr.service';
import {MouseEvent, AgmCircle} from '@agm/core';
import {FourSquareService} from "../services/foursquare.service";
import {ForsquareData, Marker, Circle} from "../model/api";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  DEFAULT_MAP_ZOOM = 12;
  DEFAULT_MAP_LAT = 56.8770413;
  DEFAULT_MAP_LNG = 14.8092744;

  @Output() mapEvent = new EventEmitter();

  markers: Marker[] = [];

  preventSingleClick = false;
  timer: any;

  constructor(private flickrService: FlickrService,
              public mapService: FourSquareService,) {
  }

  ngOnInit() {
    this.initMapWithFlickr(56.8770413, 14.8092744);
  }

  initMapWithFlickr(lat: number, lng: number) {
    this.markers = [];
    //TODO get city name and load lat, lng Marker.
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
    this.emitMapEvent(lat, lng);


  }

  private emitMapEvent(lat: number, lng: number) {
    this.mapService.getCity(lat, lng).subscribe(
      data => {


        for (var venue of (<ForsquareData>data).response.venues) {
          if (venue.location.city) {
            this.mapEvent.emit({
              lat: lat,
              lng: lng,
              city: venue.location.city
            });
            this.pushMarker(lat, lng, venue.location.city, venue.location.city);
            break;
          }
        }

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
    this.pushMarker(lati, langi, item.title, imgSrc);
  }


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
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
    this.preventSingleClick = true;
    clearTimeout(this.timer);
  }


  markerDragEnd(m: Marker, $event: MouseEvent) {
    this.emitMapEvent($event.coords.lat, $event.coords.lng);
  }


  private pushMarker(lati: number, langi: number, title: string, imgSrc: string) {
    this.markers.push({
      lat: lati,
      lng: langi,
      title: title,
      img: imgSrc,
      draggable: true
    });
  }


}



