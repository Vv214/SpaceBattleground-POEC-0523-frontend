import { Component, OnInit } from '@angular/core';
import { AlliancesService } from './../../../../services/alliances.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cretated-alliances',
  templateUrl: './cretated-alliances.component.html',
  styleUrls: ['./cretated-alliances.component.scss']
})
export class CretatedAlliancesComponent implements OnInit {


  constructor(private router: Router) {}

  ngOnInit(): void {
    const alliances = ["toto", "tata"];
    let toto: string;

  }
  onsubmit() {
      
   }
}
