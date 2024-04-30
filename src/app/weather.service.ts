import { Injectable } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';

@Injectable({
  providedIn: 'root',
})

export class WeatherService {
  async getWeather() {
    const params = {
      "latitude": 51.5085,
      "longitude": -0.1257,
      "hourly": ["temperature_2m", "relative_humidity_2m", "weather_code", "surface_pressure"],
      "past_days": 7
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly()!;

    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const weatherData = {
      hourly: {
        time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        temperature2m: hourly.variables(0)!.valuesArray()!,
        relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
        weatherCode: hourly.variables(2)!.valuesArray()!,
        surfacePressure: hourly.variables(3)!.valuesArray()!,
      },
    };

    return weatherData;
  }
}