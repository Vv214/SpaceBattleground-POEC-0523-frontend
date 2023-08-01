import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { AccountService } from '../../services/account.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(private router: Router, public playerService: PlayerService, public accountService: AccountService) {}

  public token!: string;
  public nickname?: string;

  toMessages() {
    this.router.navigate(['/', 'messages']);
  }

  toRanking() {
    this.router.navigate(['/', 'ranking']);
  }

  toAdmin() {
    this.router.navigate(['/', 'admin']);
  }

  logout(token: string) {
    console.log(token);
    this.accountService.logout(token)
      .then(response => {
        if (response.status === 200) {
          this.router.navigate(['/', 'login']);
        } else {
          console.log(token + " failed token");
        }
      });
  }

  getNickname(token: string) {
    console.log(token);
    this.accountService.getNickname(token)
      .then(response => {
        if (response.status === 200) {
          response.json().then(body => {
            if (body.data.login === null || body.data.login === '') {
              console.log("bad tokene recieved");
            }
            else {
              console.log(body.data.login);
              localStorage.setItem('nickname', body.data.nickname);
              this.nickname = localStorage.getItem('nickname') ?? '';
            }
          })
        } else {
          console.log("bad tokene recieved");
        }
      });
  }

  ngOnInit() {
    this.token = localStorage.getItem('x-token') ?? '';
    this.getNickname(this.token);
  }
}



