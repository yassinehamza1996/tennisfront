import { Component } from '@angular/core';
import { CoachService } from '../services/coach.service';
import { Observable } from 'rxjs';
import { Coach } from '../models/coach.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss']
})
export class CoachesComponent {

  coaches$ : Observable<Coach[]>
  constructor(private coachService: CoachService, private sanitizer: DomSanitizer) {
    this.coaches$ = this.coachService.getCoaches();
  }
  getCoachImage(coach: Coach): any {
    if (coach.image) {
      const imageBlob = this.dataURItoBlob(coach.image);
      const imageUrl = URL.createObjectURL(imageBlob);
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    } else {
      return 'assets/default-image.png'; // Provide a fallback image path if no image is available
    }
  }

  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}
