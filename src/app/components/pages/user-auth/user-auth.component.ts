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

  ngOnInit() {

  }


  signup(userData: any): void {
    this.userService.userSignup(userData).subscribe(
      (response) => {
        alert("Cadastro realizado com sucesso!");
        this.showLogin = true; // Alterna para a tela de login após o cadastro
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
        this.router.navigate(['/dashboard']); // Redireciona para a página de dashboard
      },
      (error) => {
        this.authError = "Credenciais inválidas. Tente novamente."; // Mensagem de erro
        console.error("Erro ao realizar login:", error);
      }
    );
  }
  
  
}