import { Component, OnInit } from '@angular/core';
import { PlanetService } from 'src/app/services/planet.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})

export class OverviewComponent implements OnInit {
  constructor (private planetService: PlanetService){}
  public token!: string;

  currentPlanet = 1;

  updatePlanetInUI(){
    this.currentPlanet = this.planetService.planetId +1;
    return this.currentPlanet
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('x-token') ?? '';
    this.currentPlanet = this.planetService.planetId +1;

  }
}

