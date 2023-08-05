import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ResearchService } from '../../services/research.service';

export interface Researchs {
  data: {
    Technologie_cargo: Research;
    "Réacteur à combustion": Research
  }
}
export interface Research {
  name: string;
  description: string;
  ironPrice: number;
  diamondPrice: number;
  hydrogenPrice: number;
  energyPrice: number;
  level: number;
  coef_modifier: number;
  timeSearch: Date;
  timeToStart: Date;
  isDone: boolean;
}
@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class ResearchComponent implements OnInit {
  public token!: string;

  public cargoAmeliore!: Research;
  public cargoAmelioreLvl!: number;
  public name!: string;
  public description!: string;
  public ironPrice!: number;
  public diamondPrice!: number;
  public hydrogenPrice!: number;
  public energyPrice!: number;
  public level!: number;
  public coef_modifier!: number;
  public timeSearch!: Date;
  public timeToStart!: Date;
  public isDone!: boolean;

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
    this.researchService.getResearchInfo(token).then((response) => {
      if (response.status === 200) {
        response.json().then((body: Researchs) => {
          console.log("mon body ", body);
          localStorage.setItem('researchs', JSON.stringify(body));
        });
      }
    });
    // let researchs: Researchs = JSON.parse(localStorage.getItem('researchs') ?? '');
    // console.log("dans getResearch : ", +researchs.data.Technologie_cargo.diamondPrice);
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('x-token') ?? '';
    this.getResearchInfo(this.token);
    let researchs: Researchs = JSON.parse(localStorage.getItem('researchs') ?? '');
    this.cargoAmelioreLvl = researchs.data.Technologie_cargo.level;
    console.log("dans on init : ", this.cargoAmelioreLvl);
    // let
  }
}

@Component({
  selector: 'TechnologyTree',
  templateUrl: 'TechnologyTree.html',
  styleUrls: ['TechnologyTree.scss'],
})
export class TechnologyTree {
  @Input() cargoAmelioreLvl!: number;
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
  // let researchs: Researchs = JSON.parse(localStorage.getItem('researchs') ?? '');
  // this.cargoAmelioreLvl = researchs.data.Technologie_cargo.level;
  @Input()
  cargoAmelioreLvl!: number;
  isBuilt = true;
  ferJoueur = 2000;
  hydrogeneJoueur = 2000;
  diamantJoueur = 2000;
  ferRequis = 200;
  hydrogeneRequis = 200;
  diamantRequis = 200;

  validateResearch() {
    let researchs: Researchs = JSON.parse(localStorage.getItem('researchs') ?? '');
    this.cargoAmelioreLvl = researchs.data.Technologie_cargo.level;

    console.log("dans validate searche : ", +this.cargoAmelioreLvl);
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
