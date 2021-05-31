import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, NgModel, Validators, FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //hide = true;
  //isLoading = false;

  hide1 = true;
  hide2 = true;

  errorEmail = true;
  errorPassword = true;

  signupTitle:string = "Register now";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,) { }

  ngOnInit(): void {
  }
  //emailFormControl = new FormControl('', [
    //Validators.email,
    //Validators.required
  //]);

  //passwordFormControl = new FormControl('', [
    //Validators.required,
    //Validators.minLength(8)
  //]);
  //confirmPasswordFormControl = new FormControl('', [
    //Validators.required,
    //Validators.minLength(8)
  //]);

  validateEmail(email: NgModel){
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
      }
    }
    this.errorPassword= false;
  }

  comparePasswords(password: NgModel, confimPassword: NgModel){
    if(password.value != confimPassword.value){
      this.errorPassword = true;
      return "Passwords must match!";
    }
  }

  onSubmit(form: NgForm){
    if((form.value.email == "" && form.value.password == "") || this.errorEmail || this.errorPassword){
      alert("Registration is incomplete!");
    }else{
    console.log(form.value);
    this.http.post<{ message: string, token: string }>('http://localhost:3000/signup', form.value, this.httpOptions)
      .subscribe((responseData) => {
        console.log(responseData.message);
        console.log(responseData.token);
      });
    }
  }
}
