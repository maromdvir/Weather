import * as FavoritesActions from "../actions/favorites.actions";
import { Location } from "../../shared/models/location.model";

const initState: Location[] = [];

export function favoritesReducer(state = initState, action: FavoritesActions.Actions){
    switch(action.type){
        case FavoritesActions.ADD_FAVORITE:
            return [...state, action.payload];
        default:
            return state; 
    }
}