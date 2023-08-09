import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewService } from 'src/app/services/overview.service';

export interface Constructions {
  diamondStockage: Construction;
  energyMine: Construction;
  laboratory: Construction;
  ironMine: Construction;
  diamondMine: Construction;
  ironStockage: Construction;
  terraformer: Construction;
  shipyard: Construction;
  robotFactory: Construction;
  hydrogenStockage: Construction;
  hydrogenMine: Construction;
  drillingMachine: Construction;
}

export interface Construction {
  name: String;
  type: String;
  level: number;
  description: String;
  coeff_prod: number;
  ironPrice: number;
  diamondPrice: number;
  hydrogenPrice: number;
  energyPrice: number;
  isBuild: boolean;
  timeBuilding: Date;
  timeToStart: Date;
}

export interface Research {

}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  @NgModule({
    imports: [CommonModule],
  })
  public token!: string;
  public constructions!: any;
  public chrono!: number;
  public timer: any;
  public displayTime!: string;
  public currentDate: Date = new Date();

  constructor(public overviewService: OverviewService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('x-token') ?? '';
    this.getConstruction(this.token);
    this.constructions = JSON.parse(localStorage.getItem('constructions') ?? '').data;
    console.log(this.constructions);
  }

  getConstruction(token: string) {
    this.overviewService.getConstruction(token).then((response) => {
      if (response.status === 200) {
        response.json().then((body: Constructions) => {
          localStorage.setItem('constructions', JSON.stringify(body));
        });
      }
    });
  }

  getResearch(token: string) {
    this.overviewService.getResearch(token).then((response) => {
      if (response.status === 200) {
        response.json().then((body: Research) => {
          localStorage.setItem('recherches', JSON.stringify(body));
        });
      }
    });
  }

  getObjectProperty(obj: any): string[] {
    return Object.keys(obj);
  }

  startCounter(endTime: any) {
    const endDate = new Date(endTime);

    const offsetMilliseconds = this.currentDate.getTimezoneOffset() * 60 * 1000;

    let chrono = endDate.getTime() - this.currentDate.getTime() - offsetMilliseconds;

    this.timer = setInterval(() => {
      if (chrono > 0) {
        this.displayTime = this.convertToMMSS(chrono);
      } else {
        clearInterval(this.timer);
        this.displayTime = 'Terminé';
      }
    }, 1000);

    return this.displayTime;
  }

  convertToMMSS(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = this.padNumber(minutes, 2);
    const formattedSeconds = this.padNumber(seconds, 2);

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  padNumber(number: number, length: number): string {
    return number.toString().length < length
      ? (new Array(length + 1).join('0') + number).slice(-length)
      : number.toString();
  }

}
