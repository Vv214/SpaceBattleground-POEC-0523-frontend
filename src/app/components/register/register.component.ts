import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent {

  registerForm = this.fb.group({
    nickname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  constructor(private router: Router, private fb: FormBuilder) {};

  onSubmit() {
    // création compte
    this.addUser();
    // console.log(this.registerForm.value.nickname + "Toto");
    this.router.navigate(['/', 'overview']);
  }

  login() {
    // redirection login
    this.router.navigate(['/', 'login']);
  }

  addUser() {
    console.log(this.registerForm.value);
    fetch("http://localhost:8080/register", {
      method: "post",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      //make sure to serialize your JSON body
      body: JSON.stringify(this.registerForm.value)
    }).then(response => console.log(response));
  };
}


