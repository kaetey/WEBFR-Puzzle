import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http';


interface IProfileResponse {
  username: string;
  score: number;
  adress: string;
  city: string;
  postcode: number;
}
interface IHighscores {
  username: string;
  score: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileTitle:string = "My Profile";
  data:IHighscores[] = [];
  profile: IProfileResponse = {username: "", score:  0, adress: "", city: "", postcode: 0};
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
    .subscribe((responseData: IHighscores[]) => {
      this.data = responseData;
      for(let i = 0; i < this.data.length; i ++){
        if(this.data[i].username == this.profile.username){
          this.profile.score = this.data[i].score;
        }else{
          this.profile.score = 0;
        }
      }
      console.log(this.profile.score);
    });
  }
}
