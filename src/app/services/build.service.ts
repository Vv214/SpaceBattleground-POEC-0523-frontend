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

  public buildingName = '';
  public buildingType = '';
  public buildingLevel = 0;
  public buildingDescription = '';
  public buildingCapacity = 0;

  public buildingIronPrice = 0;
  public buildingDiamondPrice = 0;
  public buildingHydrogenePrice = 0;
  public buildingEnergyPrice = 0;

  // <h1 class="name">{{buildingName}}</h1>
  // <p class="type"><span class="categoryTitle">Type : </span>Production</p>
  // <p class="level"><span class="categoryTitle">Niveau :</span> 1</p>
  // <p class="capacity"><span class="categoryTitle">Taille : </span>2</p>
  // <p class="time"><span class="categoryTitle">Temps de construction : </span>10 min</p>
  // <p class="ressources"><span class="categoryTitle">Ressources nécessaires : </span>200 Fer 300 Hydrogène 100
  //     Diamant</p>
  // <p class="required"><span class="categoryTitle">Prérequis : </span>Recherche spatiale niveau 1</p>
  // <p class="description"><span class="categoryTitle">Description : </span>Permet de construire des vaisseaux
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
