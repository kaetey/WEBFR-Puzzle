import { Component, OnInit } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";

interface ILoginResponse{
  messagen: string;
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginTitle:string = "Login für FHTW Puzzle Game";
  hide = true;
  httpOptions = { headers: new HttpHeaders({ "Content-Type" : "application/json" }) };

  constructor(private http: HttpClient, private router: Router,) { }

  ngOnInit(): void {
  }

  submit(loginData: NgForm): any {

    this.http.post("http://localhost:3000/login", {
      email: loginData.value.email,
      password: loginData.value.password}, this.httpOptions)
    .subscribe((responseData: ILoginResponse) => { 
      console.log(responseData); 
      localStorage.setItem("token", responseData.token);
      this.router.navigate(["/puzzle"]);
    });
  }
}
