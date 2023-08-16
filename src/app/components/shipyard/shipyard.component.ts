import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ShipService } from 'src/app/services/ship.service';
import { BuildService } from 'src/app/services/build.service';
import { MethodService } from 'src/app/services/method.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { errorMessage } from '../buildings/buildings.component';


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

export interface Ships {
  data: {
    lightShip: Ship;
    mediumShip: Ship;
    heavyShip: Ship;
    scoutShip: Ship;

    cargoShip: Ship;
    heavyCargoShip: Ship;
    recyclerShip: Ship;
    colonisateur: Ship;

    [shipName: string]: Ship;
  };
}

export interface Ship {
  name: string;
  type: string;

  pv: number;
  damage: number;
  speed: number;
  quantity: number;
  capacity: number;
  fuel: number;

  ironPrice: number;
  diamondPrice: number;
  hydrogenPrice: number;
  energyPrice: number;
}

@Component({
  selector: 'app-shipyard',
  templateUrl: './shipyard.component.html',
  styleUrls: ['./shipyard.component.scss'],
})
export class ShipyardComponent implements OnInit {
  public token!: string;

  public name!: string;
  public type!: string;

  public ironPrice!: number;
  public diamondPrice!: number;
  public hydrogenPrice!: number;
  public energyPrice!: number;

  public pv!: number;
  public quantity!: number;
  public speed!: number;
  public fuel!: number;
  public capacity!: number;
  public damage!: number;

  public lightShip = 'lightShip';
  public mediumShip = 'mediumShip';
  public heavyShip = 'heavyShip';
  public scoutShip = 'scoutShip';

  public cargoShip = 'cargoShip';
  public heavyCargoShip = 'heavyCargoShip';
  public recyclerShip = 'recyclerShip';
  public colonisateur = 'colonisateur';

  public lightShipQuantity!: number;
  public mediumShipQuantity!: number;
  public heavyShipQuantity!: number;
  public scoutShipQuantity!: number;

  public cargoShipQuantity!: number;
  public heavyCargoShipQuantity!: number;
  public recyclerShipQuantity!: number;
  public colonisateurQuantity!: number;

  constructor(public dialog: MatDialog, public shipService: ShipService) {}

