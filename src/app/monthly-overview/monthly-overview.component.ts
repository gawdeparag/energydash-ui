import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-monthly-overview',
  templateUrl: './monthly-overview.component.html',
  styleUrl: './monthly-overview.component.css'
})

// code for the Monthly Overview Component
export class MonthlyOverviewComponent { 

  energyStatisticsData!: any[];
  constructor(private http: HttpClient) { 
    // get energy statistics data from http://localhost:8000/energyStatistics/{userId}
    this.http.get<any>('http://localhost:8000/energyStatistics/{userId}').subscribe((data: any[]) => {
      this.energyStatisticsData = data;
    });
  }

}
