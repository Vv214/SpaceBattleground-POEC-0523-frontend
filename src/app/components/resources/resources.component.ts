import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent {
  constructor(public dialog: MatDialog) {}

  openUpgrade() {
    const dialogRef = this.dialog.open(Upgrade);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'upgrade',
  templateUrl: 'upgrade.html',
  styleUrls: ['upgrade.css'],
})
export class Upgrade {}
