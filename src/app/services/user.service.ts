import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost';
  isLoggedIn = new BehaviorSubject<boolean>(false);
  currentUser = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

  userSignup(data: any) {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  userLogin(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getPaymentMethods() {
    return this.http.get(`${this.apiUrl}/formas-pagamento`);
  }

  handleAuth(response: any) {
    localStorage.setItem('user', JSON.stringify(response));
    this.currentUser.next(response);
    this.isLoggedIn.next(true);
    this.router.navigate(['/']);
  }

  userAuthReload() {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser.next(JSON.parse(user));
      this.isLoggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(null);
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }
}