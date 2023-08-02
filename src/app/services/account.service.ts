import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  constructor() {}

  getNickname(token: string) {
    return fetch('http://localhost:8080/info', {
      method: 'GET',
      headers: {
        "x-token": token
      }
    })
  };

  logout(token: string) {
    console.log(token + "service authenticated");
    return fetch("http://localhost:8080/logout", {
      method: 'post',
      headers: {
        "x-token": token
      }
    })
  };

}