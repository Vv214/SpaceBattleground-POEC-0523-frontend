import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { buildingBuild } from '../buildings/buildings.component';
import { buildingDestroy } from '../buildings/buildings.component';
import { buildingDetail } from '../buildings/buildings.component';
import { BuildService } from 'src/app/services/build.service';

export interface Buildings {
  data: {
    ironMine: Building;
    diamondMine: Building;
    hydrogenMine: Building;
    energyMine: Building;

    ironStockage: Building;
    diamondStockage: Building;
    hydrogenStockage: Building;
    drillingMachine: Building;

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
  isBuild: boolean;

  timeToBuild: Date;
  timeToStart: Date;
}

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit {
  constructor(public dialog: MatDialog, public buildService: BuildService) {}
  isBuilt = true;
  public token!: string;
  public ironMine = 'ironMine';
  public diamondMine = 'diamondMine';
  public hydrogenMine = 'hydrogenMine';
  public energyMine = 'energyMine';

  public ironStockage = 'ironStockage';
  public diamondStockage = 'diamondStockage';
  public hydrogenStockage = 'hydrogenStockage';
  public drillingMachine = 'drillingMachine';

  public ironMineLevel!: number;
  public hydrogenMineLevel!: number;
  public diamondMineLevel!: number;
  public energyMineLevel!: number;
  public ironStockageLevel!: number;
  public hydrogenStockageLevel!: number;
  public diamondStockageLevel!: number;
  public drillingMachineLevel!: number;

  openBuildingDetail(buildingName: string) {
    let buildings: Buildings = JSON.parse(localStorage.getItem('buildings') ?? '');
    this.buildService.buildingName = buildings.data[buildingName].name.toString();
    this.buildService.buildingType = buildings.data[buildingName].type.toString();
    this.buildService.buildingLevel = buildings.data[buildingName].level;
    this.buildService.buildingDescription = buildings.data[buildingName].description.toString();
    this.buildService.buildingIronPrice = buildings.data[buildingName].ironPrice;
    this.buildService.buildingDiamondPrice = buildings.data[buildingName].diamondPrice;
    this.buildService.buildingHydrogenPrice = buildings.data[buildingName].hydrogenPrice;
    this.buildService.buildingEnergyPrice = buildings.data[buildingName].energyPrice;
    this.buildService.buildingNameSrc = buildingName;
    this.buildService.buildingIsBuild = buildings.data[buildingName].isBuild;

    // this.buildService.buildingCapacity = buildings.data[buildingName].capacity;

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
    this.ironMineLevel = buildings.data.ironMine.level;
    this.hydrogenMineLevel = buildings.data.hydrogenMine.level;
    this.diamondMineLevel = buildings.data.diamondMine.level;
    this.energyMineLevel = buildings.data.energyMine.level;
    this.ironStockageLevel = buildings.data.ironStockage.level;
    this.hydrogenStockageLevel = buildings.data.hydrogenStockage.level;
    this.diamondStockageLevel = buildings.data.diamondStockage.level;
    this.drillingMachineLevel = buildings.data.drillingMachine.level;
  }
}
@Component({
  selector: 'upgrade',
  templateUrl: 'upgrade.html',
  styleUrls: ['upgrade.scss'],
})
export class Upgrade {
  constructor(public dialog: MatDialog) {}
  isBuilt = true;

}
