import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../models/articulo.mode';
import { environment } from 'src/environments/environment';
import { ArticuloCreate } from '../models/dto/articulo.create';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private apiUrl: string = `${environment.api}/articulo/`;

  constructor(private http: HttpClient) { }

  getAll() : Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl);
  }

  getById(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.apiUrl}${id}`);
  }

  getTiendasByArticuloId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${id}/tiendas`);
  }

  create(articulo: Articulo): Observable<Articulo> {
    return this.http.post<Articulo>(this.apiUrl, articulo);
  }

  update(id: number, articulo: Articulo): Observable<Articulo> {
    return this.http.put<Articulo>(`${this.apiUrl}${id}`, articulo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

}
