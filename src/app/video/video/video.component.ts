import {Component, OnInit} from '@angular/core';
import {VideoService} from "../../services/video.service";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  urls: string[] = [];

  constructor(private videoService: VideoService) {
  }

  ngOnInit() {
    this.videoService.getVideos(28.6472799, 76.8130667, 12)
      .subscribe(
        data => {
          for (var item of data['items']) {
            this.urls.push('https://www.youtube.com/embed/' + item.id.videoId);
          }
        },
        err => console.error(err)
      );
  }


  getVideos($event) {
    this.urls=[];
    this.videoService.getVideos($event.lat, $event.lng, 12)
      .subscribe(
        data => {
          for (var item of data['items']) {
            this.urls.push('https://www.youtube.com/embed/' + item.id.videoId);
          }
        },
        err => console.error(err)
      );
  }

}
