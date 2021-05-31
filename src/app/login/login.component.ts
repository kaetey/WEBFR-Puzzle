import { Component, OnInit } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import { AppComponent} from "../app.component";

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
  showMenu = true;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private app: AppComponent,) { }

  ngOnInit(): void { 
    if(this.router.url != "/")this.showMenu = false;
    else this.showMenu = true;
  }

  submit(loginData: NgForm): any {

    this.http.post("http://localhost:3000/login", {
      email: loginData.value.email,
      password: loginData.value.password}, this.httpOptions)
    .subscribe((responseData: ILoginResponse) => { 
      console.log(responseData); 
      localStorage.setItem("token", responseData.token);
      this.app.init();
      this.router.navigateByUrl('/');
    });
  }
}
