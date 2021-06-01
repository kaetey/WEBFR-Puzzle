import { Component, OnInit } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {  FormControl, NgForm, NgModel, Validators, FormsModule } from '@angular/forms';
import {Router} from "@angular/router";
import { AppComponent} from "../app.component";
import { MatSnackBar } from '@angular/material/snack-bar';

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
  loginTitle:string = "Login for FHTW Puzzle Game";
  hide = true;
  httpOptions = { headers: new HttpHeaders({ "Content-Type" : "application/json" }) };
  showMenu = true;

  errorEmail = true;
  errorPassword = true;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private app: AppComponent,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void { 
    if(this.router.url != "/")this.showMenu = false;
    else this.showMenu = true;
  }

  validateEmail(email: NgForm){
    let validator = new FormControl(email.value, [Validators.required, Validators.email]);
    if(validator.hasError('required')) {
      this.errorEmail = true;
      return "Please enter an email!";
    }
    if(validator.hasError('email')){
      this.errorEmail = true;
      return "Invalid Email!";
    }
    this.errorEmail = false;
  }

  validatePassword(password: NgModel){
    let validator = new FormControl(password.value, [Validators.required]);
    if(validator.hasError('required')) {
      this.errorPassword = true;
      return "Please enter a password!";
    }
    if(password.errors != null){
      if(password.errors.minlength.actuallength < 8){
        this.errorPassword = true;
        return "Password not long enough!";
      }
    }
    this.errorPassword= false;
  }

  submit(loginData: NgForm): any {
    if((loginData.value.email == "" && loginData.value.password == "") || this.errorEmail || this.errorPassword){
      alert("Login is incomplete!");
    }else{
      this.http.post("http://localhost:3000/login", {
        email: loginData.value.email,
        password: loginData.value.password}, this.httpOptions)
      .subscribe( 
        (responseData: ILoginResponse) => {
          //console.log(responseData); 
          localStorage.setItem("token", responseData.token);
          this.app.init();
          this.router.navigateByUrl('/');
        },
        (error) => {
          this.alertUser(error);
        }
      );
    }
  }

  alertUser(error){
    /*console.log("error");
    console.log(error); 
    console.log(error.error.error);*/
    this.snackBar.open(error.error.error, "Close");
  }
}
