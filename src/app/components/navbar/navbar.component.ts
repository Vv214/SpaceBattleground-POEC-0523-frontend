import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { Subscription, timer } from "rxjs";

export interface Ressources {
  data: {
    iron: Ressource;
    diamond: Ressource;
    hydrogene: Ressource;
    energy: Ressource;
  };
}

export interface Ressource {
  quantity: number;
  maxStock: number;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public token!: string;
  public iron: number = 0;
  public diamond!: number | null;
  public hydrogene!: number;
  public energy!: number;
  public time = new Date();
  public intervalId !: any;
  public subscription: Subscription | undefined;
  constructor(private router: Router, public navbarService: NavbarService) {}
  
  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toMessages() {
    this.router.navigate(['/', 'messages']);
  }

  toAccount() {
    this.router.navigate(['/', 'account']);
  }

  checkQuantityRessource(token: string) {
    this.navbarService.checkQuantityRessource(token).then((response) => {
      if (response.status === 200) {
        response.json().then((body: Ressources) => {
          localStorage.setItem('ressources', JSON.stringify(body));
        });
      }
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('x-token') ?? '';
    this.checkQuantityRessource(this.token);
    let ressources: Ressources = JSON.parse(localStorage.getItem('ressources') ?? '');
    this.iron = ressources.data.iron.quantity;
    this.diamond = ressources.data.diamond.quantity;
    //+(localStorage.getItem('ressources').diamond.quantity ?? 0);
    this.hydrogene = ressources.data.hydrogene.quantity;
    this.energy = ressources.data.energy.quantity;
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
}
