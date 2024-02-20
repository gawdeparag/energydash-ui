import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonthlyOverviewComponent } from './monthly-overview/monthly-overview.component';
import { EnergyChartComponent } from './energy-chart/energy-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthlyOverviewComponent,
    EnergyChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
