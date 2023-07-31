import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class ResearchComponent {
  constructor(public dialog: MatDialog) {}

  openTechnologyTree() {
    const dialogRef = this.dialog.open(TechnologyTree);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openResearchDetail() {
    const dialogRef = this.dialog.open(researchDetail);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'TechnologyTree',
  templateUrl: 'TechnologyTree.html',
  styleUrls: ['TechnologyTree.scss'],
})
export class TechnologyTree {
  spaceSearch = true;
  mineSearch = false;
  militarySearch = false;

  switchToSpaceSearch() {
    this.spaceSearch = true;
    this.mineSearch = false;
    this.militarySearch = false;
  }
  switchToMineSearch() {
    this.spaceSearch = false;
    this.mineSearch = true;
    this.militarySearch = false;
  }
  switchToMilitarySearch() {
    this.spaceSearch = false;
    this.mineSearch = false;
    this.militarySearch = true;
  }
}

@Component({
  selector: 'researchDetail',
  templateUrl: 'researchDetail.html',
  styleUrls: ['researchDetail.css'],
})
export class researchDetail {}
