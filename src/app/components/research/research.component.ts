import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ResearchService } from '../../services/research.service';
import { MethodService } from 'src/app/services/method.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { errorMessage } from '../buildings/buildings.component';
import { BuildService } from 'src/app/services/build.service';

export interface Ressources {
  data: {
    iron: Ressource;
    diamond: Ressource;
    hydrogene: Ressource;
    energy: Ressource;
  };
}

export interface Ressource {
  quantity: number;
  maxStock: number;
}
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

  public ironPlayer!: number;
  public diamondPlayer!: number;
  public hydrogenePlayer!: number;
  public energyPlayer!: number;

  constructor(public dialog: MatDialog, public researchService: ResearchService) {}
  cargoLevelUI() {
    return null;
  }
  protectionLevelUI() {
    return null;
  }
  astrophysiqueLevelUI() {
    return null;
  }
  combustionLevelUI() {
    return null;
  }
  impulsionLevelUI() {
    return null;
  }
  fleetLevelUI() {
    return null;
  }
  weaponLevelUI() {
    return null;
  }
  laserLevelUI() {
    return null;
  }
  ferLevelUI() {
    return null;
  }
  hydrogeneLevelUI() {
    return null;
  }
  diamantLevelUI() {
    return null;
  }
  plasmaLevelUI() {
    return null;
  }
  energieLevelUI() {
    return null;
  }

  openTechnologyTree() {
    const dialogRef = this.dialog.open(TechnologyTree);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openResearchDetail(researchName: string) {
    let researchs: Researchs = JSON.parse(localStorage.getItem('researchs') ?? '');
    this.researchService.researchName = researchs.data[researchName].name.toString();
    this.researchService.researchDescription = researchs.data[researchName].description.toString();
    this.researchService.researchLevel = researchs.data[researchName].level;

    this.researchService.researchIronPrice = researchs.data[researchName].ironPrice;
    this.researchService.researchDiamondPrice = researchs.data[researchName].diamondPrice;
    this.researchService.researchHydrogenPrice = researchs.data[researchName].hydrogenPrice;
    this.researchService.researchEnergyPrice = researchs.data[researchName].energyPrice;

    this.researchService.researchNameSrc = researchName;
    this.researchService.researchIsDone = researchs.data[researchName].isDone;
    const dialogRef = this.dialog.open(researchDetail);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getResearchInfo(token: string) {
    this.researchService.getResearchInfo(token).then((response) => {
      if (response.status === 200) {
        response.json().then((body: Researchs) => {
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
    let ressources = JSON.parse(localStorage.getItem('ressources') ?? '');
    this.ironPlayer = ressources.data.iron.quantity;
    this.diamondPlayer = ressources.data.diamond.quantity;
    this.hydrogenePlayer = ressources.data.hydrogene.quantity;
    this.energyPlayer = ressources.data.energy.quantity;
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
  constructor(public buildService: BuildService, public dialog: MatDialog, public researchService: ResearchService, public methodService: MethodService, public navbarService: NavbarService) {}
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
  public ironPlayer!: number;
  public hydrogenePlayer!: number;
  public energyPlayer!: number;
  public diamondPlayer!: number;
  public token!: string;

  getResearchInfo(token: string) {
    return fetch('http://localhost:8080/technologie', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-token': token,
      },
    });
  }

  checkQuantityRessource(token: string) {
    this.navbarService.checkQuantityRessource(token).then((response) => {
      if (response.status === 200) {
        response.json().then((body: Ressources) => {
          localStorage.setItem('ressources', JSON.stringify(body));
        });
      }
    });
  }

  getResearchLevelUp(token: string, researchName: string, researchIronPrice: number, researchDiamondPrice: number, researchHydrogenPrice: number, researchEnergyPrice: number, researchLevel: number, ironPlayer: number, diamondPlayer: number, hydrogenePlayer: number, energyPlayer: number) {
    let canBuild = this.methodService.haveEnoughRessources(researchIronPrice, researchDiamondPrice, researchEnergyPrice, researchHydrogenPrice, ironPlayer, diamondPlayer, hydrogenePlayer, energyPlayer);
    if (canBuild) {
      this.methodService.updateStockPlayer(token, researchIronPrice, researchDiamondPrice, researchEnergyPrice, researchHydrogenPrice, ironPlayer, diamondPlayer, hydrogenePlayer, energyPlayer).then(() => {
        this.researchService.getResearchLevelUp(token, researchName).then((response) => {
          if (response.status === 200) {
            response.json().then((body) => {
              if (body.quantity !== 0) {
                if (researchName === 'Technologie cargo') {
                  this.researchService.cargoLevel = researchLevel;
                }
                else if (researchName === 'Coques améliorées') {
                  this.researchService.protectionLevel = researchLevel;
                }
                else if (researchName === 'Astrophysique') {
                  this.researchService.astrophysiqueLevel = researchLevel;
                }
                else if (researchName === 'Réacteur à combustion') {
                  this.researchService.combustionLevel = researchLevel;
                }
                else if (researchName === 'Réacteur à impulsion') {
                  this.researchService.impulsionLevel = researchLevel;
                }
                else if (researchName === 'Technologie flotte') {
                  this.researchService.fleetLevel = researchLevel;
                }
                else if (researchName === 'Technologie Armes à feu') {
                  this.researchService.weaponLevel = researchLevel;
                }
                else if (researchName === 'Technologie Armes laser') {
                  this.researchService.laserLevel = researchLevel;
                }
                else if (researchName === 'Mine de fer améliorée"') {
                  this.researchService.ferLevel = researchLevel;
                }
                else if (researchName === "Extracteur d'hydrogène amélioré") {
                  this.researchService.hydrogeneLevel = researchLevel;
                }
                else if (researchName === "Mine de diamant améliorée") {
                  this.researchService.diamantLevel = researchLevel;
                }
                else if (researchName === 'Technologie plasma') {
                  this.researchService.plasmaLevel = researchLevel;
                }
                else if (researchName === 'Technologie énergétique') {
                  this.researchService.energieLevel = researchLevel;
                }
                this.checkQuantityRessource(token);
              }

            });
          }
        });
      });
    } else {
      this.buildService.eMessage = 'ressources';
      this.openErrorMessage();
    }
  }

  openErrorMessage() {
    const dialogRef = this.dialog.open(errorMessage);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
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

    let ressources = JSON.parse(localStorage.getItem('ressources') ?? '');
    this.ironPlayer = ressources.data.iron.quantity;
    this.diamondPlayer = ressources.data.diamond.quantity;
    this.hydrogenePlayer = ressources.data.hydrogene.quantity;
    this.energyPlayer = ressources.data.energy.quantity;
  }

}
