import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ReservationDTO } from '../models/reservation';
import { environment } from 'src/environements/environement';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = environment.apiUrl+'/reservations'; // Replace with your API endpoint URL

  constructor(private http: HttpClient) {}

  getAllReservations(): Observable<ReservationDTO[]> {
    return this.http.get<ReservationDTO[]>(this.apiUrl);
  }

  getReservation(idReservation: number): Observable<ReservationDTO> {
    const url = `${this.apiUrl}/${idReservation}`;
    return this.http.get<ReservationDTO>(url);
  }

  createReservation(reservationDTO: ReservationDTO): Observable<number> {
    return this.http.post<number>(this.apiUrl, reservationDTO, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    }).pipe(
      map(response => response.body)
    );
  }

  updateReservation(idReservation: number, reservationDTO: ReservationDTO): Observable<void> {
    const url = `${this.apiUrl}/${idReservation}`;
    return this.http.put<void>(url, reservationDTO, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteReservation(idReservation: number): Observable<void> {
    const url = `${this.apiUrl}/${idReservation}`;
    return this.http.delete<void>(url);
  }
}
