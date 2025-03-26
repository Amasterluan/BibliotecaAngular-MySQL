import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product } from '../data-types';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  cartData = new EventEmitter<product[] | []>();
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

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
    console.log('Atualizando produto com os dados:', productData); // Verifique os dados que estão sendo enviados
    return this.http.put(`${this.apiUrl}/${id}`, productData);
  }

  searchProducts(query: string): Observable<product[]> {
    return this.http
      .get<product[]>(`${this.apiUrl}/`, {
        params: { query: query },
      })
      .pipe(
        catchError((error) => {
          console.error('Erro na busca:', error);
          // Retorna array vazio e log adicional
          console.log(
            'URL da requisição:',
            `${this.apiUrl}search?query=${query}`
          );
          return of([]);
        })
      );
  }
}
