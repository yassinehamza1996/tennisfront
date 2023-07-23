import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import {RadioButtonModule} from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ListboxModule} from 'primeng/listbox';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';
import {ColorPickerModule} from 'primeng/colorpicker';
import {DropdownModule} from 'primeng/dropdown';
import { CarService } from './services/carBrandsService.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {CheckboxModule} from 'primeng/checkbox';
import {PasswordModule} from 'primeng/password';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CourtsComponent } from './courts/courts.component';
import { CourtDetailsComponent } from './court-details/court-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CoursesComponent } from './courses/courses.component';
import { CoachesComponent } from './coaches/coaches.component';
import { AddCoachComponent } from './add-coach/add-coach.component';
import {PanelModule} from 'primeng/panel';
import {FileUploadModule} from 'primeng/fileupload';
import { ManageCoachesComponent } from './manage-coaches/manage-coaches.component';
import { TooltipModule } from 'primeng/tooltip';
import {ToolbarModule} from 'primeng/toolbar';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CourtsComponent,
    CourtDetailsComponent,
    NavbarComponent,
    FooterComponent,
    CoursesComponent,
    CoachesComponent,
    AddCoachComponent,
    ManageCoachesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ListboxModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    CalendarModule,
    ColorPickerModule,
    DropdownModule,
    HttpClientModule,
    CheckboxModule,
    PasswordModule,
    NgbModule,
    PanelModule,
    FileUploadModule,
    TooltipModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [CarService,MessageService,ConfirmationService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
