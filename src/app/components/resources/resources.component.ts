import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { buildingBuild } from '../buildings/buildings.component';
import { buildingDestroy } from '../buildings/buildings.component';
import { buildingDetail } from '../buildings/buildings.component';
import { BuildService } from 'src/app/services/build.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit {
  // isBuilt = true;
  public token!: string;
  public ironMineName!: string;
  public diamondMineName!: string;
  public hydrogeneMineName!: string;
  public energyMineName!: string;
  public ironStock!: string;
  public hydrogeneStock!: string;
  public diamondStock!: string;
  public drillingMachine!: string;
  public ironMineLevel!: number;
  public diamondMineLevel!: number;
  public hydrogeneMineLevel!: number;
  public energyMineLevel!: number;
  public ironStockLevel!: number;
  public hydrogeneStockLevel!: number;
  public diamondStockLevel!: number;
  public drillingMachineLevel!: number;
  constructor(public dialog: MatDialog, public buildService: BuildService) {}

  // openUpgrade() {
  //   const dialogRef = this.dialog.open(Upgrade);
  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  openBuildingDetail(buildingName: string) {
    console.log(this.ironMineName + ' : labo name: ');

    // let buildings: Buildings = JSON.parse(localStorage.getItem('buildings') ?? '');
    if (buildingName == 'ironMine') {
      this.buildService.buildingName = this.ironMineName;
    } else if (buildingName == 'diamondMine') {
      this.buildService.buildingName = this.diamondMineName;
    } else if (buildingName == 'hydrogeneMine') {
      this.buildService.buildingName = this.hydrogeneMineName;
    } else if (buildingName == 'energyMine') {
      this.buildService.buildingName = this.energyMineName;
    }
    const dialogRef = this.dialog.open(buildingDetail);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // openBuildingBuild() {
  //   const dialogRef = this.dialog.open(buildingBuild);
  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
  ngOnInit() {
    this.token = localStorage.getItem('x-token') ?? '';
    // let buildings: Buildings = JSON.parse(localStorage.getItem('buildings') ?? '');
    this.ironMineName = JSON.parse(localStorage.getItem('buildings') ?? ' ').data.ironMine.name.toString();
    this.diamondMineName = JSON.parse(localStorage.getItem('buildings') ?? ' ').data.diamondMine.name.toString();
    this.hydrogeneMineName = JSON.parse(localStorage.getItem('buildings') ?? ' ').data.hydrogeneMine.name.toString();
    this.energyMineName = JSON.parse(localStorage.getItem('buildings') ?? ' ').data.energyMine.name.toString();
    this.ironMineLevel = JSON.parse(localStorage.getItem('buildings') ?? ' ').data.ironMine.level.toString();
    this.diamondMineLevel = JSON.parse(localStorage.getItem('buildings') ?? ' ').data.diamondMine.level.toString();
    this.hydrogeneMineLevel = JSON.parse(localStorage.getItem('buildings') ?? ' ').data.hydrogeneMine.level.toString();
    this.energyMineLevel = JSON.parse(localStorage.getItem('buildings') ?? ' ').data.energyMine.level.toString();
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

  // upgradeBuilding() {
  //   // upgrade building with userID
  // }

  // openBuildingDestroy() {
  //   const dialogRef = this.dialog.open(buildingDestroy);
  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
}
