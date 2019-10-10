import { Temperature } from './temperature.model';


export interface Forecasts{
    date: string;
    temperature: {
        minimum: Temperature,
        maximum: Temperature
    }
}

