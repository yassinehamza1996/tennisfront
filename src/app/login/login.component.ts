import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  valCheck: string[] = ['remember'];

  password!: string;
  email : string;
  constructor() { }
  loginIn(){
    if(this.email == 'admin' && this.password == 'Admin123'){
      console.log(this.email)
      console.log(this.password)
      alert('logged in successfully !')
    }
  }
}
