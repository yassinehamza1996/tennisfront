import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user.model';
import { environment } from 'src/environements/environement';
// Replace this with the correct path to your UserDTO model

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  registerUser(user: UserDTO): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/auth/register`, user,{ headers, responseType: 'text' as 'json' });
  }

  loginUser(user: UserDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, user);
  }
}
