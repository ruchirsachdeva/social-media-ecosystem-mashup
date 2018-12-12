import { Component, OnInit } from '@angular/core';
import {GenomeService} from "../services/genome.service";
import {GenomicAnalysis} from "../model/api";

@Component({
  selector: 'app-genome',
  templateUrl: './genome.component.html',
  styleUrls: ['./genome.component.scss']
})
export class GenomeComponent implements OnInit {
  public genomicAnalyses: GenomicAnalysis[] = [];
  public showSpinner: boolean = false;

  constructor(public genomeService: GenomeService) { }

  ngOnInit() {
    this.getGenomicAnalyses('Växjö');
  }

  setLocation($event) {
    this.genomicAnalyses = [];
    this.getGenomicAnalyses($event.city);

  }

  private getGenomicAnalyses(city: string|any) {
    this.showLoadingSpinner();
    this.genomeService.getGenomicAnalyses(city)
      .subscribe((response) => {
          this.genomicAnalyses = <GenomicAnalysis[]>response;
          // response received so hide spinner now
          this.hideLoadingSpinner();
        },
        error => console.error(error)
      );
  }

  showLoadingSpinner() {
    this.showSpinner = true;
  }

  hideLoadingSpinner() {
    this.showSpinner = false;
  }
}
