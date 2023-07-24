import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private router: Router) {}

  onSubmit() {
    // création compte
    this.router.navigate(['/', 'overview']);
  }

  login() {
    // redirection login
    this.router.navigate(['/', 'login']);
  }
}
