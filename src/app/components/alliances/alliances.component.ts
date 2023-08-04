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
  private alliancesUrl = '/clan';
  public token = localStorage.getItem('x-token');

  addClanForm = this.fb.group({
    name: ['', [Validators.required]],
    tag: ['', [Validators.required]],
    nickname: ['', [Validators.required]],
  });

  constructor(private router: Router, private fb: FormBuilder){

}

onSubmit () {

  // this.name = this.addClanForm.value.name ?? '';
  // this.tag = this.addClanForm.value.tag ?? '';

  console.log(this.addClanForm.value);
  //e.preventDefault();
  fetch("http://localhost:8080/clan",{
    method: "POST",
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
            'x-token': this.token ?? ''
        },
        //make sure to serialize your JSON body
        body: JSON.stringify(this.addClanForm.value)
        
    }).then(response => console.log(response));
}

toAlliancesPage(){
  this.router.navigate(['/created-alliances']);
}



}

