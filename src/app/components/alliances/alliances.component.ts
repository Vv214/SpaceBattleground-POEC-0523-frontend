import { FormGroup } from '@angular/forms';
import { AlliancesService } from './../../services/alliances.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-alliances',
  templateUrl: './alliances.component.html',
  styleUrls: ['./alliances.component.scss'],
})

export class AlliancesComponent {
  public name = '';
  public tag = '';
<<<<<<< HEAD
  private alliancesUrl = '/clan';
=======
>>>>>>> ce61ecfe11772f14fee9ebb9f62f8861b9a11afb
  public token = localStorage.getItem('x-token');

  addClanForm = this.fb.group({
    name: ['', [Validators.required]],
    tag: ['', [Validators.required]],
    nickname: ['', [Validators.required]],
  });

  constructor(private router: Router, private fb: FormBuilder) {}

<<<<<<< HEAD

=======
>>>>>>> ce61ecfe11772f14fee9ebb9f62f8861b9a11afb


  onSubmit() {

    // this.name = this.addClanForm.value.name ?? '';
    // this.tag = this.addClanForm.value.tag ?? '';

    console.log(this.addClanForm.value);
    //e.preventDefault();
    fetch("http://localhost:8080/clan", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'x-token': this.token ?? ''
      },
      //make sure to serialize your JSON body
      body: JSON.stringify(
        {
          "clanName": this.addClanForm.value.name,
          "clanTag": this.addClanForm.value.tag,
          "adminNickname": this.addClanForm.value.nickname
        })

    }).then(response => console.log(response));
  }

  toAlliancesPage() {
    this.router.navigate(['/created-alliances']);
  }
}

//   AllianceForm = this.fb.group({
//     allianceName: ['', [Validators.required]],
//     allianceTag: ['', [Validators.required]],
//   });


