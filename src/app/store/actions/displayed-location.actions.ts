import { Action } from "@ngrx/store";
import { Location } from "../../shared/models/location.model";


export const SET_DISPLAYED_LOCATION= "[DISPLAYED_LOCATION] Set";

export class SetDisplayedLocation implements Action{

    readonly type: string = SET_DISPLAYED_LOCATION;

    constructor(public payload: Location){

    }

}

export type Actions = SetDisplayedLocation;