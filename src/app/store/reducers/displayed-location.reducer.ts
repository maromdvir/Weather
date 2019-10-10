import * as displayedLocationActions from "../actions/displayed-location.actions";
import { Location } from "../../shared/models/location.model";

const initState: Location = {
    currentWeather: undefined,
    id:"1127709",
    name:"Tel Aviv"
};

export function displayedLocationReducer(state = initState, action: displayedLocationActions.Actions){
    switch(action.type){
        case displayedLocationActions.SET_DISPLAYED_LOCATION:
            return { ...action.payload };
        default:
            return state; 
    }
}