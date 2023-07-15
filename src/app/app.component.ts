import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Car } from './models/cars.model';
import { CarBrandsList } from './models/carsbrand.model';
import { CarService } from './services/carBrandsService.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {
 constructor(){}
}