  openShipDetail(shipName: string) {
    console.log(shipName);
    let ships: Ships = JSON.parse(localStorage.getItem('ships') ?? '');
    this.shipService.shipName = ships.data[shipName].name.toString();
    this.shipService.shipType = ships.data[shipName].type.toString();

    this.shipService.shipPv = ships.data[shipName].pv;
    this.shipService.shipDamage = ships.data[shipName].damage;
    this.shipService.shipSpeed = ships.data[shipName].speed;
    this.shipService.shipQuantity = ships.data[shipName].quantity;
    this.shipService.shipCapacity = ships.data[shipName].capacity;
    this.shipService.shipFuel = ships.data[shipName].fuel;

    this.shipService.shipIronPrice = ships.data[shipName].ironPrice;
    this.shipService.shipDiamondPrice = ships.data[shipName].diamondPrice;
    this.shipService.shipHydrogenPrice = ships.data[shipName].hydrogenPrice;
    this.shipService.shipEnergyPrice = ships.data[shipName].energyPrice;

    this.shipService.shipNameSrc = shipName;
    
    if (shipName == 'lightShip') {
      this.shipService.shipQuantity = this.shipService.lightShipQuantity;
    } else if (shipName == 'mediumShip') {
      this.shipService.shipQuantity = this.shipService.mediumShipQuantity;
    } else if (shipName == 'heavyShip') {
      this.shipService.shipQuantity = this.shipService.heavyShipQuantity;
    } else if (shipName == 'scoutShip') {
      this.shipService.shipQuantity = this.shipService.scoutShipQuantity;
    } else if (shipName == 'cargoShip') {
      this.shipService.shipQuantity = this.shipService.cargoShipQuantity;
    } else if (shipName == 'heavyCargoShip') {
      this.shipService.shipQuantity = this.shipService.heavyCargoShipQuantity;
    } else if (shipName == 'recyclerShip') {
      this.shipService.shipQuantity = this.shipService.recyclerShipQuantity;
    } else if (shipName == 'colonisateur') {
      this.shipService.shipQuantity = this.shipService.colonisateurQuantity;
    }


    const dialogRef = this.dialog.open(shipDetail);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getShipInfo(token: string) {
    this.shipService.checkShipInfo(token).then((response) => {
      if (response.status === 200) {
        response.json().then((body: Ships) => {
          console.log('mon body ', body);
          localStorage.setItem('ships', JSON.stringify(body));
        });
      }
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('x-token') ?? '';
    this.getShipInfo(this.token);
    let ships: Ships = JSON.parse(localStorage.getItem('ships') ?? '');

    this.shipService.lightShipQuantity = ships.data.lightShip.quantity;
    this.shipService.mediumShipQuantity = ships.data.mediumShip.quantity;
    this.shipService.heavyShipQuantity = ships.data.heavyShip.quantity;
    this.shipService.scoutShipQuantity = ships.data.scoutShip.quantity;
    this.shipService.cargoShipQuantity = ships.data.cargoShip.quantity;
    this.shipService.heavyCargoShipQuantity = ships.data.heavyCargoShip.quantity;
    this.shipService.recyclerShipQuantity = ships.data.recyclerShip.quantity;
    this.shipService.colonisateurQuantity = ships.data.colonisateur.quantity;
  }
}

@Component({
  selector: 'shipDetail',
  templateUrl: 'shipDetail.html',
  styleUrls: ['shipDetail.scss'],
})
export class shipDetail {
  constructor(public dialog: MatDialog, private shipService: ShipService) {}

  public token!: string;

  public shipName!: string;
  public shipNameSrc!: string;
  public shipType!: string;

  public shipPv!: number;
  public shipCapacity!: number;
  public shipQuantity!: number;
  public shipFuel!: number;
  public shipDamage!: number;
  public shipSpeed!: number;

  public shipIronPrice!: number;
  public shipDiamondPrice!: number;
  public shipHydrogenPrice!: number;
  public shipEnergyPrice!: number;

  public lightShipQuantity!: number;
  public mediumShipQuantity!: number;
  public heavyShipQuantity!: number;
  public scoutShipQuantity!: number;

  public cargoShipQuantity!: number;
  public heavyCargoShipQuantity!: number;
  public recyclerShipQuantity!: number;
  public colonisateurQuantity!: number;

  openShipBuild() {
    const dialogRef = this.dialog.open(shipBuild);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getShipInfo(token: string) {
    this.shipService.checkShipInfo(token).then((response) => {
      if (response.status === 200) {
        response.json().then((body: Ships) => {
          console.log('mon body ', body);
          localStorage.setItem('ships', JSON.stringify(body));
        });
      }
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('x-token') ?? '';
    this.getShipInfo(this.token);
    let ships: Ships = JSON.parse(localStorage.getItem('ships') ?? '');

    // this.lightShipQuantity = ships.data.lightShip.quantity;
    // this.mediumShipQuantity = ships.data.mediumShip.quantity;
    // this.heavyShipQuantity = ships.data.heavyShip.quantity;
    // this.scoutShipQuantity = ships.data.scoutShip.quantity;
    // this.cargoShipQuantity = ships.data.cargoShip.quantity;
    // this.heavyCargoShipQuantity = ships.data.heavyCargoShip.quantity;
    // this.recyclerShipQuantity = ships.data.recyclerShip.quantity;
    // this.colonisateurQuantity = ships.data.colonisateur.quantity;

    this.shipName = this.shipService.shipName.toString();
    this.shipType = this.shipService.shipType.toString();
    this.shipPv = this.shipService.shipPv;
    this.shipCapacity = this.shipService.shipCapacity;
    this.shipQuantity = this.shipService.shipQuantity;
    this.shipFuel = this.shipService.shipFuel;
    this.shipDamage = this.shipService.shipDamage;
    this.shipSpeed = this.shipService.shipSpeed;
    this.shipIronPrice = this.shipService.shipIronPrice;
    this.shipDiamondPrice = this.shipService.shipDiamondPrice;
    this.shipHydrogenPrice = this.shipService.shipHydrogenPrice;
    this.shipEnergyPrice = this.shipService.shipEnergyPrice;
    this.shipNameSrc = this.shipService.shipNameSrc;
  }
}

@Component({
  selector: 'shipBuild',
  templateUrl: 'shipBuild.html',
  styleUrls: ['shipBuild.scss'],
})
export class shipBuild implements OnInit{

  constructor(
    public dialog: MatDialog,
    private buildService: BuildService,
    private methodService: MethodService,
    private navbarService:NavbarService,
    private shipService:ShipService
  ) {}
  public shipName!: string;
  public shipNameSrc!: string;
  public shipType!: string;
  public shipSpeed!: number;
  public shipPv!: number;
  public shipDamage!: number;
  public shipFuel!: number;
  // public shipDescription!: string;       à ajouter
  public shipCapacity!: number;
  public shipQuantity!: number;

  public shipIronPrice!: number;
  public shipDiamondPrice!: number;
  public shipHydrogenePrice!: number;
  public shipEnergyPrice!: number;

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

  buildShip(
    token: string,
    shipName: string,
    shipQuantity: number,
    shipIronPrice: number,
    shipDiamondPrice: number,
    shipEnergyPrice: number,
    shipHydrogenePrice: number,
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

    let canBuild = this.methodService.haveEnoughRessources(
      shipIronPrice,
      shipDiamondPrice,
      shipEnergyPrice,
      shipHydrogenePrice,
      ironPlayer,
      diamondPlayer,
      hydrogenePlayer,
      energyPlayer
    );


  // Nouvelle version, à checker
  if (canBuild) {
    let ships: Ships = JSON.parse(localStorage.getItem('ships') ?? '');

    this.methodService
      .updateStockPlayer(
        token,
        shipIronPrice,
        shipDiamondPrice,
        shipEnergyPrice,
        shipHydrogenePrice,
        ironPlayer,
        diamondPlayer,
        hydrogenePlayer,
        energyPlayer
      )
      .then(() => {
        shipQuantity++;
        this.methodService.changeIsBuild(token, shipName, shipQuantity).then((response) => {
          if (response.status === 200) {
            response.json().then((body) => {
              if (body.quantity !== 0) {
                if (shipName === 'Chasseur léger') {
                  this.shipService.lightShipQuantity = shipQuantity;
                }
                if (shipName === 'Chasseur lourd') {
                  this.shipService.mediumShipQuantity = shipQuantity;
                }
                if (shipName === 'Destroyer') {
                  this.shipService.heavyShipQuantity = shipQuantity;
                }
                if (shipName === 'Eclaireur') {
                  this.shipService.scoutShipQuantity = shipQuantity;
                }
                if (shipName === 'Transporteur léger') {
                  this.shipService.cargoShipQuantity = shipQuantity;
                }
                if (shipName === 'Transporteur lourd') {
                  this.shipService.heavyCargoShipQuantity = shipQuantity;
                }
                if (shipName === 'Récolteur') {
                  this.shipService.recyclerShipQuantity = shipQuantity;
                }
                if (shipName === 'Colonisateur') {
                  this.shipService.colonisateurQuantity = shipQuantity;
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

  ngOnInit() {
    this.token = localStorage.getItem('x-token') ?? '';
    this.shipName = this.shipService.shipName.toString();
    this.shipType = this.shipService.shipType.toString();
    this.shipQuantity = this.shipService.shipQuantity;



    // this.shipDescription = this.buildService.buildingDescription.toString();
    this.shipIronPrice = this.shipService.shipIronPrice;
    this.shipDiamondPrice = this.shipService.shipDiamondPrice;
    this.shipHydrogenePrice = this.shipService.shipHydrogenPrice;
    this.shipEnergyPrice = this.shipService.shipEnergyPrice;
    this.shipNameSrc = this.shipService.shipNameSrc;
    let ressources = JSON.parse(localStorage.getItem('ressources') ?? '');
    this.ironPlayer = ressources.data.iron.quantity;
    this.diamondPlayer = ressources.data.diamond.quantity;
    this.hydrogenePlayer = ressources.data.hydrogene.quantity;
    this.energyPlayer = ressources.data.energy.quantity;
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

  upgradeBuilding() {
    // incrémenter level, coeff prod et ressources requises du batiment en cours
  }
}