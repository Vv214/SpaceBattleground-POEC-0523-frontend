import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { PlanetService } from 'src/app/services/planet.service';

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

export interface Planets {
  data: {
    planet1: Planet;
    planet2: Planet;
    planet3: Planet;
    planet4: Planet;
    planet5: Planet;
    planet6: Planet;
    planet7: Planet;
    planet8: Planet;
    planet9: Planet;
    planet10: Planet;

    [planetName: string]: Planet;
  };
}

export interface Planet {
  name: string;
  positionX: number;
  positionY: number;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public token!: string;
  public iron: number = 0;
  public diamond!: number | null;
  public hydrogene!: number;
  public energy!: number;
  public currentTime: Date = new Date();
  public spaceHour: number = 32;
  public spaceMinute: number = 0;
  public spaceSecond: number = 0;
  public planetName: string = 'Alzuland';
  public positionX: number = 19;
  public positionY: number = 8;
  public planet1!: string;
  public planet2!: string;
  public planet3!: string;
  public planet4!: string;
  public planet5!: string;
  public planet6!: string;
  public planet7!: string;
  public planet8!: string;
  public planet9!: string;
  public planet10!: string;

  constructor(private router: Router, public navbarService: NavbarService, private planetService: PlanetService) {
    setInterval(() => {
      this.currentTime = new Date();
      this.spaceSecond = this.currentTime.getSeconds();
      // this.spaceHour = this.currentTime.getHours() + 10;
      this.spaceMinute = this.currentTime.getMinutes();

      // if ((this.spaceSecond = 60)) {
      //   this.spaceMinute = this.spaceMinute + 1;
      // }

      // if ((this.spaceMinute == 60)) {
      //   this.spaceHour = this.spaceHour + 1;
      //   this.spaceMinute = 0;
      // }

      if (this.spaceHour == 42) {
        this.spaceHour = 0;
      }

      if (this.spaceMinute == 59 && this.spaceSecond == 59) {
        this.spaceHour = this.spaceHour + 1;
      }

      // this.spaceSecond = this.spaceSecond + 1;
    }, 1);
  }

  getSpaceHours() {
    const d = new Date();
    let hour = d.getHours();
    return hour;
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

  checkPlanetInfo(token: string) {
    return fetch('http://localhost:8080/planet', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-token': token,
      },
    });
  }

  updatePlanetNameInUI() {
    this.planetName = this.planetService.planetList[this.planetService.planetId].name;
    return this.planetName;
  }

  updatePositionXInUI() {
    this.positionX = this.planetService.planetList[this.planetService.planetId].positionX;
    return this.positionX;
  }

  updatePositionYInUI() {
    this.positionY = this.planetService.planetList[this.planetService.planetId].positionY;
    return this.positionY;
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('x-token') ?? '';
    this.checkQuantityRessource(this.token);
    // this.checkPlanetInfo(this.token);
    let ressources: Ressources = JSON.parse(localStorage.getItem('ressources') ?? '');
    // let planets: Planets = JSON.parse(localStorage.getItem('planets') ?? '');
    this.iron = ressources.data.iron.quantity;
    this.diamond = ressources.data.diamond.quantity;
    //+(localStorage.getItem('ressources').diamond.quantity ?? 0);
    this.hydrogene = ressources.data.hydrogene.quantity;
    this.energy = ressources.data.energy.quantity;
    // this.planetService.planetName = planets.data[planetName].name;
    this.planetName = this.planetService.planetName;

    // this.planet2 = planets.data.planet2.name;
    // this.planet3 = planets.data.planet3.name;
    // this.planet4 = planets.data.planet4.name;
    // this.planet5 = planets.data.planet5.name;
    // this.planet6 = planets.data.planet6.name;
    // this.planet7 = planets.data.planet7.name;
    // this.planet8 = planets.data.planet8.name;
    // this.planet9 = planets.data.planet9.name;
    // this.planet10 = planets.data.planet10.name;
  }
}
