import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss'],
})
export class BuildingsComponent {
  constructor(public dialog: MatDialog) {}

  openBuildingDetail() {
    const dialogRef = this.dialog.open(buildingDetail);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openBuildingBuild() {
    const dialogRef = this.dialog.open(buildingBuild);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'buildingDetail',
  templateUrl: 'buildingDetail.html',
  styleUrls: ['buildingDetail.css'],
})
export class buildingDetail {}

@Component({
  selector: 'buildingBuild',
  templateUrl: 'buildingBuild.html',
  styleUrls: ['buildingBuild.css'],
})
export class buildingBuild {}
