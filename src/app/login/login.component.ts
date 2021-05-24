import { Component, OnInit } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginTitle:string = "Login für FHTW Puzzle Game";
  hide = true;
  httpOptions = { headers: new HttpHeaders({ "Content-Type" : "application/json" }) };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  submit(loginData: NgForm): any {
    var email = loginData.value.email;
    var password = loginData.value.password;
    this.http.post("http://localhost:3000/login", {email: email, password: password}, this.httpOptions)
    .subscribe((responseData) => { console.log(responseData); });
  }
}
