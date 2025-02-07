import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin = true;
  authError = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  signup(userData: any): void {
    console.log('Dados do formulário: ', userData);
    this.userService.userSignup(userData).subscribe(
      (response) => {
        alert("Cadastro realizado com sucesso!");
        this.userService.handleAuth(response); // Já redireciona para a página principal após o login
        this.showLogin = true;
      },
      (error) => {
        console.error("Erro ao cadastrar usuário:", error);
        alert("Erro ao cadastrar usuário");
      }
    );
  }

  login(userData: any): void {
    this.userService.userLogin(userData).subscribe(
      (response) => {
        this.userService.handleAuth(response);
        alert("Login realizado com sucesso!");
      },
      (error) => {
        this.authError = "Credenciais inválidas. Tente novamente."; 
        console.error("Erro ao realizar login:", error);
      }
    );
  }
}
