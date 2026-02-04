import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginDTO, LoginResponseDTO } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private apiUrl: string = `${environment.api}/login/`;

  constructor(private http: HttpClient) { }

  login(login: LoginDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(this.apiUrl, login);
  }

  setSession(data: LoginResponseDTO): void {
    localStorage.clear();

    localStorage.setItem('token', data.token);
    localStorage.setItem('correo', data.correo);
    localStorage.setItem('id', data.id.toString());
  }

  isLogged(): boolean {
  if (localStorage.getItem('token'))
    return true;
  else
    return false;
}

  logout(): void {
    localStorage.clear();
  }
  

}