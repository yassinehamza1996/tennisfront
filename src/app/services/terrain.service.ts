import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environements/environement';
import { Terrain } from '../models/terrain.model';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllTerrains(): Observable<Terrain[]> {
    return this.http.get<Terrain[]>(`${this.baseUrl}/terrains`);
  }

  getTerrain(idTerrain: number): Observable<Terrain> {
    return this.http.get<Terrain>(`${this.baseUrl}/terrains/${idTerrain}`);
  }

  createTerrain(terrain: Terrain): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/terrains`, terrain);
  }

  updateTerrain(idTerrain: number, terrain: Terrain): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/terrains/${idTerrain}`, terrain);
  }

  deleteTerrain(idTerrain: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/terrains/${idTerrain}`);
  }
}
