import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CourtsComponent } from './courts/courts.component';
import { CourtDetailsComponent } from './court-details/court-details.component';
import { CoursesComponent } from './courses/courses.component';
import { CoachesComponent } from './coaches/coaches.component';
import { AddCoachComponent } from './add-coach/add-coach.component';
import { ManageCoachesComponent } from './manage-coaches/manage-coaches.component';
import { TermsComponent } from './terms/terms.component';
import { AuthGuard } from './services/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard] },
  { path: 'courts', component: CourtsComponent , canActivate: [AuthGuard] },
  { path: 'courtdetail/:id', component: CourtDetailsComponent , canActivate: [AuthGuard] },
  { path: 'courses', component: CoursesComponent , canActivate: [AuthGuard]},
  { path: 'coaches', component: CoachesComponent , canActivate: [AuthGuard]},
  { path: 'addcoach', component: AddCoachComponent , canActivate: [AuthGuard]},
  { path: 'managecoaches', component: ManageCoachesComponent , canActivate: [AuthGuard] },
  { path: 'editcoach/:id', component: AddCoachComponent , canActivate: [AuthGuard]},
  { path: 'profile/:id', component: ProfileComponent , canActivate: [AuthGuard]},
  { path: 'terms', component: TermsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
