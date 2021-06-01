import { Component } from '@angular/core';
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import {HttpHeaders, HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gameTitle = 'FHTW PUZZLE GAME';
  loginStatus = false;
  showMenu = false;

  constructor(
    private loginService: LoginService, 
    private router: Router,
    private http: HttpClient,) {}
  
  ngOnInit(): void {
    this.init();
  }

  init(){
    this.loginService.checkLogin().subscribe(
      res => {  console.log(res); 
                this.loginStatus = true;}, 
      err => { console.log(err); });
  }

  logout(){
    this.http.post("http://localhost:3000/logout", {},{
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") || "",
      })
    })
    .subscribe((responseData) => { 
      console.log(responseData);
      localStorage.removeItem("token");
      this.loginStatus = false;
      this.router.navigateByUrl('/');
    });
  }
}
