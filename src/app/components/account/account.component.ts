import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  constructor(private router: Router, public playerService: PlayerService) {}

  public nickname = localStorage.getItem('nickname');
  public toto() {
    console.log(this.nickname);
  }

  toMessages() {
    this.router.navigate(['/', 'messages']);
  }

  toRanking() {
    this.router.navigate(['/', 'ranking']);
  }

  toAdmin() {
    this.router.navigate(['/', 'admin']);
  }

  logout() {
    this.router.navigate(['/', 'home']);
  }

  onInit() {
  }
}
