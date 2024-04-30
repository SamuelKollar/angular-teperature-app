import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-first-tab',
  standalone: true,
  imports: [MatTableModule,CommonModule],
  templateUrl: './first-tab.component.html',
  styleUrl: './first-tab.component.css',
})

export class FirstTabComponent{
  weatherData: any = {};
  displayedColumns: string[] = ['time', 'temperature2m', 'relativeHumidity2m', 'weatherCode', 'surfacePressure'];
  tableData: any[] = [];

  constructor(private weatherService: WeatherService) { }

  async ngOnInit() {
    this.weatherData = await this.weatherService.getWeather();
    this.tableData = this.weatherData.hourly.time.map((time: any, index: number) => {
      return {
        time: time,
        temperature2m: this.weatherData.hourly.temperature2m[index],
        relativeHumidity2m: this.weatherData.hourly.relativeHumidity2m[index],
        weatherCode: this.weatherData.hourly.weatherCode[index],
        surfacePressure: this.weatherData.hourly.surfacePressure[index]
      };
    });
  }
}