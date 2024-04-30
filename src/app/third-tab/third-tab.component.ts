import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { startWith } from 'rxjs/operators'; // import startWith operator

@Component({
  selector: 'app-third-tab',
  imports: [ReactiveFormsModule,CommonModule],
  standalone: true,
  template: `
    <form [formGroup]="form" (ngSubmit)="calculateHeatIndex()">
      <label>
        Temperature:
        <input type="number" formControlName="temperature">
      </label>
      <label>
        Temperature Unit:
        <select formControlName="temperatureUnit">
          <option value="C">°C</option>
          <option value="F">°F</option>
        </select>
      </label>
      <label>
        Relative Humidity (%):
        <input type="number" formControlName="humidity">
      </label>
      <button type="submit">Calculate Heat Index</button>
    </form>
    <p *ngIf="heatIndex">Heat Index: {{ heatIndex }} {{ form.value.temperatureUnit }}</p>
    <h2>History</h2>
    <ul>
      <li *ngFor="let result of history">{{ result }}</li>
    </ul>
  `
})
export class ThirdTabComponent implements OnInit {
  form = new FormGroup({
    temperature: new FormControl(''),
    temperatureUnit: new FormControl('C'),
    humidity: new FormControl('')
  });

  heatIndex: number | null = null;
  history: string[] = JSON.parse(localStorage.getItem('history') || '[]'); // load history from local storage

  ngOnInit() {
    this.form.get('temperatureUnit')?.valueChanges.pipe(
      startWith(this.form.get('temperatureUnit')?.value)
    ).subscribe(() => {
      this.calculateHeatIndex(false); // don't show alert when temperature unit changes
    });
  }

  calculateHeatIndex(showAlert = true) {
    const temperatureValue = this.form.value.temperature;
    const temperatureUnit = this.form.value.temperatureUnit;
    const humidity = Number(this.form.value.humidity);
  
    // only calculate heat index if form controls' values are set
    if (temperatureValue && temperatureUnit && humidity) {
      let temperature = Number(temperatureValue);
  
      if (temperatureUnit === 'C') {
        temperature = temperature * 9/5 + 32; // Convert to Fahrenheit
      }
  
      if (temperature < 80 && showAlert) {
        alert('Heat Index value cannot be calculated for temperatures less than 26.7°C or 80°F.');
        return;
      }
  
      this.heatIndex = -42.379 + (2.04901523 * temperature) + (10.14333127 * humidity)
        - (0.22475541 * temperature * humidity) - (6.83783 * Math.pow(10, -3) * Math.pow(temperature, 2))
        - (5.481717 * Math.pow(10, -2) * Math.pow(humidity, 2)) + (1.22874 * Math.pow(10, -3) * Math.pow(temperature, 2) * humidity)
        + (8.5282 * Math.pow(10, -4) * temperature * Math.pow(humidity, 2)) - (1.99 * Math.pow(10, -6) * Math.pow(temperature, 2) * Math.pow(humidity, 2));
    
      if (temperatureUnit === 'C') {
        this.heatIndex = (this.heatIndex - 32) * 5/9; // Convert back to Celsius
      }

      if (this.heatIndex !== null) {
        this.heatIndex = Number(this.heatIndex.toFixed(2)); // round to 2 decimal places
  
        this.history.unshift(`Heat Index: ${this.heatIndex} ${this.form.value.temperatureUnit}`);
        if (this.history.length > 5) {
          this.history.pop();
        }
        localStorage.setItem('history', JSON.stringify(this.history));
      }
    }
    }
}