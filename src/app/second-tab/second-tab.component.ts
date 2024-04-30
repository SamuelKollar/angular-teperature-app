import { Component, ViewChild } from "@angular/core";
import { WeatherService } from '../weather.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  NgApexchartsModule
} from "ng-apexcharts";
import { CommonModule } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: "app-second-tab",
  templateUrl: "./second-tab.component.html",
  styleUrls: ["./second-tab.component.css"],
  standalone: true,
  imports: [NgApexchartsModule,CommonModule]
})

export class SecondTabComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;
  public loading = true;

  ngAfterViewInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

  constructor(private weatherService: WeatherService) {
    this.chartOptions = {
      series: [
        {
          name: "Temperature",
          data: [0]
        }
      ] as ApexAxisChartSeries,
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      } as ApexChart,
      dataLabels: {
        enabled: false
      } as ApexDataLabels,
      stroke: {
        curve: "straight",
        colors: ["#C2185A"]
      } as ApexStroke,
      title: {
        text: "Temperature Trends by Hour",
        align: "left"
      } as ApexTitleSubtitle,
      grid: {
        row: {
          colors: ["transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      } as ApexGrid,
      xaxis: {
        categories: ['']
      } as ApexXAxis,
    };
  }

  async ngOnInit() {
    const weatherData = await this.weatherService.getWeather();

    if (weatherData.hourly && weatherData.hourly.time && weatherData.hourly.temperature2m) {
      const timeStrings = weatherData.hourly.time.map((time: any) => {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are 0-based in JavaScript
        const day = date.getDate();
        const hour = date.getHours();
        return `${year}-${month}-${day} ${hour}:00`;
      });
      const temperatureData = Array.from(weatherData.hourly.temperature2m).map((temp: number) => parseFloat(temp.toFixed(2)));
      if (this.chartOptions.xaxis) {
        this.chartOptions.xaxis.categories = timeStrings;
      }
      if (this.chartOptions.series && this.chartOptions.series[0]) {
        this.chartOptions.series[0].data = temperatureData;
      }
      
      this.loading = false;
      console.log(timeStrings);
    }
  }
}