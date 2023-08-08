import { Injectable } from '@angular/core';

export interface Planets {
  data: {
    planet1: Planets;
    planet2: Planets;
    planet3: Planets;
    planet4: Planets;
    planet5: Planets;
    planet6: Planets;
    planet7: Planets;
    planet8: Planets;
    planet9: Planets;
    planet10: Planets;
  };
}

export interface Planet {
  name: string;
  positionX: number;
  positionY: number;
}

@Injectable({
  providedIn: 'root',
})
export class PlanetService {
  constructor() {}

  public planetName = '';
  public planetPositionX = 0;
  public planetPositionY = 0;
  public planetId = 0;

  public planetList = [
    { id: 1, name: 'Solaris', positionX: 8, positionY: 8 },
    { id: 2, name: 'Cygnus', positionX: 1, positionY: 1 },
    { id: 3, name: 'Titanis', positionX: 13, positionY: 19 },
    { id: 4, name: 'Seren', positionX: 18, positionY: 1 },
    { id: 5, name: 'Terra Nova', positionX: 12, positionY: 6 },
    { id: 6, name: 'Aetheria', positionX: 6, positionY: 2 },
    { id: 7, name: 'Edenia', positionX: 2, positionY: 6 },
    { id: 8, name: 'Pandora', positionX: 17, positionY: 17 },
    { id: 9, name: 'Nova Prime', positionX: 3, positionY: 17 },
    { id: 10, name: 'Elysium', positionX: 2, positionY: 6 },
  ];

  checkPlanetInfo(token: string) {
    return fetch('http://localhost:8080/planet', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-token': token,
      },
    });
  }
}
