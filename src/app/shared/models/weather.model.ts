import { Temperature } from './temperature.model';

export interface Weather{

    weatherText: string;
    temperature: {
        metric: Temperature,
        imperial: Temperature
    };
}