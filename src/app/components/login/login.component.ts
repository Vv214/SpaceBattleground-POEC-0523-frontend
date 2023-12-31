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

  incorectlogin: boolean = false;
  alreadyInBase: boolean = false;

  // token?: string;


  loginForm = this.fb.group({
    nickname: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {

    this.loginService.login(this.loginForm)
      .then(response => {
        if (response.status === 200) {
          response.json().then(body => {
            if (body.data.token === null || body.data.token === '') {
              console.log("Bad token received");
            } else {
              localStorage.setItem('nickname', this.loginForm.value.nickname ?? '');
              localStorage.setItem('x-token', body.data.token);
              this.router.navigate(['/', 'overview']);
            }
          })
        } else if (response.status === 400) {
          this.alreadyInBase = true;
          this.router.navigate(['/', 'register']);
        } else
          this.incorectlogin = true;
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
