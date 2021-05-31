import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http';

interface IProfileResponse {
  username: string;
  score: number;
  adress: string;
  city: string;
  postcode: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileTitle:string = "My Profile";
  
  profile: IProfileResponse = {username: "",score:  0, adress: "", city: "", postcode: 0};
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.post("http://localhost:3000/profile",{},{
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") || "",
      })
    })
    .subscribe((responseData: IProfileResponse) => {
      console.log(responseData);
      this.profile = responseData;
    });
    this.http.get("http://localhost:3000/highscore")
    .subscribe((responseData) => {
      console.log(responseData);
      /*if(responseData.find(u => u.username === this.profile.username)){
        this.profile.score = u.score;
      };*/
    });
  }
}
