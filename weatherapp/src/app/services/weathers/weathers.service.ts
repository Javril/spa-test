import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IWeather } from './IWeather';
import { AppSetting } from 'src/app/constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeathersService {
  private url = `${AppSetting.API_ENDPOINT}/weathers`;
  public temperatureBS = new BehaviorSubject<any[]>(null);
  // public temperatureBS$ = this.temperatureBS.asObservable();

  constructor(private httpClient: HttpClient) { }

  addTemperature = (temperatureForm: IWeather) => {
    return this.httpClient.post(`${this.url}/add`, temperatureForm);
  }

  getTemperatures = () => {
    return this.httpClient.get(`${this.url}`);
  }

  public deleteTemperature(id: string) {
    console.log(`${this.url}/${id}`);
    return this.httpClient.get(`${this.url}/${id}`);
  }
}
