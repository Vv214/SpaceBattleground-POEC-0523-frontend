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

  shipDetail() {
    const dialogRef = this.dialog.open(shipDetail);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'modifyFleet',
  templateUrl: 'modifyFleet.html',
  styleUrls: ['modifyFleet.css'],
})
export class modifyFleet {}

@Component({
  selector: 'shipDetail',
  templateUrl: 'shipDetail.html',
  styleUrls: ['shipDetail.css'],
})
export class shipDetail {}
