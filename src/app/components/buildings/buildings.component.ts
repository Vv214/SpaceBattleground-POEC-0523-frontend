import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BuildService } from 'src/app/services/build.service';
import { OnInit } from '@angular/core';
import { MethodService } from 'src/app/services/method.service';

export interface Buildings {
  data: {
    ironMine: Building;
    diamondMine: Building;
    hydrogeneMine: Building;
    energyMine: Building;

    laboratory: Building;
    robotFactory: Building;
    shipyard: Building;
    terraformer: Building;

    [buildingName: string]: Building;
  };
}

export interface Building {
  name: string;
  type: string;
  description: string;
  level: number;
  ironPrice: number;
  diamondPrice: number;
  hydrogenPrice: number;
  energyPrice: number;
  isBuild: Boolean;
  timeToBuild: Date;
  timeToStart: Date;
}

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss'],
})
export class BuildingsComponent implements OnInit {
  public token!: string;
  // public ironMineName!: string;
  // public diamondMine!: string;
  // public hydrogeneMine!: string;
  // public energyMine!: string;

  public robotFactory = 'robotFactory';
  public laboratory = 'laboratory';
  public shipyard = 'shipyard';
  public terraformer = 'terraformer';

  public robotFactoryName!: string;
  public laboratoryName!: string;
  public shipyardName!: string;
  public terraformerName!: string;

  public robotFactoryLevel!: number;
  public laboratoryLevel!: number;
  public shipyardLevel!: number;
  public terraformerLevel!: number;
  constructor(public dialog: MatDialog, public buildService: BuildService) {}

