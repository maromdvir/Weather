import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Location } from "../../shared/models/location.model";
import * as LocationsActions from "../../store/actions/favorites.actions";
import * as displayedLocationAction from "../../store/actions/displayed-location.actions";
import { WeatherService } from 'src/app/shared/services/weather/weather.service';
import { Subscription } from 'rxjs';
import { Forecasts } from 'src/app/shared/models/forecast.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  displayedLocation: Location;
  fiveDaysForecasts: Forecasts[];
  subscriptions: Subscription[];
  hasError: boolean;
  isLoading: boolean;


  constructor(private store: Store<AppState>, private weatherService: WeatherService) { }

  ngOnInit() {
    this.hasError = false;
    this.subscriptions = [];
    this.isLoading = true;
    this.subscriptions.push(
      this.store.select("displayedLocation")
        .subscribe(location => {
          this.displayedLocation = location;
          this.subscriptions.push(
            this.weatherService.getLocationWeather(this.displayedLocation.id)
              .subscribe(weather => {
                this.displayedLocation.currentWeather = weather;
                new displayedLocationAction.SetDisplayedLocation(this.displayedLocation);
                this.subscriptions.push(
                  this.weatherService.getFiveDaysForecasts(this.displayedLocation.id)
                    .subscribe(forecasts => {
                      this.fiveDaysForecasts = forecasts;
                      this.isLoading = false;
                    },
                      err => {
                        console.log(err);
                        this.isLoading = false;
                        this.hasError = true;
                      }
                    )
                );
              },
                err => {
                  console.log(err);
                  this.isLoading = false;
                  this.hasError = true;
                }
              )
          );
        },
          err => {
            console.log(err);
            this.isLoading = false;
            this.hasError = true;
          }
        )
    );
  }

  addFavoriteLocation() {
    this.subscriptions.push(
      this.store.select("favorites").subscribe(favorites => {
        if (favorites.findIndex(item => item.id === this.displayedLocation.id) === -1) {
          this.store.dispatch(new LocationsActions.AddFavorite(this.displayedLocation));
        }
      },
        err => console.log(err))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
  }
}
