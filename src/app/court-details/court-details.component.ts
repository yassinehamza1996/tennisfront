import { Component } from '@angular/core';
import { TerrainService } from '../services/terrain.service';
import { Observable } from 'rxjs';
import { Terrain } from '../models/terrain.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-court-details',
  templateUrl: './court-details.component.html',
  styleUrls: ['./court-details.component.scss'],
})
export class CourtDetailsComponent {
  isReloaded: boolean = false;
  terrainDetail$: Observable<Terrain> | null | undefined;
  constructor(
    private terrainService: TerrainService,
    private activeRoute: ActivatedRoute
  ) {
    let terrainId = this.activeRoute.snapshot.params['id'];
    if (terrainId) {
      this.terrainDetail$ = this.terrainService.getTerrain(terrainId);
    }
    const imgElement = document.querySelector('.card-img-top') as HTMLImageElement;
    if (imgElement) {
      window.location.reload();
    }
  }

}
