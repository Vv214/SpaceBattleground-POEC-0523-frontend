import { Injectable } from '@angular/core';

export interface Ressources {
  diamond: Ressource;
  energy: Ressource;
  iron: Ressource;
  hydrogene: Ressource;
}

export interface Ressource {
  quantity: number;
  maxStock: number;
}

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  checkQuantityRessource(token: string) {
    return fetch("http://localhost:8080/ressource", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-token': token
      }
    })
  };

  constructor() {}
}
