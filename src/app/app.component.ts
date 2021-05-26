import { Component } from '@angular/core';

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
  
}
