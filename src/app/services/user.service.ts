import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api'; // URL do backend para usuários
  isLoggedIn = new BehaviorSubject<boolean>(false); // Inicializa como false
  currentUser = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserState(); // Carregar estado do usuário ao inicializar o serviço
  }

  // Verifica se o usuário está logado ao recarregar a página
  loadUserState() {
    const user = localStorage.getItem('user');
    if (user) {
      this.isLoggedIn.next(true);  // Marca como logado
      this.currentUser.next(JSON.parse(user));  // Carrega as informações do usuário
    }
  }

  // Retorna o ID do usuário logado
  getUserId(): number | null {
    const user = this.currentUser.value;
    return user ? user.id : null; // Retorna o ID se o usuário estiver logado, senão retorna null
  }

  // Cadastro de usuário
  userSignup(data: any) {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  // Login de usuário
  userLogin(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // Lidar com a autenticação do usuário
  handleAuth(response: any) {
    console.log('Dados recebidos após login:', response);  // Verifique os dados que estão sendo salvos
    localStorage.setItem('user', JSON.stringify(response));
    this.currentUser.next(response);  // Atualiza o BehaviorSubject
    this.isLoggedIn.next(true);
    this.router.navigate(['/']);
  }

  // Método para fazer o logout
  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(null);
    this.isLoggedIn.next(false); // Atualiza o status para 'false'
    this.router.navigate(['/user-auth']); // Redireciona para o login após o logout
  }

  // Carregar o endereço do usuário
  loadUserAddress(userId: number) {
    if (!userId) {
      throw new Error("ID do usuário não fornecido");
    }
    return this.http.get(`${this.apiUrl}/user-address/${userId}`);
  }

  // Atualizar dados do usuário
  updateUserData(user: any) {
    if (!user || !user.id) {
      throw new Error("ID do usuário não encontrado");
    }
    return this.http.put(`${this.apiUrl}/user/${user.id}`, user); // Supondo que o ID do usuário seja `user.id`
  }

  saveUserAddress(userId: number, addressData: any) {
    return this.http.put(`http://localhost:3000/api/users/${userId}/address`, addressData);
  }
}
  

