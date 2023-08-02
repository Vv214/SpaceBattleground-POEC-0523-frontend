import { AlliancesService } from './../../services/alliances.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alliances',
  templateUrl: './alliances.component.html',
  styleUrls: ['./alliances.component.scss'],
})

export class AlliancesComponent {

  public name = "";
  public tag = "";
  private alliancesUrl =  '/clan'

onSubmit (e: any) {

  this.name = e.target.name.value;
  this.tag = e.target.tag.value;

  e.preventDefault();
  fetch("http://localhost:8080/clan",{
    method: "POST",
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json'
        },
        //make sure to serialize your JSON body
        body: JSON.stringify({
            name: this.name,
            tag: this.tag,
        })
    }).then(response => console.log(response));
}
}
