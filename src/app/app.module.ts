import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { WeatherComponent } from './weather/weather.component';
import { CareerComponent } from './career/career.component';
import { CareerResultComponent } from './career/career-result/career-result.component';
import { WikipediaComponent } from './wikipedia/wikipedia/wikipedia.component';
import {EmbedVideo} from "ngx-embed-video/dist";
import { VideoComponent } from './video/video/video.component';
import { SafePipePipe } from './pipe/safe-pipe.pipe';
import { GenomeComponent } from './genome/genome.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    WeatherComponent,
    CareerComponent,
    CareerResultComponent,
    WikipediaComponent,
    VideoComponent,
    SafePipePipe,
    GenomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDs0WJS-0UQ8F3N-8qhxyPXDniFVmS0uHQ'
    }),
    EmbedVideo.forRoot()
  ],
  providers: [],
  entryComponents: [CareerResultComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
