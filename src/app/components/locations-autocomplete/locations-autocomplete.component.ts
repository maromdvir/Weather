import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WeatherService } from 'src/app/shared/services/weather/weather.service';
import { Location } from "../../shared/models/location.model";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as DisplayedLocationActions from "../../store/actions/displayed-location.actions"
import { Subscription, Observable } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from "rxjs/operators";


@Component({
  selector: 'locations-autocomplete',
  templateUrl: './locations-autocomplete.component.html',
  styleUrls: ['./locations-autocomplete.component.css']
})
export class LocationsAutocompleteComponent implements OnInit, OnDestroy {


  myControl = new FormControl();
  options: Observable<Location[]>;
  subscriptions: Subscription[];
  displayedLocation: Location;

  constructor(private weatherService: WeatherService, private store: Store<AppState>) { }


  ngOnInit(): void {
    this.subscriptions = [];
    this.subscriptions.push(
      this.store.select("displayedLocation")
        .subscribe(location => this.displayedLocation = location)
    );
    this.options = this.myControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(q => this.weatherService.getAutocompleteLocations(q)),
        catchError((err, caught) => caught)
      );
  }


  onOptionClicked(option): void {
    this.subscriptions.push(
      this.weatherService.getLocationWeather(option.id)
        .subscribe(weather => {
          option.currentWeather = weather;
          this.store.dispatch(new DisplayedLocationActions.SetDisplayedLocation(option));
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
  }
}
