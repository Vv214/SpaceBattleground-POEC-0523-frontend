import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss'],
})
export class FleetComponent {
  constructor(public dialog: MatDialog) {}

  modifyFleet() {
    const dialogRef = this.dialog.open(modifyFleet);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openShipDetail() {
    const dialogRef = this.dialog.open(shipDetail);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'modifyFleet',
  templateUrl: 'modifyFleet.html',
  styleUrls: ['modifyFleet.scss'],
})
export class modifyFleet {}

@Component({
  selector: 'shipDetail',
  templateUrl: 'shipDetail.html',
  styleUrls: ['shipDetail.scss'],
})
export class shipDetail {
  constructor(public dialog: MatDialog) {}

  openShipBuild() {
    const dialogRef = this.dialog.open(shipBuild);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'shipBuild',
  templateUrl: 'shipBuild.html',
  styleUrls: ['shipBuild.scss'],
})
export class shipBuild {
  constructor(public dialog: MatDialog) {}
}
