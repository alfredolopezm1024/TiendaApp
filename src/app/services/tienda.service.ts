import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tienda } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

    private apiUrl: string = `${environment.api}/tienda/`;
    
    constructor(private http: HttpClient) { }
  
    getAll() : Observable<Tienda[]> {
      return this.http.get<Tienda[]>(this.apiUrl);
    }
  
    getById(id: number): Observable<Tienda> {
      return this.http.get<Tienda>(`${this.apiUrl}${id}`);
    }

    getArticulosByTiendaId(id: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}${id}/articulos`);
    }

    create(tienda: Tienda): Observable<Tienda> {
      return this.http.post<Tienda>(this.apiUrl, tienda);
    }

    update(id: number, tienda: Tienda): Observable<Tienda> {
      return this.http.put<Tienda>(`${this.apiUrl}${id}`, tienda);
    }

    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}${id}`);
    }
}
