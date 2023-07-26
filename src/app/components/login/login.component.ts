import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router, private fb: FormBuilder) {}

  public incorectlogin: boolean = false;

  loginForm = this.fb.group({
    nickname: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    // check identifiants
    this.login();
  }

  toRegister() {
    this.router.navigate(['/', 'register']);

  }

  login() {
    // check si connecté
    console.log(this.loginForm.value);
    fetch("http://localhost:8080/login", {
      method: "post",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      //make sure to serialize your JSON body
      body: JSON.stringify(this.loginForm.value)
    }).then(response => {
      if (response.status === 200) {
        this.router.navigate(['/', 'overview']);
      } else
        this.isNotLogin();
    });
  };

  isNotLogin() {
    this.incorectlogin = true;
  }
}
