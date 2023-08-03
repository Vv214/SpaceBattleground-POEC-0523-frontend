import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { WebsocketService } from '../app/services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  [x: string]: any;
  showNavBar = false;
  showFooter = false;

  constructor(private router: Router, private websocketService: WebsocketService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login' || event['url'] == '/home' || event['url'] == '/register' || event['url'] == '/') {
          this.showNavBar = false;
          this.showFooter = false;
        } else {
          this.showNavBar = true;
          this.showFooter = true;
        }
      }
    });
  }

  ngOnInit() {
    const socket = this.websocketService.getSocket();

    socket.on('register', (data) => {
      console.log('Received WebSocket event:', data);
      return data;
    });
  }
}
