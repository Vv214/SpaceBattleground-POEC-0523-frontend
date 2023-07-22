import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  constructor(private router: Router) {}

  toMessages() {
    this.router.navigate(['/', 'messages']);
  }

  logout() {
    this.router.navigate(['/', 'home']);
  }
}
