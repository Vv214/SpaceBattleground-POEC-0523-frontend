import { Injectable } from '@angular/core';

export interface Ships {
  data: {
    lightShip: Ships;
    mediumShip: Ships;
    heavyShip: Ships;
    scoutShip: Ships;

    cargoShip: Ships;
    heavyCargoShip: Ships;
    recyclerShip: Ships;
    colonisateur: Ships;
  };
}

export interface Ship {
  name: string;
  type: string;

  shipPv: number;
  shipDamage: number;
  shipSpeed: number;
  shipQuantity: number;
  shipCapacity: number;

  ironPrice: number;
  diamondPrice: number;
  hydrogenePrice: number;
  energyPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class ShipService {
  constructor() {}

  public shipName = '';
  public shipNameSrc = '';
  public shipType = '';

  public shipPv = 0;
  public shipDamage = 0;
  public shipSpeed = 0;
  public shipQuantity = 0;
  public shipCapacity = 0;
  public shipFuel = 0;

  public shipIronPrice = 0;
  public shipDiamondPrice = 0;
  public shipHydrogenPrice = 0;
  public shipEnergyPrice = 0;

  public lightShipQuantity!: number;
  public mediumShipQuantity!: number;
  public heavyShipQuantity!: number;
  public scoutShipQuantity!: number;
  public cargoShipQuantity!: number;
  public heavyCargoShipQuantity!: number;
  public recyclerShipQuantity!: number;
  public colonisateurQuantity!: number;
  public eMessage = '';


  checkShipInfo(token: string) {
    return fetch('http://localhost:8080/ship', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-token': token,
      },
    });
  }


  buildShip(token: string) {
    return fetch('http://localhost:8080/ship/{name}', {
      method: 'PUT',
      headers: {
        'x-token': token,
      },
      // body: JSON.stringify({
  
      //   level : )
    });
  }


}

