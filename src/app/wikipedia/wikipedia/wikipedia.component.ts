import {Component, OnInit} from '@angular/core';
import {WikipediaService} from "../../services/wikipedia.service";
import {WikiResponse, Search, Venue} from "../../model/api";

@Component({
  selector: 'app-wikipedia',
  templateUrl: './wikipedia.component.html',
  styleUrls: ['./wikipedia.component.scss']
})
export class WikipediaComponent implements OnInit {

  searchResult: Search[]

  constructor(public wikipediaService: WikipediaService) {
  }

  ngOnInit() {
    this.getWiki('Växjö');
  }

  setLocation($event) {
    this.searchResult = [];
    this.getWiki($event.city);

  }

  private getWiki(city) {
    this.wikipediaService.getWiki(city)
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
