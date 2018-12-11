import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private http: HttpClient) { }

  getJobs(title: string, loc: string) {
    loc = loc || 'Växjö';
    const url = 'https://phpclientapp.herokuapp.com/CareerService.php?title=' + title+'&loc='+ loc;
    // let url = 'dist/php/CareerService.php?title=' + title;
    return this.http.get(url);
    // .map((res: Response) => res.json());
  }
}
