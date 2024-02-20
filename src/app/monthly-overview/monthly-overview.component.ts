import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-overview',
  templateUrl: './monthly-overview.component.html',
  styleUrl: './monthly-overview.component.css'
})

// code for the Monthly Overview Component
export class MonthlyOverviewComponent implements OnInit {

  monthlyEnergyConsumed: number = 0;
  monthlyEnergyGenerated: number = 0;
  monthlyExportableEnergy: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() : void {
    this.getMonthlyEnergyStatistics();
  }
  
  getMonthlyEnergyStatistics(): any {
    this.http.get<any>('http://localhost:3000').subscribe((data) => {
      for (let i = 0; i < data.data.length; i++) {
        this.monthlyEnergyConsumed += data.data[i].energyConsumed; 
        this.monthlyEnergyGenerated += data.data[i].energyGenerated;
        this.monthlyExportableEnergy += data.data[i].exportableEnergy;
      }
      return {
        monthlyEnergyConsumed: this.monthlyEnergyConsumed,
        monthlyEnergyGenerated: this.monthlyEnergyGenerated,
        monthlyExportableEnergy: this.monthlyExportableEnergy
      }
    });


  }

}
