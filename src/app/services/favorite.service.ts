import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = 'http://localhost:3000/api/favorite';

  constructor(private http: HttpClient) {}

  addFavorite(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  deleteFavorite(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getFavorites(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
