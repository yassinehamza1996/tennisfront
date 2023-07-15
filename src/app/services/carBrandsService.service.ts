import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarBrandsList } from '../models/carsbrand.model';



@Injectable({
  providedIn: 'root'
})
export class CarService {
  private carBrandsUrl = 'assets/carBrands.json';

  constructor(private http: HttpClient) {}

  fillCarBrandsList(): Observable<CarBrandsList[]> {
    return this.http.get<CarBrandsList[]>(this.carBrandsUrl);
  }
}
