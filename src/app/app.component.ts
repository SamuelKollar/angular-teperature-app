import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { FirstTabComponent } from './first-tab/first-tab.component';
import { SecondTabComponent } from './second-tab/second-tab.component';
import { ThirdTabComponent } from './third-tab/third-tab.component';
import { NgApexchartsModule } from "ng-apexcharts";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatTabsModule,CanvasJSAngularChartsModule,FirstTabComponent,SecondTabComponent,ThirdTabComponent,NgApexchartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
})

export class AppComponent {
  title = 'Entry task for UI Developer';
}
