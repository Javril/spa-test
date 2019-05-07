import { Component, OnInit, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { WeathersService } from 'src/app/services/weathers/weathers.service';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit {

  constructor(private weathersService: WeathersService) { }
  @Input() temperatures: any;

  ngOnInit() {
    this.weathersService.getTemperatures()
      .subscribe((temperatures: any) => {
        this.temperatures = temperatures;
      });
  }
}
