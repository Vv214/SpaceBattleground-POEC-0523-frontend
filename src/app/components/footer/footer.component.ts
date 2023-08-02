import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private router: Router) {}

  toBuildings() {
    this.router.navigate(['/', 'buildings']);
  }

  toResources() {
    this.router.navigate(['/', 'resources']);
  }

  toResearch() {
    this.router.navigate(['/', 'research']);
  }

  toFleet() {
    this.router.navigate(['/', 'fleet']);
  }

  toShipyard() {
    this.router.navigate(['/', 'shipyard']);
  }

  toAlliance() {
    this.router.navigate(['/', 'alliances']);
  }

  toMarket() {
    this.router.navigate(['/', 'market']);
  }

  overviewRoute() {
    this.router.navigate(['/', 'overview']);
  }

  previousPlanet() {
    // Changer planète
  }

  nextPlanet() {
    // Changer planète
  }
}
