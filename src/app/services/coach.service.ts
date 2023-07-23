import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coach } from '../models/coach.model';
import { environment } from 'src/environements/environement';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getCoaches(): Observable<Coach[]> {
    return this.http.get<Coach[]>(this.apiUrl + '/coaches');
  }

  getCoach(id: number): Observable<Coach> {
    const url = `${this.apiUrl + '/coaches'}/${id}`;
    return this.http.get<Coach>(url);
  }

  createCoach(coach: Coach): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/coaches', coach);
  }

  updateCoach(id: number, coach: Coach): Observable<void> {
    const url = `${this.apiUrl + '/coaches'}/${id}`;
    return this.http.put<void>(url, coach);
  }

  deleteCoach(id: number): Observable<void> {
    const url = `${this.apiUrl + '/coaches'}/${id}`;
    return this.http.delete<void>(url);
  }

  deleteAll(coachList : number[]): Observable<any> {
    const url = `${this.apiUrl + '/coaches'}/deleteAll`;
    return this.http.delete<void>(url,{body : coachList});
  }
}
