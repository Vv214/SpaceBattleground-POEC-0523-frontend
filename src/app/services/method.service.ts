import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MethodService {

  changeIsBuild(token: string, buildingIsBuild: Boolean, buildingName: string) {
    return fetch("http://localhost:8080/building/" + buildingName, {
      method: "put",
      headers: {
        Accept: "application/json",
        'content-type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify(buildingIsBuild)
    })
  }
  updateStockPlayer(ironPrice: number, diamondPrice: number, energyPrice: number, hydrogenePrice: number, ironPlayer: number, diamondPlayer: number, hydrogenePlayer: number, energyPlayer: number): Array<number> {
    let ressources: Array<number> = [4]
    ressources[0] = ironPlayer - ironPrice;
    ressources[1] = diamondPlayer - diamondPrice;
    ressources[2] = hydrogenePlayer = - hydrogenePrice;
    ressources[3] = energyPlayer - energyPrice;
    return ressources;
  }

  canDoneAction(ironPrice: number, diamondPrice: number,
    energyPrice: number, hydrogenePrice: number, ironPlayer: number,
    diamondPlayer: number, hydrogenePlayer: number, energyPlayer: number): boolean {
    if (ironPrice <= ironPlayer && diamondPrice <= diamondPlayer && energyPrice <= energyPlayer && hydrogenePrice <= hydrogenePlayer)
      return true;
    return false;
  }

  constructor() {}
}
