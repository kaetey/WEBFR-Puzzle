import { Component } from '@angular/core';
import { LoginService } from "./login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gameTitle = 'FHTW PUZZLE GAME';
  loggedIn = false; 
  logout = '<a href="/logout" mat-button>Logout</a>';
  login = '<a href="/login" mat-button>Login</a>'+
          '<a href="/signup" mat-button>Sign Up</a>';

  constructor(private loginService: LoginService,) {}
  
  ngOnInit(): void {
    let checkLogin = this.loginService.checkLogin();
    console.log(checkLogin);
  }

}
