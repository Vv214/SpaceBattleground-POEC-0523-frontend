import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ShipService } from 'src/app/services/ship.service';

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

    console.log();

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

    this.lightShipQuantity = ships.data.lightShip.quantity;
    this.mediumShipQuantity = ships.data.mediumShip.quantity;
    this.heavyShipQuantity = ships.data.heavyShip.quantity;
    this.scoutShipQuantity = ships.data.scoutShip.quantity;
    this.cargoShipQuantity = ships.data.cargoShip.quantity;
    this.heavyCargoShipQuantity = ships.data.heavyCargoShip.quantity;
    this.recyclerShipQuantity = ships.data.recyclerShip.quantity;
    this.colonisateurQuantity = ships.data.colonisateur.quantity;

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
export class shipBuild {
  constructor(public dialog: MatDialog) {}
}
