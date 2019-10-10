import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NetService } from '../net/net.service';
import { Location } from "../../models/location.model"
import { Weather } from '../../models/weather.model';
import { Forecasts } from '../../models/forecast.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  baseUrl: string = "http://dataservice.accuweather.com/";
  apiKey: string = "T6M9h9n1U2opnEMlkzcYGUvlFUbn9NNH";


  constructor(private net: NetService, private store: Store<AppState>) { }


  setQueryParams(params): string {
    params["apikey"] = this.apiKey;
    const esc = encodeURIComponent;
    return Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k])).join('&');
  }


  getAutocompleteLocations(startWith?: string): Observable<Location[]> {
    const params = {};
    if (startWith) {
      params["q"] = startWith;
    }
    return this.net.getAutocompleteLocations(`${this.baseUrl}locations/v1/cities/autocomplete?${this.setQueryParams(params)}`)
      .pipe(
        map(response => response ?
          response.map(item => <Location>{
            id: item.Key,
            name: item.LocalizedName,
            currentWeather: {}
          }) : []
        ),
      );
  }


  getLocationWeather(locationKey: string): Observable<Weather> {
    return this.net.getLocationWeather(`${this.baseUrl}currentconditions/v1/${locationKey}?${this.setQueryParams({})}`)
      .pipe(
        map(response => response
          .map(item => <Weather>{
            weatherText: item.WeatherText,
            temperature: {
              imperial: {
                unit: item.Temperature.Imperial.Unit,
                unitType: item.Temperature.Imperial.UnitType,
                value: item.Temperature.Imperial.Value
              },
              metric: {
                unit: item.Temperature.Metric.Unit,
                unitType: item.Temperature.Metric.UnitType,
                value: item.Temperature.Metric.Value
              }
            }
          })[0]
        )
      );
  }

  getFiveDaysForecasts(locationKey: string): Observable<Forecasts[]> {

    return this.net.getFiveDaysForecasts(`${this.baseUrl}forecasts/v1/daily/5day/${locationKey}?${this.setQueryParams({})}`)
      .pipe(
        map(response => response.DailyForecasts.map(
          item => <Forecasts>{
            date: item.Date,
            temperature: {
              maximum: {
                unit: item.Temperature.Maximum.Unit,
                unitType: item.Temperature.Maximum.UnitType,
                value: item.Temperature.Maximum.Value
              },
              minimum: {
                unit: item.Temperature.Minimum.Unit,
                unitType: item.Temperature.Minimum.UnitType,
                value: item.Temperature.Minimum.Value
              }
            }
          }
        ))
      );
  }

}
