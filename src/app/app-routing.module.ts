import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import{ LoginComponent } from "./login/login.component";
import { SignupComponent } from './signup/signup.component';
import { FaqComponent } from './faq/faq.component';
import { HighscoreComponent } from './highscore/highscore.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent,},
  { path: 'signup', component: SignupComponent },
  { path: 'highscore', component: HighscoreComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'puzzle', component: PuzzleComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
