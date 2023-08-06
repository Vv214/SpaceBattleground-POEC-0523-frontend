import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BuildService } from 'src/app/services/build.service';
import { OnInit } from '@angular/core';

export interface Buildings {
  data: {
    ironMine: Building;
    diamondMine: Building;
    hydrogeneMine: Building;
    energyMine: Building;

    laboratory: Building;
    robotFactory: Building;
    shipyard: Building;
    terraformer: Building;

    [buildingName: string]: Building;
  };
}

export interface Building {
  name: string;
  type: string;
  description: string;
  level: number;
  ironPrice: number;
  diamondPrice: number;
  hydrogenPrice: number;
  energyPrice: number;
  timeToBuild: Date;
  timeToStart: Date;
}

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss'],
})
export class BuildingsComponent implements OnInit {
  public token!: string;
  public ironMineName!: string;
  public diamondMine!: string;
  public hydrogeneMine!: string;
  public energyMine!: string;

  public robotFactory = 'robotFactory';
  public laboratory = 'laboratory';
  public shipyard = 'shipyard';
  public terraformer = 'terraformer';

  public robotFactoryName!: string;
  public laboratoryName!: string;
  public shipyardName!: string;
  public terraformeurName!: string;

  public robotFactoryType!: string;
  public laboratoryType!: string;
  public shipyardType!: string;
  public terraformeurType!: string;

  public robotFactoryDescription!: string;
  public laboratoryDescription!: string;
  public shipyardDescription!: string;
  public terraformeurDescription!: string;

  public robotFactoryLevel!: number;
  public laboratoryLevel!: number;
  public shipyardLevel!: number;
  public terraformeurLevel!: number;
  constructor(public dialog: MatDialog, public buildService: BuildService) {}

