import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginTitle:string = "Login für FHTW Puzzle Game";
  hide = true;

  constructor() { }

  ngOnInit(): void {
  }

  submit(loginData:any): any {
    var email = loginData.form.value.email;
    var password = loginData.form.value.password;
    if(loginData.form.status == "INVALID")console.log("Login failed.");
    else if(loginData.form.status == "VALID"){
      console.log("Login successful");
      console.log("Username: " + email + ", Passwort: "+ password);
    }
  }
}
