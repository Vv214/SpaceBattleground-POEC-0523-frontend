import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MethodService {
  changeIsBuild(token: string, buildingName: string, buildingLevel: number) {
    return fetch('http://localhost:8080/building/' + buildingName, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify({
        level: buildingLevel,
      }),
    });
  }

  shipBuild(token: string, shipName: string, shipQuantity: number) {
    return fetch('http://localhost:8080/ship/' + shipName, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify({
        quantity: shipQuantity,
      }),
    });
  }

  async updateStockPlayer(
    token: string,
    ironPrice: number,
    diamondPrice: number,
    energyPrice: number,
    hydrogenePrice: number,
    ironPlayer: number,
    diamondPlayer: number,
    hydrogenePlayer: number,
    energyPlayer: number
  ): Promise<void> {
    let ressources: Array<number> = [4];
    ressources[0] = ironPlayer - ironPrice;
    ressources[1] = diamondPlayer - diamondPrice;
    ressources[2] = hydrogenePlayer - hydrogenePrice;
    ressources[3] = energyPlayer - energyPrice;

    const response = await fetch('http://localhost:8080/ressource/iron', {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify({
        quantity: ressources[0],
      }),
    });

    await fetch('http://localhost:8080/ressource/' + 'diamond', {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify({
        quantity: ressources[1],
      }),
    });

    await fetch('http://localhost:8080/ressource/' + 'hydrogene', {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify({
        quantity: ressources[2],
      }),
    });

    await fetch('http://localhost:8080/ressource/' + 'energy', {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify({
        quantity: ressources[3],
      }),
    });
  }

  haveEnoughRessources(
    ironPrice: number,
    diamondPrice: number,
    energyPrice: number,
    hydrogenePrice: number,
    ironPlayer: number,
    diamondPlayer: number,
    hydrogenePlayer: number,
    energyPlayer: number
  ): boolean {
    if (
      ironPrice <= ironPlayer &&
      diamondPrice <= diamondPlayer &&
      energyPrice <= energyPlayer &&
      hydrogenePrice <= hydrogenePlayer
    )
      return true;
    return false;
  }

  constructor() {}
}
