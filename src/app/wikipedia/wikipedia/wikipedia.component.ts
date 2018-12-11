import { Component, OnInit } from '@angular/core';
import {WikipediaService} from "../../services/wikipedia.service";
import {WikiResponse, Search, Venue} from "../../model/api";

@Component({
  selector: 'app-wikipedia',
  templateUrl: './wikipedia.component.html',
  styleUrls: ['./wikipedia.component.scss']
})
export class WikipediaComponent implements OnInit {

  venues: Venue[];
  searchResult: Search[]

  constructor(public wikipediaService: WikipediaService) { }

  ngOnInit() {
  }

  setLocation($event) {
    this.searchResult = [];
    this.venues = $event.venues;
    for (var venue of this.venues) {
      if(this.searchResult.length > 0) {
        break;
      }
      if (venue.location.city) {
        this.wikipediaService.getWiki(venue.location.city)
          .subscribe((response) => {
              var wikiResponse = <WikiResponse>response;
              if (wikiResponse.query.search.length > 0) {
                this.searchResult = wikiResponse.query.search;
              }
            },
            error => console.error(error)
          );
      }
    }
  }

}
