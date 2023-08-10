import { Injectable } from '@angular/core';

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

  constructor() {}
}
