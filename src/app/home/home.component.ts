
import { Component } from '@angular/core';
import { imageModel } from '../models/image.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router : Router) {}

  images: imageModel[] = [
    { path: 'tennis-court1', caption: 'Tennis Courts' , screenId : 'courts'},
    { path: 'tennis-course', caption: 'Tennis Courses' , screenId : 'courses'},
    { path: 'tennis-booking', caption: 'Book Court' , screenId : 'booking'} 
  ];

  courselDetail(image : imageModel){
    console.log(image)
    this.router.navigate([image.screenId])
  }
}
