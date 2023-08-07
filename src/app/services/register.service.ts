import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() {}

  addUser(registerForm: FormGroup) {
    return fetch("http://localhost:8080/register", {
      method: "post",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerForm.value)
    })
  };
}
