import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from './passwordValidator';
import { RegisterService } from '../../services/register.service';

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
    confirmPassword: ['', [Validators.required, passwordValidator('password', 'confirmPassword')] // Vérifie que les deux mots de passe sont identiques
    ]
  });



  constructor(private router: Router, private fb: FormBuilder, public registerService: RegisterService) {};


  alreadyInBase = true;
  onSubmit() {
    // création compte
    this.registerService.addUser(this.registerForm)
      .then(response => {
        if (response.status === 200) {
          this.router.navigate(['/', 'overview']);
        } else
          this.router.navigate(['/', 'register']);
      });
  }
  login() {
    // redirection login
    this.router.navigate(['/', 'login']);

  }
}