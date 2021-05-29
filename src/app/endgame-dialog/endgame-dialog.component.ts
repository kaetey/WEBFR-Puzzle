import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from '@angular/router';

@Component({
  selector: 'app-endgame-dialog',
  templateUrl: './endgame-dialog.component.html',
  styleUrls: ['./endgame-dialog.component.css']
})
export class EndgameDialogComponent implements OnInit {
  gameScore: string;
  gameTime: string;

  constructor(
    private router: Router, 
    @Inject(MAT_DIALOG_DATA) data) 
  {
    this.gameScore = data.score;
    this.gameTime = data.time;
   }

  ngOnInit(): void {
  }

  redirectHighscoreBoard(){
    this.router.navigate(["/highscore"]);
  }
}
