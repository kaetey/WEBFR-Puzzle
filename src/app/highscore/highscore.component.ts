import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

interface IHighscoreResponse {
  username: string;
  score: number;
}

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent implements OnInit {
  displayedColumns: string[] = ["username", "score"];
  dataSource:IHighscoreResponse[] = [];

  constructor(private http: HttpClient,) { }

  ngOnInit(): void {
    this.http.get("http://localhost:3000/highscore")
    .subscribe((responseData: IHighscoreResponse[]) => {
      //console.log(responseData);
      this.dataSource = responseData;
    });
  }

}