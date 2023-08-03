import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BuildService } from 'src/app/services/build.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss'],
})
export class BuildingsComponent {
  constructor(public dialog: MatDialog) {}

  openBuildingDetail() {
    const dialogRef = this.dialog.open(buildingDetail);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // openBuildingBuild() {
  //   const dialogRef = this.dialog.open(buildingBuild);
  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
}

@Component({
  selector: 'buildingDetail',
  templateUrl: 'buildingDetail.html',
  styleUrls: ['buildingDetail.scss'],
})
export class buildingDetail {
  constructor(public dialog: MatDialog, public router: Router, private buildService: BuildService) {}

  openBuildingBuild() {
    const dialogRef = this.dialog.open(buildingBuild);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  isBuilt = true;
  chantier = false;

  openBuildingDestroy() {
    const dialogRef = this.dialog.open(buildingDestroy);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toShipyard() {
    this.router.navigate(['/', 'shipyard']);
  }
}

@Component({
  selector: 'buildingBuild',
  templateUrl: 'buildingBuild.html',
  styleUrls: ['buildingBuild.scss'],
})
export class buildingBuild implements OnInit {
  constructor(public dialog: MatDialog, public router: Router, private buildService: BuildService) {}
  public token!: string;
  // ferJoueur = 2000;
  // hydrogeneJoueur = 2000;
  // diamantJoueur = 2000;
  // ferRequis = 200;
  // hydrogeneRequis = 200;
  // diamantRequis = 200;

  buildBuilding(token: string) {
    console.log(token);
    this.buildService.buildBuilding(token).then((response) => {
      if (response.status === 200) {
        console.log('building created');
      } else {
        console.log(token + ' failed token');
      }
    });
  }

  ngOnInit() {
    this.token = localStorage.getItem('x-token') ?? '';
  }

  // buildBuilding() {
  //   // create building with userID

  //   // batiment = currentPlayer.batiment

  //   if (
  //     this.ferJoueur > this.ferRequis &&
  //     this.hydrogeneJoueur > this.hydrogeneRequis &&
  //     this.diamantJoueur > this.diamantRequis
  //   ) {
  //     this.ferJoueur = this.ferJoueur - this.ferRequis;
  //     this.hydrogeneJoueur = this.hydrogeneJoueur - this.hydrogeneRequis;
  //     this.diamantJoueur = this.diamantJoueur - this.diamantRequis;
  //     // timer batiment
  //     // post batiment
  //     // batiment.isBuilt = true;
  //   }
  // }

  isBuilt = true;
  upgradeBuilding() {
    // upgrade building with userID
  }
}

@Component({
  selector: 'buildingDestroy',
  templateUrl: 'buildingDestroy.html',
  styleUrls: ['buildingDestroy.scss'],
})
export class buildingDestroy {
  destroyBuilding() {
    // delete building with userID
    // batiment = currentPlayer.batiment
    //delete batiment
    // ferJoueur = ferJoueur + ferRequis/10;
    // hydrogeneJoueur = hydrogeneJoueur + hydrogeneRequis/10;
    // diamantJoueur = diamantJoueur + diamantRequis/10;
  }
}
