import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private apiUrl = 'http://localhost'; // Altere se seu backend estiver em outra porta
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  // Cadastro de usuário
  userSignUp(userData: any) {
    return this.http.post(`${this.apiUrl}/signup`, userData, { observe: 'response' });
  }

  // Login de usuário
  userLogin(loginData: any) {
    return this.http.get(`${this.apiUrl}/login?email=${loginData.email}&senha=${loginData.senha}`, 
      { observe: 'response' });
  }

  // Gerenciar sessão
  handleAuth(response: any) {
    localStorage.setItem('user', JSON.stringify(response.body));
    this.isSellerLoggedIn.next(true);
    this.router.navigate(['/']);
  }
}