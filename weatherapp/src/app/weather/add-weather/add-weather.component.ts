import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WeathersService } from 'src/app/services/weathers/weathers.service';

@Component({
  selector: 'app-add-weather',
  templateUrl: './add-weather.component.html',
  styleUrls: ['./add-weather.component.scss']
})
export class AddWeatherComponent implements OnInit {

  isTemperatureSavedSuccess = false;
  isTemperatureSavedFailed = false;
  successMessage = '';
  errorMessage = '';
  temperatureForm: FormGroup;
  @Output() updateTemperature = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private weathersService: WeathersService
  ) { }

  get temperature() {
    return this.temperatureForm.get('temperature');
  }

  ngOnInit() {
    this.temperatureForm = this.formBuilder.group({
      temperature: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.temperatureForm.value);
    this.weathersService.addTemperature(this.temperatureForm.value)
      .subscribe(
        res => {
          console.log(res);
          this.isTemperatureSavedSuccess = true;
          this.successMessage = 'Saved Successfully';
          this.updateTemperature.emit();
          setTimeout(() => this.isTemperatureSavedSuccess = false, 2500);
        },
        err => {
          console.log(err);
          this.isTemperatureSavedFailed = true;
          this.errorMessage = err.error.error[0].detail;
          setTimeout(() => this.isTemperatureSavedFailed = false, 2500);
        }
      );
  }

}
