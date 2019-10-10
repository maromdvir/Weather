import { Component, Input } from '@angular/core';
import { Location } from "../../shared/models/location.model";
@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent{

  @Input() favorite: Location;

}
