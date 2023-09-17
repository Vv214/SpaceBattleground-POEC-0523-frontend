import { Injectable } from '@angular/core';

export interface Researchs {
  data: {
    cargo: Research;
    protection: Research;
    astrophysique: Research;
    combustion: Research;
    impulsion: Research;

    fleet: Research;
    weapon: Research;
    laser: Research;

    fer: Research;
    hydrogene: Research;
    diamant: Research;
    plasma: Research;
    energie: Research;

    [researchName: string]: Research;
  };
}
export interface Research {
  name: string;
  description: string;
  level: number;

  ironPrice: number;
  diamondPrice: number;
  hydrogenPrice: number;
  energyPrice: number;

  coef_modifier: number;
  timeSearch: Date;
  timeToStart: Date;
  isDone: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class ResearchService {
  public researchName = '';
  public researchDescription = '';
  public researchLevel = 0;

  public researchNameSrc = '';
  public researchIsDone = false;

  public researchIronPrice = 0;
  public researchDiamondPrice = 0;
  public researchHydrogenPrice = 0;
  public researchEnergyPrice = 0;
  public cargoLevel!: number;
  public astrophysiqueLevel!: number;
  public protectionLevel!: number;
  public combustionLevel!: number;
  public impulsionLevel!: number;
  public fleetLevel!: number;
  public weaponLevel!: number;
  public laserLevel!: number;
  public ferLevel!: number;
  public hydrogeneLevel!: number;
  public diamantLevel!: number;
  public plasmaLevel!: number;
  public energieLevel!: number;

  getResearchInfo(token: any) {
    return fetch('http://localhost:8080/technologie', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-token': token,
      },
    });
  }


  getResearchLevelUp(token: string, researchName: string) {
    return fetch('http://localhost:8080/technologie/' + researchName + '/add', {
      method: 'PUT',
      headers: {
        'x-token': token,
      },
    }
    )
  }
  constructor() {}
}
