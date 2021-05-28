import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';

interface Message{
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpOptions = { headers: new HttpHeaders({ "Content-Type" : "application/json" }) };

  constructor(private http: HttpClient,) { }

  checkLogin(): Message{
    let check:Message;

    this.http.post("http://localhost:3000/authentication", {},{
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") || "",
      })
    })
    .subscribe((responseData: Message) => { 
      console.log(responseData.message);
      check = responseData;
    });

    return check;
  }
}
