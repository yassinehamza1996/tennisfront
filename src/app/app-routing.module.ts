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

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'courts', component: CourtsComponent },
  { path: 'courtdetail/:id', component: CourtDetailsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'coaches', component: CoachesComponent },
  { path: 'addcoach', component: AddCoachComponent },
  { path: 'managecoaches', component: ManageCoachesComponent },
  { path: 'editcoach/:id', component: AddCoachComponent },
  { path: 'terms', component: TermsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
