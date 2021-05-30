import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

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
  
  displayedColumns: string[] = ["username", "score", "adress", "city", "postcode"];
  dataSource:IProfileResponse[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("http://localhost:3000/profile")
    .subscribe((responseData: IProfileResponse[]) => {
      //console.log(responseData);
      this.dataSource = responseData;
    });
  }

}
