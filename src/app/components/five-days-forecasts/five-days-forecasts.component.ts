import { Component, Input } from '@angular/core';
import { Forecasts } from 'src/app/shared/models/forecast.model';

@Component({
  selector: 'fiveDaysForecasts',
  templateUrl: './five-days-forecasts.component.html',
  styleUrls: ['./five-days-forecasts.component.css']
})
export class FiveDaysForecastsComponent {

  @Input() fiveDaysForecasts: Forecasts[];

}
