import { Temperature } from './temperature.model';

export interface WeatherResponse{

    WeatherText: string;
    Temperature: {
        Metric: {
            Unit: string,
            Value: number,
            UnitType: number
        },
        Imperial: {
            Unit: string,
            Value: number,
            UnitType: number
        }
    };
}

