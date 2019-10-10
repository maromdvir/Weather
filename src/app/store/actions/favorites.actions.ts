import { Action } from "@ngrx/store";
import { Location } from "../../shared/models/location.model";
export const ADD_FAVORITE= "[FAVORITES] Add";

export class AddFavorite implements Action{

    readonly type: string = ADD_FAVORITE;

    constructor(public payload: Location){

    }

}

export type Actions = AddFavorite;