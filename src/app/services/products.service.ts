import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartData = new EventEmitter<product[] | []>();
  private apiUrl = 'http://localhost:80/api'; // Altere para a URL do seu backend

  constructor(private http: HttpClient) { }

  addProduct(data: product) {
    return this.http.post(`${this.apiUrl}/products`, data);
  }

  productList(): Observable<product[]> {
    return this.http.get<product[]>(`${this.apiUrl}/products`);
  }  

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  getProduct(id: string): Observable<product> {
    return this.http.get<product>(`${this.apiUrl}/products/${id}`);
  }

  updateProduct(product: product): Observable<product> {
    return this.http.put<product>(`${this.apiUrl}/products/${product.idlivros}`, product);
  }

  trendyProducts(): Observable<product[]> {
    return this.http.get<product[]>(`${this.apiUrl}/products/trendy`);
  }

  searchProducts(query: string): Observable<product[]> {
    return this.http.get<product[]>(`${this.apiUrl}/products/search?q=${query}`);
  }

  // Carrinho
  AddToCart(cartData: cart) {
    return this.http.post(`${this.apiUrl}/cart`, cartData);
  }

  getCartList(userId: number) {
    return this.http.get<product[]>(`${this.apiUrl}/cart/${userId}`).subscribe((result) => {
      if (result) {
        this.cartData.emit(result);
      }
    });
  }

  removeToCart(cartId: number) {
    return this.http.delete(`${this.apiUrl}/cart/${cartId}`);
  }

  currentCart(): Observable<cart[]> {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.get<cart[]>(`${this.apiUrl}/cart/user/${userData.id}`);
  }

  // Pedidos
  orderNow(data: order) {
    return this.http.post(`${this.apiUrl}/orders`, data);
  }

  orderList(): Observable<order[]> {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.get<order[]>(`${this.apiUrl}/orders/user/${userData.id}`);
  }

  deleteCartItems(cartId: number) {
    return this.http.delete(`${this.apiUrl}/cart/${cartId}`).subscribe(() => {
      this.cartData.emit([]);
    });
  }

  cancelOrder(orderId: number) {
    return this.http.delete(`${this.apiUrl}/orders/${orderId}`);
  }
}