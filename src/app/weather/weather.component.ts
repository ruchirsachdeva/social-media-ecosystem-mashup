import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  forecasts: Array<any> = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getWheather(28.6472799,76.8130667)
      .subscribe(
        data => {
          this.createWeatherForecasts(data);
        },
        err => console.error(err)
      );
  }

  getWeather($event) {
    this.weatherService.getWheather($event.lat,$event.long)
      .subscribe(
        data => {
          this.createWeatherForecasts(data);
        },
        err => console.error(err)
      );
  }

  createWeatherForecasts(data) {
    this.forecasts=[];
    data = data.forecast.txt_forecast.forecastday;
    for (let i = 0; i < data.length; i += 2) { // +2 is used to avoid printing night weather.
      const dayStr = this.formatDay(data[i].title);
      const forecastObj = {day: dayStr, icon: data[i].icon_url, description: data[i].fcttext_metric};
      this.forecasts.push(forecastObj);
    }
  }

  formatDay(day) {
    let result = '';
    switch (day.toUpperCase()) {
      case 'MONDAY':
        result = 'Mon';
        break;
      case 'TUESDAY':
        result = 'Tue';
        break;
      case 'WEDNESDAY':
        result = 'Wed';
        break;
      case 'THURSDAY':
        result = 'Thu';
        break;
      case 'FRIDAY':
        result = 'Fri';
        break;
      case 'SATURDAY':
        result = 'Sat';
        break;
      case 'Sunday':
        result = 'Sun';
        break;
    }
    return result;
  }

}
