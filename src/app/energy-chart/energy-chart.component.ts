import { Component, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-energy-chart',
  templateUrl: './energy-chart.component.html',
  styleUrls: ['./energy-chart.component.css']
})
export class EnergyChartComponent implements AfterViewInit {
  @ViewChild('energyChart') energyChartElement!: ElementRef;
  private chart!: Chart;

  monthlyEnergyConsumed: number[] = [];
  monthlyEnergyGenerated: number[] = [];
  timestamp: Date[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.getMonthlyEnergyStatistics();
      }, 0);
    }
  }

  getMonthlyEnergyStatistics(): any {
    this.http.get<any>('http://localhost:3000').subscribe((data) => {
      for (let i = 0; i < data.data.length; i++) {
        this.monthlyEnergyConsumed.push(data.data[i].energyConsumed); 
        this.monthlyEnergyGenerated.push(data.data[i].energyGenerated);
        this.timestamp.push(data.data[i].timestamp);
      }
      this.createChart(this.timestamp, this.monthlyEnergyGenerated, this.monthlyEnergyConsumed);
      return {
        monthlyEnergyConsumed: this.monthlyEnergyConsumed,
        monthlyEnergyGenerated: this.monthlyEnergyGenerated, 
        timestamp: this.timestamp
      }
    });
  }

  createChart(date: Date[], energyGenerated: number[], energyConsumed: number[]) {
    const ctx = this.energyChartElement.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: date,
        datasets: [
          {
            label: 'Energy Generation',
            data: energyGenerated,
            borderColor: 'rgba(75, 192, 192, 1)',
            // backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            tension: 0.4
          },
          {
            label: 'Energy Consumption',
            data: energyConsumed,
            borderColor: 'rgba(255, 99, 132, 1)',
            // backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
            tension: 0.4
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
            reverse: false,
            beginAtZero: true
          },
          y: {
            grid: {
              display: false,
            },
            reverse: false,
            beginAtZero: true
          },
        },
      },
    });
  }
}
