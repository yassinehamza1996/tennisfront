import { Component } from '@angular/core';
import { TerrainService } from '../services/terrain.service';
import { Observable } from 'rxjs';
import { Terrain } from '../models/terrain.model';

@Component({
  selector: 'app-courts',
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.scss'],
})
export class CourtsComponent {
  terrainList$: Observable<Terrain[]>;
  constructor(private terrainService: TerrainService) {
    this.terrainList$ = this.terrainService.getAllTerrains();
  }

  showCourtDetail(event){
    console.log(event)
  }
}
