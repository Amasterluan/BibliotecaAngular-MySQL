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
    this.userService.userAuthReload();
  }

  signup(formData: any) {
    this.userService.userSignup(formData).subscribe({
      next: (res) => this.userService.handleAuth(res),
      error: (err) => this.authError = err.error?.error || 'Erro no cadastro'
    });
  }

  login(formData: any) {
    this.userService.userLogin(formData).subscribe({
      next: (res) => this.userService.handleAuth(res),
      error: (err) => {
        this.authError = err.error?.error || 'Erro na autenticação';
        console.error(err);
      }
    });
  }

  toggleForm() {
    this.showLogin = !this.showLogin;
    this.authError = '';
  }
}