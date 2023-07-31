import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { shipDetail } from '../fleet/fleet.component';

@Component({
  selector: 'app-shipyard',
  templateUrl: './shipyard.component.html',
  styleUrls: ['./shipyard.component.scss'],
})
export class ShipyardComponent {
  constructor(public dialog: MatDialog) {}

  openShipDetail() {
    const dialogRef = this.dialog.open(shipDetail);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

// @Component({
//   selector: 'shipDetails',
//   templateUrl: '../fleet/shipDetail.html',
//   styleUrls: ['../fleet/shipDetail.css'],
// })
// export class shipDetail {}
