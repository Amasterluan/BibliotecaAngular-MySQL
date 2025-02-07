import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header-p',
  templateUrl: './header-p.component.html',
  styleUrls: ['./header-p.component.css']
})
export class HeaderPComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Verifica se o usuário está logado
    this.userService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    // Realiza o logout e redireciona para a página de login
    this.userService.logout();
    this.router.navigate(['/user-auth']); // Redireciona para o login após o logout
  }
}
