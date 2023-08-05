import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ResearchService } from '../../services/research.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class ResearchComponent implements OnInit {

  public token!: string;

  constructor(public dialog: MatDialog, public researchService: ResearchService) {}

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

  getResearchInfo(token: string) {
    this.researchService.getResearchInfo(this.token);
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('x-token') ?? '';
    this.getResearchInfo(this.token);

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
  styleUrls: ['researchDetail.scss'],
})
export class researchDetail {
  isBuilt = true;
  ferJoueur = 2000;
  hydrogeneJoueur = 2000;
  diamantJoueur = 2000;
  ferRequis = 200;
  hydrogeneRequis = 200;
  diamantRequis = 200;

  validateResearch() {
    if (
      this.ferJoueur > this.ferRequis &&
      this.hydrogeneJoueur > this.hydrogeneRequis &&
      this.diamantJoueur > this.diamantRequis
    ) {
      this.ferJoueur = this.ferJoueur - this.ferRequis;
      this.hydrogeneJoueur = this.hydrogeneJoueur - this.hydrogeneRequis;
      this.diamantJoueur = this.diamantJoueur - this.diamantRequis;

      // if (recherche.isdone = false) {
      // timer recherche
      // recherche.isdone = true;
      // } else if (recherche.level < 5){
      // timer recherche
      // recherche.level = recherche.level +1;
      // }
      // if recherche.level = 5 -> disabled
    }
  }
}
