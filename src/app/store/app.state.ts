import { Location } from "../shared/models/location.model";

export interface AppState{
    readonly favorites: Location[];
    readonly displayedLocation: Location;
}