import { Weather } from './weather.model';

export interface Location{
    id: string;
    name: string;
    currentWeather: Weather;

}