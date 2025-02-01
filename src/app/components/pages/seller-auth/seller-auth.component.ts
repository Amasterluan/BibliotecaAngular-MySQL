import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from '../../../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  showLogin = false;
  authError = '';

  constructor(
    private seller: SellerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.seller.isSellerLoggedIn.subscribe((isLoggedIn) => {
      if(isLoggedIn) this.router.navigate(['/']);
    });
  }

  onSubmit(formData: any): void {
    if(this.showLogin) {
      this.login(formData);
    } else {
      this.signUp(formData);
    }
  }

  private signUp(formData: any): void {
    // Converter campos numéricos
    const userData = {
      ...formData,
      cpf_user: parseInt(formData.cpf_user.replace(/\D/g,''), 10),
      telefone_user: parseInt(formData.telefone_user.replace(/\D/g,''), 10)
    };

    this.seller.userSignUp(userData).subscribe({
      next: (res: any) => {
        if(res.status === 201) {
          this.seller.handleAuth(res);
        }
      },
      error: (error) => {
        this.authError = error.error?.error || 'Erro no cadastro';
      }
    });
  }

  private login(formData: any): void {
    this.seller.userLogin(formData).subscribe({
      next: (res: any) => {
        if(res.body?.length > 0) {
          this.seller.handleAuth(res);
        } else {
          this.authError = 'Credenciais inválidas';
        }
      },
      error: () => {
        this.authError = 'Erro na autenticação';
      }
    });
  }

  // Métodos auxiliares
  openLogin() { this.showLogin = true; }
  openSignUp() { this.showLogin = false; }
}