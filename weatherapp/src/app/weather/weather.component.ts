import { Component, OnInit } from '@angular/core';
import { WeathersService } from '../services/weathers/weathers.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  temperatures: any;
  constructor(private weathersService: WeathersService) { }

  ngOnInit() {
  }

  updateTemperature() {
    this.weathersService.getTemperatures()
      .subscribe((temperatures: any) => {
        this.temperatures = temperatures;
      });
  }

}
