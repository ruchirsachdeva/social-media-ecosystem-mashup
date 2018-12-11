import {Component, OnInit} from '@angular/core';
import {VideoService} from "../../services/video.service";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  urls: string[]= [];

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    console.log(this.videoService.getVideos(1,2));
    this.urls.push('https://www.youtube.com/embed/Ez2GeaMa4c8');
  }

}