  openBuildingDetail(buildingName: string) {
    let buildings: Buildings = JSON.parse(localStorage.getItem('buildings') ?? '');
    this.buildService.buildingName = buildings.data[buildingName].name.toString();
    this.buildService.buildingType = buildings.data[buildingName].type.toString();
    // this.buildService.buildingLevel = buildings.data[buildingName].level;
    this.buildService.buildingDescription = buildings.data[buildingName].description.toString();
    this.buildService.buildingIronPrice = buildings.data[buildingName].ironPrice;
    this.buildService.buildingDiamondPrice = buildings.data[buildingName].diamondPrice;
    this.buildService.buildingHydrogenPrice = buildings.data[buildingName].hydrogenPrice;
    this.buildService.buildingEnergyPrice = buildings.data[buildingName].energyPrice;
    this.buildService.buildingNameSrc = buildingName;
    this.buildService.buildingIsBuild = buildings.data[buildingName].isBuild;

    if (buildingName == 'robotFactory') {
      this.buildService.buildingLevel = this.buildService.robotFactoryLevel;
    } else if (buildingName == 'laboratory') {
      this.buildService.buildingLevel = this.buildService.laboratoryLevel;
    } else if (buildingName == 'shipyard') {
      this.buildService.buildingLevel = this.buildService.shipyardLevel;
    } else if (buildingName == 'terraformer') {
      this.buildService.buildingLevel = this.buildService.terraformerLevel;
    }

    console.log('src', this.buildService.buildingNameSrc);
    console.log('build ', this.buildService.buildingIsBuild);
    // this.buildService.buildingCapacity = buildings.data[buildingName].capacity;

    const dialogRef = this.dialog.open(buildingDetail);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  robotFactoryLevelInUI() {
    return this.buildService.robotFactoryLevel;
  }
  laboratoryLevelInUI() {
    return this.buildService.laboratoryLevel;
  }

  shipyardLevelInUI() {
    return this.buildService.shipyardLevel;
  }

  terraformerLevelInUI() {
    return this.buildService.terraformerLevel;
  }

  checkBuildingInfo(token: string) {
    this.buildService.checkBuildingInfo(token).then((response) => {
      if (response.status === 200) {
        response.json().then((body: Buildings) => {
          console.log('mon body ', body);
          localStorage.setItem('buildings', JSON.stringify(body));
        });
      }
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('x-token') ?? '';
    this.checkBuildingInfo(this.token);
    let buildings: Buildings = JSON.parse(localStorage.getItem('buildings') ?? '');
    this.buildService.robotFactoryLevel = buildings.data.robotFactory.level;
    this.buildService.laboratoryLevel = buildings.data.laboratory.level;
    this.buildService.shipyardLevel = buildings.data.shipyard.level;
    this.buildService.terraformerLevel = buildings.data.terraformer.level;
  }
}

@Component({
  selector: 'buildingDetail',
  templateUrl: 'buildingDetail.html',
  styleUrls: ['buildingDetail.scss'],
})
export class buildingDetail {
  constructor(public dialog: MatDialog, public router: Router, private buildService: BuildService) {}

  public buildingName!: string;
  public buildingNameSrc!: string;
  public buildingIsBuild!: Boolean;
  public buildingType!: string;
  public buildingLevel!: number;
  public buildingDescription!: string;
  public buildingCapacity!: string;
  public buildingIronPrice!: number;
  public buildingDiamondPrice!: number;
  public buildingHydrogenePrice!: number;
  public buildingEnergyPrice!: number;
  public token!: string;

  openBuildingBuild() {
    const dialogRef = this.dialog.open(buildingBuild);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  chantier = false;

  openBuildingDestroy() {
    const dialogRef = this.dialog.open(buildingDestroy);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toShipyard() {
    this.router.navigate(['/', 'shipyard']);
  }

  checkBuildingInfo(token: string) {
    this.buildService.checkBuildingInfo(token).then((response) => {
      if (response.status === 200) {
        response.json().then((body: Buildings) => {
          console.log('mon body ', body);
          localStorage.setItem('buildings', JSON.stringify(body));
        });
      }
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('x-token') ?? '';
    this.checkBuildingInfo(this.token);
    let buildings: Buildings = JSON.parse(localStorage.getItem('buildings') ?? '');
    this.buildingName = this.buildService.buildingName.toString();
    this.buildingType = this.buildService.buildingType.toString();
    this.buildingLevel = this.buildService.buildingLevel;
    this.buildingDescription = this.buildService.buildingDescription.toString();
    this.buildingIronPrice = this.buildService.buildingIronPrice;
    this.buildingDiamondPrice = this.buildService.buildingDiamondPrice;
    this.buildingHydrogenePrice = this.buildService.buildingHydrogenPrice;
    this.buildingEnergyPrice = this.buildService.buildingEnergyPrice;
    this.buildingNameSrc = this.buildService.buildingNameSrc;
    this.buildingIsBuild = this.buildService.buildingIsBuild;
  }
}

@Component({
  selector: 'buildingBuild',
  templateUrl: 'buildingBuild.html',
  styleUrls: ['buildingBuild.scss'],
})
export class buildingBuild implements OnInit {
  constructor(
    public dialog: MatDialog,
    public router: Router,
    private buildService: BuildService,
    private methodService: MethodService
  ) {}
  public buildingName!: string;
  public buildingNameSrc!: string;
  public buildingIsBuild!: Boolean;
  public buildingType!: string;
  public buildingLevel!: number;
  public buildingDescription!: string;
  public buildingCapacity!: string;
  public buildingIronPrice!: number;
  public buildingDiamondPrice!: number;
  public buildingHydrogenePrice!: number;
  public buildingEnergyPrice!: number;
  public token!: string;
  public ironPlayer!: number;
  public diamondPlayer!: number;
  public hydrogenePlayer!: number;
  public energyPlayer!: number;

  openErrorMessage() {
    const dialogRef = this.dialog.open(errorMessage);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  buildBuilding(
    token: string,
    buildingName: string,
    buildingLevel: number,
    buildingIronPrice: number,
    buildingDiamondPrice: number,
    buildingEnergyPrice: number,
    buildingHydrogenePrice: number,
    buildingIsBuild: Boolean,
    ironPlayer: number,
    diamondPlayer: number,
    hydrogenePlayer: number,
    energyPlayer: number
  ) {
    let ressourcesPlayer: Array<number> = [4];
    ressourcesPlayer[0] = ironPlayer;
    ressourcesPlayer[1] = diamondPlayer;
    ressourcesPlayer[2] = hydrogenePlayer;
    ressourcesPlayer[3] = energyPlayer;

    let canBuild = this.methodService.canDoneAction(
      buildingIronPrice,
      buildingDiamondPrice,
      buildingEnergyPrice,
      buildingHydrogenePrice,
      ironPlayer,
      diamondPlayer,
      hydrogenePlayer,
      energyPlayer
    );
    // console.log("dans methode véran ", canBuild);

    if (canBuild) {
      // console.log("dans methode véran avec canBuild = true");
      let buildings: Buildings = JSON.parse(localStorage.getItem('buildings') ?? '');

      this.methodService
        .updateStockPlayer(
          token,
          buildingIronPrice,
          buildingDiamondPrice,
          buildingEnergyPrice,
          buildingHydrogenePrice,
          ironPlayer,
          diamondPlayer,
          hydrogenePlayer,
          energyPlayer
        )
        .then(() => {
          buildingLevel++;
          this.methodService.changeIsBuild(token, buildingName, buildingLevel).then((response) => {
            if (response.status === 200) {
              response.json().then((body) => {
                console.log('pwet : ', body.level);
                if (body.level !== 0) {
                  console.log('level avant true : ', this.buildingLevel);
                  this.buildingIsBuild = body.isBuild;
                  console.log(buildingName);
                  if (buildingName === 'Laboratoire') {
                    console.log('Update level dans if Laboratoire');
                    this.buildService.laboratoryLevel = buildingLevel;
                  }
                  if (buildingName === 'Chantier spatial') {
                    console.log('Update level dans if shipyard');
                    this.buildService.shipyardLevel = buildingLevel;
                  }
                  if (buildingName === 'Terraformeur') {
                    console.log('Update level dans if terraformer');
                    this.buildService.terraformerLevel = buildingLevel;
                  }
                  if (buildingName === 'Usine de robots') {
                    console.log('Update level dans if robotFactory');
                    this.buildService.robotFactoryLevel = buildingLevel;
                  }
                  console.log(`buildingIsBuild :  ${this.buildingIsBuild}` + ` buildingName : ${buildingName}`);
                  // let buildingIsBuildString = 'true';
                  // buildingLevel++;
                  console.log('level quand true : ', buildingLevel);
                  // localStorage.setItem('level', buildingLevel);
                } else {
                  let buildingIsBuildString = 'false';
                  localStorage.setItem('buildingIsBuild', buildingIsBuildString);
                }
                console.log(buildingLevel, ' dans ma fonction');
                if (body.level !== 0) {
                  // localStorage.setItem('buildingIsBuild', buildingIsBuildString);
                  this.buildingIsBuild = true;
                  console.log('Building is true');
                } else this.buildingIsBuild = false;
              });
            }
          });
        });
      // modifier isBuild du batiment en cours en true avec setIsBuild
    } else {
      this.buildService.eMessage = 'ressources';
      this.openErrorMessage();
    }
  }

  ngOnInit() {
    this.token = localStorage.getItem('x-token') ?? '';
    this.buildingName = this.buildService.buildingName.toString();
    this.buildingType = this.buildService.buildingType.toString();
    this.buildingLevel = this.buildService.buildingLevel;
    this.buildingDescription = this.buildService.buildingDescription.toString();
    this.buildingIronPrice = this.buildService.buildingIronPrice;
    this.buildingDiamondPrice = this.buildService.buildingDiamondPrice;
    this.buildingHydrogenePrice = this.buildService.buildingHydrogenPrice;
    this.buildingEnergyPrice = this.buildService.buildingEnergyPrice;
    this.buildingNameSrc = this.buildService.buildingNameSrc;
    this.buildingIsBuild = this.buildService.buildingIsBuild;
    console.log(this.buildingIsBuild, ' dans ng On init de building Build');
    let ressources = JSON.parse(localStorage.getItem('ressources') ?? '');
    this.ironPlayer = ressources.data.iron.quantity;
    this.diamondPlayer = ressources.data.diamond.quantity;
    this.hydrogenePlayer = ressources.data.hydrogene.quantity;
    this.energyPlayer = ressources.data.energy.quantity;
  }

  upgradeBuilding() {
    // incrémenter level, coeff prod et ressources requises du batiment en cours
  }
}

@Component({
  selector: 'buildingDestroy',
  templateUrl: 'buildingDestroy.html',
  styleUrls: ['buildingDestroy.scss'],
})
export class buildingDestroy {
  destroyBuilding() {
    // modifier isBuild du batiment en cours en false avec setIsBuild
    // modifier ressources du joueur en cours (remboursé du dixième du prix de construction)
    // ferJoueur = ferJoueur + ferRequis/10;
    // hydrogeneJoueur = hydrogeneJoueur + hydrogeneRequis/10;
    // diamantJoueur = diamantJoueur + diamantRequis/10;
  }
}

@Component({
  selector: 'errorMessage',
  templateUrl: 'errorMessage.html',
  styleUrls: ['errorMessage.scss'],
})
export class errorMessage {
  public eMessage!: string;
  constructor(private buildService: BuildService) {}

  ngOnInit() {
    this.eMessage = this.buildService.eMessage;
  }
}
