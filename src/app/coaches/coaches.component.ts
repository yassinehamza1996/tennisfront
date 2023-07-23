import { Component } from '@angular/core';
import { CoachService } from '../services/coach.service';
import { Observable } from 'rxjs';
import { Coach } from '../models/coach.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss'],
})
export class CoachesComponent {
  thumbnail: any;
  coaches$: Observable<Coach[]>;
  coachList : Coach[]=[]
  constructor(
    private coachService: CoachService,
    private sanitizer: DomSanitizer
  ) {
    // this.coaches$ = this.coachService.getCoaches();
   this.coachService.getCoaches().subscribe((res) => {
    this.coachList = res;
      res.forEach((baseImage) => {
        let objectURL = 'data:image/jpeg;base64,' + baseImage.image;
        this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        baseImage.image = this.thumbnail;
      });
    });
   console.log(this.coachList)
  }


  sanitizeImages(baseImage : any){
        let objectURL = 'data:image/jpeg;base64,' + baseImage.image;
        this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
}
