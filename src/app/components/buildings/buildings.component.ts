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
    drill: Building;
  };
}

export interface Building {
  name: string;
  type: string;
  description: string;
  level: number;
  ironPrice: number;
  diamondPrice: number;
  hydrogenePrice: number;
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

  public robotFactoryName!: string;
  public laboratoryName!: string;
  public shipyardName!: string;
  public terraformeurName!: string;

  public robotFactoryLevel!: number;
  public laboratoryLevel!: number;
  public shipyardLevel!: number;
  public terraformeurLevel!: number;
  // public name!: string | null;
  // public type!: string | null;
  // public description!: string | null;
  // public ironPrice!: number;
  // public diamondPrice!: number;
  // public hydrogenePrice!: number;
  // public energyPrice!: number;
  constructor(public dialog: MatDialog, public buildService: BuildService) {}

  openBuildingDetail() {
    const dialogRef = this.dialog.open(buildingDetail);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  checkBuildingInfo(token: string) {
    this.buildService.checkBuildingInfo(token).then((response) => {
      if (response.status === 200) {
        response.json().then((body: Buildings) => {
          console.log("mon body ", body);
          localStorage.setItem('buildings', JSON.stringify(body));
        });
      }
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('x-token') ?? '';
    this.checkBuildingInfo(this.token);
    let buildings: Buildings = JSON.parse(localStorage.getItem('buildings') ?? '');
    // this.ironMineName = buildings.data.ironMine.name;
    // this.diamondMine = buildings.data.diamondMine.name;
    // this.hydrogeneMine = buildings.data.hydrogeneMine.name;
    // this.energyMine = buildings.data.energyMine.name;

    // this.robotFactoryName = buildings.data.robotFactory.name;
    this.laboratoryName = buildings.data.laboratory.name.toString();
    // this.shipyardName = buildings.data.shipyard.name;
    // this.terraformeurName = buildings.data.drill.name;

    // this.robotFactoryLevel = buildings.data.robotFactory.level;
    this.laboratoryLevel = buildings.data.laboratory.level;
    // this.shipyardLevel = buildings.data.shipyard.level;
    // this.terraformeurLevel = buildings.data.drill.level;
    console.log(this.laboratoryLevel + "labo name: " + this.laboratoryName);
    //+(localStorage.getItem('ressources').diamond.quantity ?? 0);
    // this.hydrogene = ressources.data.hydrogene.quantity;
    // this.energy = ressources.data.energy.quantity;
  }
}

@Component({
  selector: 'buildingDetail',
  templateUrl: 'buildingDetail.html',
  styleUrls: ['buildingDetail.scss'],
})
export class buildingDetail {
  constructor(public dialog: MatDialog, public router: Router, private buildService: BuildService) {}

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
