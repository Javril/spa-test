import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IWeather } from './IWeather';
import { AppSetting } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class WeathersService {
  private url = `${AppSetting.API_ENDPOINT}/weathers`;

  constructor(private httpClient: HttpClient) { }

  addWeather = (temperatureForm: IWeather) => {
    return this.httpClient.post(`${this.url}/add`, temperatureForm);
  }
}
