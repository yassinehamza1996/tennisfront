import { Component } from '@angular/core';
import { TerrainService } from '../services/terrain.service';
import { Observable } from 'rxjs';
import { Terrain } from '../models/terrain.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courts',
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.scss'],
})
export class CourtsComponent {
  terrainList$: Observable<Terrain[]>;
  constructor(private terrainService: TerrainService,private router : Router) {
    this.terrainList$ = this.terrainService.getAllTerrains();
  }

  showCourtDetail(event : Terrain){
    console.log(event)
    this.router.navigate(['courtdetail/'+event.idTerrain])
  }
}
