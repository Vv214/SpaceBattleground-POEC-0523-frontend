import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private API_URL = 'http://localhost:8080/clan';

  constructor(private http: HttpClient) { }

  // Method pour controler si le joueur fait partie d'une alliance
  isPlayerInAlliance(playerId: string): Observable<boolean> {
    return this.http.get<any>(`${this.API_URL}/players/${playerId}/alliance`).pipe(
      map(response => !!response.allianceId) 
    );
  }

  // Method pour créer une alliance
  createAlliance(playerId: string, allianceName: string): Observable<any> {
    return this.http.post(`${this.API_URL}/alliance`, { 
      leaderId: playerId, 
      name: allianceName 
    });
  }

  // Method pour créer une alliance si le joueur n'en fait pas déjà partie
  createAllianceIfNotInOne(playerId: string, allianceName: string): Observable<any> {
    return this.isPlayerInAlliance(playerId).pipe(
      switchMap(inAlliance => {
        if (inAlliance) {
          throw new Error('Le joueur est déjà dans une alliance');
        } else {
          return this.createAlliance(playerId, allianceName);
        }
      })
    );
  }
}

