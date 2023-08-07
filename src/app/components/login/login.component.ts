import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router, private fb: FormBuilder, public loginService: LoginService) {}

  incorectlogin = false;
  alreadyInBase = false;

  loginForm = this.fb.group({
    nickname: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    // check identifiants
    this.loginService.login(this.loginForm).then((response) => {
      if (response.status === 200) {
        localStorage.setItem('nickname', this.loginForm.value.nickname ?? '');
        this.router.navigate(['/', 'overview']);
      } else if (response.status === 400) {
        this.alreadyInBase = true;
        this.router.navigate(['/', 'regiser']);
      } else this.incorectlogin = true;
    });
  }

  toRegister() {
    this.router.navigate(['/', 'register']);
  }

  login() {
    // check si connecté
    console.log(this.loginForm.value);
    fetch('http://localhost:8080/login', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      //make sure to serialize your JSON body
      body: JSON.stringify(this.loginForm.value),
    }).then((response) => {
      if (response.status === 200) {
        this.router.navigate(['/', 'overview']);
      } else this.isNotLogin();
    });
  }

  isNotLogin() {
    this.incorectlogin = true;
  }
}
