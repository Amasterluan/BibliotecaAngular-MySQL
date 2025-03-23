import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faShoppingCart = faShoppingCart;
  
  isLoggedIn: boolean = false;
  cartItemCount: number = 0; // Quantidade de itens no carrinho

  constructor(
    private router: Router,
    private userService: UserService,
    private cartService: CartService // Injeção do serviço de carrinho
  ) {}

  ngOnInit(): void {
    // Verifica se o usuário está logado
    this.userService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status;

      if (this.isLoggedIn) {
        // Obter o id do usuário
        const idusuario = this.userService.getUserId(); // Obtém o id do usuário logado

        if (idusuario) {
          // Carregar os itens do carrinho quando o usuário estiver logado
          this.loadCartItems(idusuario);
        } else {
          // Caso o id do usuário seja nulo (erro no login ou sessão expirada)
          this.cartItemCount = 0;
        }
      } else {
        // Limpar os itens do carrinho quando o usuário não estiver logado
        this.cartItemCount = 0;
      }
    });
  }

  // Carregar a quantidade de itens no carrinho
  loadCartItems(idusuario: number) {
    this.cartService.getCartItems(idusuario).subscribe((items) => {
      this.cartItemCount = items.length;
    });
  }

  logout() {
    // Realiza o logout e redireciona para a página de login
    this.userService.logout();
    this.router.navigate(['/user-auth']); // Redireciona para o login após o logout
  }
}
