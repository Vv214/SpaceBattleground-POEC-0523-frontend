import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PlanetService } from 'src/app/services/planet.service';
import { BuildService } from 'src/app/services/build.service';
import { errorMessage } from '../buildings/buildings.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  // constructor(private router: Router) {}

  activeBuildings = false;
  activeRessources = false;
  activeResearch = false;
  activeFleet = false;
  activeShipyard = false;
  activeAlliance = false;
  showFooter = false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private loginService: LoginService,
    private planetService: PlanetService,
    private buildService: BuildService
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/buildings') {
          this.activeBuildings = true;
          this.activeRessources = false;
          this.activeResearch = false;
          this.activeFleet = false;
          this.activeShipyard = false;
          this.activeAlliance = false;
        } else if (event['url'] == '/resources') {
          this.activeBuildings = false;
          this.activeRessources = true;
          this.activeResearch = false;
          this.activeFleet = false;
          this.activeShipyard = false;
          this.activeAlliance = false;
        } else if (event['url'] == '/research') {
          this.activeBuildings = false;
          this.activeRessources = false;
          this.activeResearch = true;
          this.activeFleet = false;
          this.activeShipyard = false;
          this.activeAlliance = false;
        } else if (event['url'] == '/fleet') {
          this.activeBuildings = false;
          this.activeRessources = false;
          this.activeResearch = false;
          this.activeFleet = true;
          this.activeShipyard = false;
          this.activeAlliance = false;
        } else if (event['url'] == '/shipyard') {
          this.activeBuildings = false;
          this.activeRessources = false;
          this.activeResearch = false;
          this.activeFleet = false;
          this.activeShipyard = true;
          this.activeAlliance = false;
        } else if (event['url'] == '/alliances') {
          this.activeBuildings = false;
          this.activeRessources = false;
          this.activeResearch = false;
          this.activeFleet = false;
          this.activeShipyard = false;
          this.activeAlliance = true;
        } else {
          this.activeBuildings = false;
          this.activeRessources = false;
          this.activeResearch = false;
          this.activeFleet = false;
          this.activeShipyard = false;
          this.activeAlliance = false;
        }
      }
    });
  }

  currentPlanet = 1;
  planetName = '';
  laboratoryLevel = 1;
  public laboratory = 'laboratory';
  public shipyard = 'shipyard';

  openErrorMessage() {
    // this.buildService.
    const dialogRef = this.dialog.open(errorMessage);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  checkShipyardLevel() {
    this.laboratoryLevel = this.buildService.shipyardLevel;
    return this.laboratoryLevel;
  }

  checkLaboratoryLevel() {
    this.laboratoryLevel = this.buildService.laboratoryLevel;

    return this.buildService.laboratoryLevel;
  }

  toBuildings() {
    this.router.navigate(['/', 'buildings']);
  }

  toResources() {
    this.router.navigate(['/', 'resources']);
  }

  toResearch() {
    if (this.buildService.laboratoryLevel == 0) {

      this.buildService.eMessage = 'laboratory';
      this.openErrorMessage();
    } else this.router.navigate(['/', 'research']);
  }

  toFleet() {
    this.router.navigate(['/', 'fleet']);
    console.log(this.checkLaboratoryLevel());
  }

  toShipyard() {
    console.log(this.buildService.shipyardLevel);

    if (this.buildService.shipyardLevel == 0) {
      this.buildService.eMessage = 'shipyard';
      this.openErrorMessage();
    } else this.router.navigate(['/', 'shipyard']);
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

  updatePlanetNameInUI() {
    this.planetName = this.planetService.planetList[this.planetService.planetId].name;
    return this.planetName;
  }

  previousPlanet() {
    // Changer planète
    this.currentPlanet = this.currentPlanet - 1;
    if (this.currentPlanet < 1) {
      this.currentPlanet = 10;
      // this.planetService.planetName = planets.data[planetName].name;
    }
    this.planetService.planetId = this.currentPlanet - 1;
  }

  nextPlanet() {
    // Changer planète
    this.currentPlanet = this.currentPlanet + 1;
    if (this.currentPlanet > 10) {
      this.currentPlanet = 1;
      // this.planetService.planetName = planets.data[planetName].name;
    }
    this.planetService.planetId = this.currentPlanet - 1;
  }
}
