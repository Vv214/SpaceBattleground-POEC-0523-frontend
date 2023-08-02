import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlliancesService {

  public alliancesUrl =  'http://localhost:8080/clan'

  constructor(private http: HttpClient) { }

  createAlliance(alliance : []) {


    return this.http.post(this.alliancesUrl, alliance);
    
  }

  getAlliance(id: number) {

    return this.http.get(`${this.alliancesUrl}/${id}`);
    
  }

  updateAlliance(id : number, alliance : []) {

    return this.http.put(`${this.alliancesUrl}/${id}`, alliance);
    
  }

  deleteAlliance(id: number) {

    return this.http.delete(`${this.alliancesUrl}/${id}`);
   
  }

  joinAlliance(id : number, player : any) {    // je ne suis pas sur de type any

    return this.http.put(`${this.alliancesUrl}/${id}/join`, player);
    
  }

  getPlayers(id: number) {

    return this.http.get(`${this.alliancesUrl}/${id}/players`);
    
  }

  sendResources(allianceId: number, playerId: number, resources : string) {

    return this.http.post(`${this.alliancesUrl}/${allianceId}/players/${playerId}/send-resources`, resources);
   
  }

}
