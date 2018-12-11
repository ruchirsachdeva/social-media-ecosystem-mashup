import { Component, OnInit } from '@angular/core';
import {GenomeService} from "../services/genome.service";
import {GenomicAnalysis} from "../model/api";

@Component({
  selector: 'app-genome',
  templateUrl: './genome.component.html',
  styleUrls: ['./genome.component.scss']
})
export class GenomeComponent implements OnInit {
  private genomicAnalyses: GenomicAnalysis[] = [];

  constructor(public genomeService: GenomeService) { }

  ngOnInit() {
    this.getGenomicAnalyses('Växjö');
  }

  setLocation($event) {
    this.genomicAnalyses = [];
    this.getGenomicAnalyses($event.city);

  }

  private getGenomicAnalyses(city: string|any) {
    this.genomeService.getGenomicAnalyses(city)
      .subscribe((response) => {
          this.genomicAnalyses = <GenomicAnalysis[]>response;
          console.log(this.genomicAnalyses);
        },
        error => console.error(error)
      );
  }
}