  openBuildingDetail(buildingName: string) {
    console.log(this.laboratoryLevel + ' labo name: ' + this.laboratoryName);

    let buildings: Buildings = JSON.parse(localStorage.getItem('buildings') ?? '');
    this.buildService.buildingName = buildings.data[buildingName].name.toString();
    this.buildService.buildingType = buildings.data[buildingName].type.toString();
    this.buildService.buildingLevel = buildings.data[buildingName].level;
    this.buildService.buildingDescription = buildings.data[buildingName].description.toString();
    // this.buildService.buildingCapacity = buildings.data[buildingName].capacity;
    this.buildService.buildingIronPrice = buildings.data[buildingName].ironPrice;
    this.buildService.buildingDiamondPrice = buildings.data[buildingName].diamondPrice;
    this.buildService.buildingHydrogenPrice = buildings.data[buildingName].hydrogenPrice;
    this.buildService.buildingEnergyPrice = buildings.data[buildingName].energyPrice;
    const dialogRef = this.dialog.open(buildingDetail);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  checkBuildingInfo(token: string) {
    this.buildService.checkBuildingInfo(token).then((response) => {
      if (response.status === 200) {
        response.json().then((body: Buildings) => {
          console.log('mon body ', body);
          localStorage.setItem('buildings', JSON.stringify(body));
        });
      }
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('x-token') ?? '';
    this.checkBuildingInfo(this.token);
    let buildings: Buildings = JSON.parse(localStorage.getItem('buildings') ?? '');
    this.robotFactoryLevel = buildings.data.robotFactory.level;
    this.laboratoryLevel = buildings.data.laboratory.level;
    this.shipyardLevel = buildings.data.shipyard.level;
    this.terraformeurLevel = buildings.data.terraformer.level;
  }
}

@Component({
  selector: 'buildingDetail',
  templateUrl: 'buildingDetail.html',
  styleUrls: ['buildingDetail.scss'],
})
export class buildingDetail {
  constructor(public dialog: MatDialog, public router: Router, private buildService: BuildService) {}

  public buildingName!: string;
  public buildingType!: string;
  public buildingLevel!: number;
  public buildingDescription!: string;
  public buildingCapacity!: string;
  public buildingIronPrice!: number;
  public buildingDiamondPrice!: number;
  public buildingHydrogenePrice!: number;
  public buildingEnergyPrice!: number;
  public token!: string;

  openBuildingBuild() {
    const dialogRef = this.dialog.open(buildingBuild);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  isBuilt = true;
  chantier = false;

  openBuildingDestroy() {
    const dialogRef = this.dialog.open(buildingDestroy);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toShipyard() {
    this.router.navigate(['/', 'shipyard']);
  }

  checkBuildingInfo(token: string) {
    this.buildService.checkBuildingInfo(token).then((response) => {
      if (response.status === 200) {
        response.json().then((body: Buildings) => {
          console.log('mon body ', body);
          localStorage.setItem('buildings', JSON.stringify(body));
        });
      }
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('x-token') ?? '';
    this.checkBuildingInfo(this.token);
    let buildings: Buildings = JSON.parse(localStorage.getItem('buildings') ?? '');
    console.log('building', this.buildService.buildingName);
    this.buildingName = this.buildService.buildingName.toString();
    this.buildingType = this.buildService.buildingType.toString();
    this.buildingLevel = this.buildService.buildingLevel;
    this.buildingDescription = this.buildService.buildingDescription.toString();
    // this.buildingCapacity = this.buildService.buildingCapacity.toString();
    this.buildingIronPrice = this.buildService.buildingIronPrice;
    this.buildingDiamondPrice = this.buildService.buildingDiamondPrice;
    this.buildingHydrogenePrice = this.buildService.buildingHydrogenPrice;
    this.buildingEnergyPrice = this.buildService.buildingEnergyPrice;

    // this.diamondMine = buildings.data.diamondMine.name;
    // this.hydrogeneMine = buildings.data.hydrogeneMine.name;
    // this.energyMine = buildings.data.energyMine.name;

    // this.robotFactoryName = buildings.data.robotFactory.name;
    // this.laboratoryName = buildings.data.laboratory.name.toString();
    // this.shipyardName = buildings.data.shipyard.name;
    // this.terraformeurName = buildings.data.drill.name;

    // this.robotFactoryLevel = buildings.data.robotFactory.level;
    // this.laboratoryLevel = buildings.data.laboratory.level;
    // this.shipyardLevel = buildings.data.shipyard.level;
    // this.terraformeurLevel = buildings.data.drill.level;
    // console.log(this.laboratoryLevel + ' labo name: ' + this.laboratoryName);
    //+(localStorage.getItem('ressources').diamond.quantity ?? 0);
    // this.hydrogene = ressources.data.hydrogene.quantity;
    // this.energy = ressources.data.energy.quantity;
  }
}

@Component({
  selector: 'buildingBuild',
  templateUrl: 'buildingBuild.html',
  styleUrls: ['buildingBuild.scss'],
})
export class buildingBuild implements OnInit {
  constructor(public dialog: MatDialog, public router: Router, private buildService: BuildService) {}
  public token!: string;
  // ferJoueur = 2000;
  // hydrogeneJoueur = 2000;
  // diamantJoueur = 2000;
  // ferRequis = 200;
  // hydrogeneRequis = 200;
  // diamantRequis = 200;

  buildBuilding(token: string) {
    console.log(token);
    this.buildService.buildBuilding(token).then((response) => {
      if (response.status === 200) {
        console.log('building created');
      } else {
        console.log(token + ' failed token');
      }
    });
  }

  ngOnInit() {
    this.token = localStorage.getItem('x-token') ?? '';
  }

  // buildBuilding() {
  //   // create building with userID

  //   // batiment = currentPlayer.batiment

  //   if (
  //     this.ferJoueur > this.ferRequis &&
  //     this.hydrogeneJoueur > this.hydrogeneRequis &&
  //     this.diamantJoueur > this.diamantRequis
  //   ) {
  //     this.ferJoueur = this.ferJoueur - this.ferRequis;
  //     this.hydrogeneJoueur = this.hydrogeneJoueur - this.hydrogeneRequis;
  //     this.diamantJoueur = this.diamantJoueur - this.diamantRequis;
  //     // timer batiment
  //     // post batiment
  //     // batiment.isBuilt = true;
  //   }
  // }

  isBuilt = true;
  upgradeBuilding() {
    // upgrade building with userID
  }
}

@Component({
  selector: 'buildingDestroy',
  templateUrl: 'buildingDestroy.html',
  styleUrls: ['buildingDestroy.scss'],
})
export class buildingDestroy {
  destroyBuilding() {
    // delete building with userID
    // batiment = currentPlayer.batiment
    //delete batiment
    // ferJoueur = ferJoueur + ferRequis/10;
    // hydrogeneJoueur = hydrogeneJoueur + hydrogeneRequis/10;
    // diamantJoueur = diamantJoueur + diamantRequis/10;
  }
}
