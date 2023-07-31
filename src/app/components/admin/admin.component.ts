import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(private router: Router) {}

  toMessages() {
    this.router.navigate(['/', 'messages']);
  }

  toRanking() {
    this.router.navigate(['/', 'ranking']);
  }

  toAccount() {
    this.router.navigate(['/', 'account']);
  }

  logout() {
    this.router.navigate(['/', 'home']);
  }
}
