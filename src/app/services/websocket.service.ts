import { Injectable } from '@angular/core';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket;
  constructor() {
    this.socket = io('http://localhost:8080/socket');
  }

  public getSocket() {
    return this.socket;
  }
}
