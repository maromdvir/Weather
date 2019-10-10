import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { FavoritesComponent } from './views/favorites/favorites.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { StoreModule } from "@ngrx/store";
import { favoritesReducer } from "./store/reducers/favorites.reducer";
import { LocationsAutocompleteComponent } from './components/locations-autocomplete/locations-autocomplete.component';
import { HttpClientModule } from "@angular/common/http";
import { displayedLocationReducer } from './store/reducers/displayed-location.reducer';
import { FiveDaysForecastsComponent } from './components/five-days-forecasts/five-days-forecasts.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent,
    NavbarComponent,
    NotFoundComponent,
    LocationsAutocompleteComponent,
    FiveDaysForecastsComponent,
    FavoriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    StoreModule.forRoot({
      favorites: favoritesReducer,
      displayedLocation: displayedLocationReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
