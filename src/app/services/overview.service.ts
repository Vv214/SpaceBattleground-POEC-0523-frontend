import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  getConstruction(token: string) {
    return fetch("http://localhost:8080/building", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-token': token
      }
    })
  };

  getResearch(token: any) {
    return fetch('http://localhost:8080/technologie', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-token': token,
      },
    });
  }

  constructor() { }
}
