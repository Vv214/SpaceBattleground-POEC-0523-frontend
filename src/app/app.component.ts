import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showNavBar: boolean = false;
  showFooter: boolean = false;

  ngOnInit() {}

  constructor(private router: Router) {
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
}
