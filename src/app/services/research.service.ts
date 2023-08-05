import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {
  getResearchInfo(token: any) {
    return fetch("http://localhost:8080/technologie", {
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
