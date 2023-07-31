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

  public nicknameLocal!: string;

  constructor(private router: Router, private fb: FormBuilder) {};


  alreadyInBase = true;
  onSubmit() {
    // création compte
    this.addUser();
    this.updateLocalStorage();
    console.log(this.registerForm.value.nickname + "Toto");
    this.router.navigate(['/', 'overview']);
  }

  login() {
    // redirection login
    this.updateLocalStorage();
    this.router.navigate(['/', 'login']);

  }

  addUser() {
    // console.log(this.registerForm.value);
    fetch("http://localhost:8080/register", {
      method: "post",

      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      //make sure to serialize your JSON body
      body: JSON.stringify(this.registerForm.value)
    }).then(response => console.log(response + " response"));
  };

  updateLocalStorage(): void {
    console.log("dans la méthode update local storage", localStorage.getItem("nickname"));
    this.nicknameLocal = this.registerForm.value.nickname || " ";
    console.log("dans la méthode update local storage après la maj", this.nicknameLocal);
  }
}
      body: JSON.stringify(this.registerForm.value),
    }).then((response) => console.log(response));
  }
}
