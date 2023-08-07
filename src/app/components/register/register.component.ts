import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { passwordValidator } from './passwordValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    nickname: ['', Validators.required],
    email: ['', Validators.required],
    // password: ['', Validators.required],
    // confirmPassword: ['', Validators.required],

    password: this.fb.group(
      {
        password: [''],
        confirmPassword: [''],
      },
      {
        validator: passwordValidator('password', 'confirmPassword'), // Vérifie que les deux mots de passe sont identiques
      }
    ),
  });

  constructor(private router: Router, private fb: FormBuilder) {}

  alreadyInBase = true;
  onSubmit() {
    // création compte
    this.addUser();
    console.log(this.registerForm.value.nickname + 'Toto');
    this.router.navigate(['/', 'overview']);
  }

  login() {
    this.router.navigate(['/', 'login']);
  }

  addUser() {
    // console.log(this.registerForm.value);
    fetch('http://localhost:8080/player', {
      method: 'post',

      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      //make sure to serialize your JSON body
      body: JSON.stringify(this.registerForm.value),
    }).then((response) => console.log(response));
  }
}
