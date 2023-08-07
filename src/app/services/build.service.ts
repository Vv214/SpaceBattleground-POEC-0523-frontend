import { Injectable } from '@angular/core';

export interface Buildings {
  data: {
    ironMine: Building;
    diamondMine: Building;
    hydrogeneMine: Building;
    energyMine: Building;

    laboratory: Building;
    robotFactory: Building;
    shipyard: Building;
    drill: Building;
  };
}

export interface Building {
  name: string;
  type: string;
  description: string;
  level: number;
  ironPrice: number;
  diamondPrice: number;
  hydrogenePrice: number;
  energyPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class BuildService {
  constructor() {}

  checkBuildingInfo(token: string) {
    return fetch('http://localhost:8080/building', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-token': token,
      },
    });
  }

  buildBuilding(token: string) {
    return fetch('http://localhost:8080/buildings/{name}', {
      method: 'PUT',
      headers: {
        'x-token': token,
      },
      // body: JSON.stringify({

      //   level : )
    });
  }

  buildShip(token: string) {
    return fetch('http://localhost:8080/shipyard/build', {
      method: 'POST',
      headers: {
        'x-token': token,
      },
    });
  }
}
