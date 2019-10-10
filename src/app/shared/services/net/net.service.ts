import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DailyForecastsResponse } from '../../models/forecasts-response.model';
import { WeatherResponse } from '../../models/weather-response.model';

@Injectable({
  providedIn: 'root'
})
export class NetService {

  constructor(private http: HttpClient) { }

  getAutocompleteLocations(query: string): Observable<{ Key: string, LocalizedName:string }[]>{
    return this.http.get<{ Key: string, LocalizedName: string}[]>(query);
  }

  getLocationWeather(query: string): Observable<WeatherResponse[]>{
    return this.http.get<WeatherResponse[]>(query);
  }

  getFiveDaysForecasts(query: string): Observable<DailyForecastsResponse>{
    return this.http.get<DailyForecastsResponse>(query);
  }
}

