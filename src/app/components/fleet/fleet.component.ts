import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ShipService } from 'src/app/services/ship.service';
import { shipDetail } from '../shipyard/shipyard.component';
import { shipBuild } from '../shipyard/shipyard.component';
import { PlanetService } from 'src/app/services/planet.service';

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
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss'],
})
export class FleetComponent implements OnInit {
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

  constructor(public dialog: MatDialog, public shipService: ShipService, private planetService: PlanetService) {}

  modifyFleet() {
    const dialogRef = this.dialog.open(modifyFleet);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addQuantity(ship: string) {
    if (ship == 'lightShip') {
      this.lightShipQuantity = this.lightShipQuantity + 1;
    } else if (ship == 'mediumShip') {
      this.mediumShipQuantity = this.mediumShipQuantity + 1;
    } else if (ship == 'heavyShip') {
      this.heavyShipQuantity = this.heavyShipQuantity + 1;
    } else if (ship == 'scoutShip') {
      this.scoutShipQuantity = this.scoutShipQuantity + 1;
    } else if (ship == 'cargoShip') {
      this.cargoShipQuantity = this.cargoShipQuantity + 1;
    } else if (ship == 'heavyCargoShip') {
      this.heavyCargoShipQuantity = this.heavyCargoShipQuantity + 1;
    } else if (ship == 'recyclerShip') {
      this.recyclerShipQuantity = this.recyclerShipQuantity + 1;
    } else if (ship == 'colonisateur') {
      this.colonisateurQuantity = this.colonisateurQuantity + 1;
    }
  }

  openShipDetail(shipName: string) {
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

    this.lightShipQuantity = ships.data.lightShip.quantity;
    this.mediumShipQuantity = ships.data.mediumShip.quantity;
    this.heavyShipQuantity = ships.data.heavyShip.quantity;
    this.scoutShipQuantity = ships.data.scoutShip.quantity;
    this.cargoShipQuantity = ships.data.cargoShip.quantity;
    this.heavyCargoShipQuantity = ships.data.heavyCargoShip.quantity;
    this.recyclerShipQuantity = ships.data.recyclerShip.quantity;
    this.colonisateurQuantity = ships.data.colonisateur.quantity;
  }
}

@Component({
  selector: 'modifyFleet',
  templateUrl: 'modifyFleet.html',
  styleUrls: ['modifyFleet.scss'],
})
export class modifyFleet {
  constructor(public dialog: MatDialog, private planetService: PlanetService) {}

  public currentPlanet = 1;
  public planetName: string = '';
  public positionX: number = 0;
  public positionY: number = 0;
  public ennemyPositionX: number = 19;
  public ennemyPositionY: number = 12;

  calculateDistance() {
    let distance = Math.abs(this.positionX + this.positionY - (this.ennemyPositionX + this.ennemyPositionY)) / 2;
    return Math.floor(distance);
  }

  ngOnInit(): void {
    this.planetName = this.planetService.planetList[this.planetService.planetId].name;
    this.positionX = this.planetService.planetList[this.planetService.planetId].positionX;
    this.positionY = this.planetService.planetList[this.planetService.planetId].positionY;
    this.currentPlanet = this.planetService.planetId + 1;
  }
}
