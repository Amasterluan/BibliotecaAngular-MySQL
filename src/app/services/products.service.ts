import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product } from '../data-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartData = new EventEmitter<product[] | []>();
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  addProduct(data: product) {
    return this.http.post(`${this.apiUrl}`, data);
  }

  productList(): Observable<product[]> {
    return this.http.get<product[]>(`${this.apiUrl}`);
  }  

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

   // Método para buscar todos os produtos
  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Método para buscar um produto específico pelo ID
  getProductId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Método para atualizar um produto
  updateProduct(id: string, productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, productData);
  }

  searchProducts(query: string): Observable<product[]> {
    return this.http.get<product[]>(`${this.apiUrl}/search?q=${query}`);
  }
}
