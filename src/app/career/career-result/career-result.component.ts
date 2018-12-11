import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-career-result',
  templateUrl: './career-result.component.html',
  styleUrls: ['./career-result.component.scss']
})
export class CareerResultComponent implements OnInit {

  @Input() company: string;
  @Input() title: string;
  @Input() description: string;
  @Input() url: string;

  constructor() { }

  ngOnInit() {
  }

}
