import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from "../../shared/models/location.model";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as DisplayedLocationActions from "../../store/actions/displayed-location.actions"
import { Router } from '@angular/router';



@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  
  favorites: Observable<Location[]>;

  constructor(private store: Store<AppState>, private router: Router){}

  ngOnInit() {
    this.favorites = this.store.select("favorites");
  }

  onFavoriteClicked(favorite: Location){
    this.store.dispatch(new DisplayedLocationActions.SetDisplayedLocation(favorite));
    this.router.navigate(['/'])
  }
}
