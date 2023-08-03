import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BuildService {
  constructor() {}

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
