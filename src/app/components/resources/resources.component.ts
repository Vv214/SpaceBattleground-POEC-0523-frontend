import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { buildingBuild } from '../buildings/buildings.component';
import { buildingDestroy } from '../buildings/buildings.component';
import { buildingDetail } from '../buildings/buildings.component';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  isBuilt = true;
  public token!: string;

  // openUpgrade() {
  //   const dialogRef = this.dialog.open(Upgrade);
  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  openBuildingDetail() {
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


  };
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
