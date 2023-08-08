import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ResearchService } from '../../services/research.service';

export interface Researchs {
  data: {
    cargo: Research;
    protection: Research;
    astrophysique: Research;
    combustion: Research;
    impulsion: Research;

    fleet: Research;
    weapon: Research;
    laser: Research;

    fer: Research;
    hydrogene: Research;
    diamant: Research;
    plasma: Research;
    energie: Research;

    [researchName: string]: Research;
  };
}
export interface Research {
  name: string;
  description: string;
  level: number;

  ironPrice: number;
  diamondPrice: number;
  hydrogenPrice: number;
  energyPrice: number;

  coef_modifier: number;
  timeSearch: Date;
  timeToStart: Date;
  isDone: boolean;
}
@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss'],
})
export class ResearchComponent implements OnInit {
  public token!: string;

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

  public cargo = 'cargo';
  public protection = 'protection';
  public astrophysique = 'astrophysique';
  public combustion = 'combustion';
  public impulsion = 'impulsion';

  public fleet = 'fleet';
  public weapon = 'weapon';
  public laser = 'laser';

  public fer = 'fer';
  public hydrogene = 'hydrogene';
  public diamant = 'diamant';
  public plasma = 'plasma';
  public energie = 'energie';

  public cargoLevel!: number;
  public protectionLevel!: number;
  public astrophysiqueLevel!: number;
  public combustionLevel!: number;
  public impulsionLevel!: number;

  public fleetLevel!: number;
  public weaponLevel!: number;
  public laserLevel!: number;

  public ferLevel!: number;
  public hydrogeneLevel!: number;
  public diamantLevel!: number;
  public plasmaLevel!: number;
  public energieLevel!: number;

  constructor(public dialog: MatDialog, public researchService: ResearchService) {}


  openTechnologyTree() {
    const dialogRef = this.dialog.open(TechnologyTree);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openResearchDetail(researchName: string) {
    let researchs: Researchs = JSON.parse(localStorage.getItem('researchs') ?? '');
    console.log('pouet', researchs.data[researchName].name.toString());

    this.researchService.researchName = researchs.data[researchName].name.toString();
    this.researchService.researchDescription = researchs.data[researchName].description.toString();
    this.researchService.researchLevel = researchs.data[researchName].level;

    this.researchService.researchIronPrice = researchs.data[researchName].ironPrice;
    this.researchService.researchDiamondPrice = researchs.data[researchName].diamondPrice;
    this.researchService.researchHydrogenPrice = researchs.data[researchName].hydrogenPrice;
    this.researchService.researchEnergyPrice = researchs.data[researchName].energyPrice;

    this.researchService.researchNameSrc = researchName;
    this.researchService.researchIsDone = researchs.data[researchName].isDone;
    console.log(this.ferLevel);
    const dialogRef = this.dialog.open(researchDetail);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getResearchInfo(token: string) {
    this.researchService.getResearchInfo(token).then((response) => {
      if (response.status === 200) {
        response.json().then((body: Researchs) => {
          console.log('mon body ', body);
          localStorage.setItem('researchs', JSON.stringify(body));
        });
      }
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('x-token') ?? '';
    this.getResearchInfo(this.token);
    let researchs: Researchs = JSON.parse(localStorage.getItem('researchs') ?? '');

    this.cargoLevel = researchs.data.cargo.level;
    this.protectionLevel = researchs.data.protection.level;
    this.astrophysiqueLevel = researchs.data.astrophysique.level;
    this.combustionLevel = researchs.data.combustion.level;
    this.impulsionLevel = researchs.data.impulsion.level;
    this.fleetLevel = researchs.data.fleet.level;
    this.weaponLevel = researchs.data.weapon.level;
    this.laserLevel = researchs.data.laser.level;
    this.ferLevel = researchs.data.fer.level;
    this.hydrogeneLevel = researchs.data.hydrogene.level;
    this.diamantLevel = researchs.data.diamant.level;
    this.plasmaLevel = researchs.data.plasma.level;
    this.energieLevel = researchs.data.energie.level;
  }
}

@Component({
  selector: 'TechnologyTree',
  templateUrl: 'TechnologyTree.html',
  styleUrls: ['TechnologyTree.scss'],
})
export class TechnologyTree implements OnInit {
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

  ngOnInit(): void {
    let researchs: Researchs = JSON.parse(localStorage.getItem('researchs') ?? '');
    this.cargoAmelioreLvl = researchs.data['Réacteur à combustion']['level'];
  }
}

@Component({
  selector: 'researchDetail',
  templateUrl: 'researchDetail.html',
  styleUrls: ['researchDetail.scss'],
})
export class researchDetail implements OnInit {
  constructor(public researchService: ResearchService) {}

  // let researchs: Researchs = JSON.parse(localStorage.getItem('researchs') ?? '');
  // this.cargoAmelioreLvl = researchs.data.Technologie_cargo.level;
  isBuilt = true;
  public researchName!: string;
  public researchNameSrc!: string;
  public researchDescription!: string;
  public researchLevel!: number;
  public researchIsDone!: boolean;

  public researchIronPrice!: number;
  public researchDiamondPrice!: number;
  public researchHydrogenPrice!: number;
  public researchEnergyPrice!: number;
  public token!: string;

  getResearchInfo(token: any) {
    return fetch('http://localhost:8080/technologie', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-token': token,
      },
    });
  }

  validateResearch() {
    // console.log("dans validate search : ", this.cargoAmelioreLvl);
    // if (
    //   this.ferJoueur > this.ferRequis &&
    //   this.hydrogeneJoueur > this.hydrogeneRequis &&
    //   this.diamantJoueur > this.diamantRequis
    // ) {
    //   this.ferJoueur = this.ferJoueur - this.ferRequis;
    //   this.hydrogeneJoueur = this.hydrogeneJoueur - this.hydrogeneRequis;
    //   this.diamantJoueur = this.diamantJoueur - this.diamantRequis;
    // if (recherche.isdone = false) {
    // timer recherche
    // recherche.isdone = true;
    // } else if (recherche.level < 5){
    // timer recherche
    // recherche.level = recherche.level +1;
    // }
    // if recherche.level = 5 -> disabled
    // }
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('x-token') ?? '';
    this.getResearchInfo(this.token);
    let researchs: Researchs = JSON.parse(localStorage.getItem('researchs') ?? '');
    this.researchName = this.researchService.researchName.toString();
    this.researchNameSrc = this.researchService.researchNameSrc;
    this.researchLevel = this.researchService.researchLevel;
    this.researchIsDone = this.researchService.researchIsDone;

    this.researchDescription = this.researchService.researchDescription.toString();
    this.researchIronPrice = this.researchService.researchIronPrice;
    this.researchDiamondPrice = this.researchService.researchDiamondPrice;
    this.researchHydrogenPrice = this.researchService.researchHydrogenPrice;
    this.researchEnergyPrice = this.researchService.researchEnergyPrice;
  }

}
