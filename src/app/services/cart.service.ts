import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';  // Importação do operador map

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api/cart';  // URL base para as rotas do seu backend

  constructor(private http: HttpClient) {}

  // Retornar os itens do carrinho como um Observable
  getCartItems(userId: number) {
    return this.http.get<{ cartItems: any[] }>(`${this.apiUrl}/${userId}`).pipe(
      map(response => response.cartItems)  // Retorna apenas o array de itens
    );
  }
  
  // Adicionar um item ao carrinho
  addToCart(idusuario: number, idlivro: number, quantidade: number): Observable<any> {
    const body = { idusuario, idlivro, quantidade };
    return this.http.post(`${this.apiUrl}`, body);
  }

// Serviço para atualizar item do carrinho
updateCartItem(idlivro: number, quantidade: number, idusuario: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/`, { idusuario, idlivro, quantidade });
}

  // Remover item do carrinho
  removeFromCart(idusuario: number, idlivro: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idusuario}/${idlivro}`);
  }

  // Calcular o preço total do carrinho
  getTotalPrice(cartItems: any[]): number {
    if (Array.isArray(cartItems)) {
      return cartItems.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    } else {
      return 0;  // Caso não seja um array válido
    }
  }
  

  // Finalizar compra
  checkout(idusuario: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, { idusuario });
  }
}
