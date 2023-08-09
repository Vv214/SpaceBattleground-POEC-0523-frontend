import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showNavBar = false;
  showFooter = false;

  ngOnInit() {}

  constructor(private router: Router, private loginService: LoginService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login' || event['url'] == '/home' || event['url'] == '/register' || event['url'] == '/') {
          // this.loginService.showFooter = false;
          this.showNavBar = false;
          this.showFooter = false;
          // this.showFooter = this.loginService.showFooter;
        } else {
          // this.loginService.showFooter = true;
          this.showNavBar = true;
          this.showFooter = true;

          // this.showFooter = this.loginService.showFooter;
        }
      }
    });
  }
}
