import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router) {}

  // loginForm = this.fb.group({
  //   email: ['', [Validators.required]],
  //   password: ['', [Validators.required]],
  // });

  onSubmit() {
    // check identifiants
    this.router.navigate(['/', 'overview']);
  }

  register() {
    // check si connecté
    this.router.navigate(['/', 'register']);
  }
}
