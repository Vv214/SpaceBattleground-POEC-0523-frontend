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
}
