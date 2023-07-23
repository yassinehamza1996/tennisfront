import { Component } from '@angular/core';
import { TerrainService } from '../services/terrain.service';
import { Observable } from 'rxjs';
import { Terrain } from '../models/terrain.model';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-courts',
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.scss'],
})
export class CourtsComponent {
  terrainList : Terrain[]=[]
  thumbnail : any
  constructor(private terrainService: TerrainService,private router : Router , private sanitizer: DomSanitizer) {
    this.terrainService.getAllTerrains().subscribe(res=>{
      this.terrainList = res;
      res.forEach((baseImage) => {
        let objectURL = 'data:image/jpeg;base64,' + baseImage.image;
        this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        baseImage.image = this.thumbnail;
      });
    })
  }

  showCourtDetail(event : Terrain){
    console.log(event)
    this.router.navigate(['courtdetail/'+event.idTerrain])
  }
}
