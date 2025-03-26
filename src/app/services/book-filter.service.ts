
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookFilterService {
  private apiUrl = 'http://localhost:3000/api/livros';

  constructor(private http: HttpClient) {}

  getAllLivros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}