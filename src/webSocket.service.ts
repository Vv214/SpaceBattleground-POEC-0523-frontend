import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable()
export class WebsocketService {
  private serverUrl = 'http://localhost:8080/socket';
  private stompClient: any;
  public mapEndpointSubscription: Map<string, any> = new Map();

  public async initWebSocket() {
    return new Promise<void>((resolve) => {
      if (!this.stompClient) {
        const ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        this.stompClient.connect({}, resolve);
      } else {
        resolve();
      }
    });
  }
}
