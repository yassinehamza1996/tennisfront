import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user.model';
import { environment } from 'src/environements/environement';
// Replace 'path-to-user-model' with the actual path to your UserDTO model

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl+'/users'; // Replace this with your backend API base URL

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.baseUrl);
  }

  getUser(idUser: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.baseUrl}/${idUser}`);
  }

  getUserByUsername(username: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.baseUrl}/finduser/${username}`);
  }

  createUser(userDTO: UserDTO): Observable<number> {
    return this.http.post<number>(this.baseUrl, userDTO);
  }

  updateUser(idUser: number, userDTO: UserDTO): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${idUser}`, userDTO);
  }

  deleteUser(idUser: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idUser}`);
  }

}
