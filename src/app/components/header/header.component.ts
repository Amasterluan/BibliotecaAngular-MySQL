import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from '../../services/products.service'; 
import { product } from '../../data-types';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private searchTerms = new Subject<string>();

  faShoppingCart = faShoppingCart;

  searchTerm: string = '';
  sugestoes: product[] = [];
  
  isLoggedIn: boolean = false;
  cartItemCount: number = 0; // Quantidade de itens no carrinho

  constructor(
    private router: Router,
    private userService: UserService,
    private cartService: CartService,
    private productService: ProductsService
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

    this.searchTerms.pipe(
      debounceTime(300),        // espera 300ms após cada pressionamento de tecla
      distinctUntilChanged()    // ignora se o termo não mudou
    ).subscribe(term => {
      this.buscarSugestoes();
    });
  }

 
  buscarSugestoes() {
    if (!this.searchTerm.trim()) {
      this.sugestoes = [];
      return;
    }
  
    console.log('Enviando busca por:', this.searchTerm);
    
    this.productService.searchProducts(this.searchTerm).subscribe({
      next: (resultados) => {
        console.log('Resultados recebidos:', resultados);
        this.sugestoes = resultados;
      },
      error: (erro) => {
        console.error('Erro completo:', erro);
        console.log('Status:', erro.status);
        console.log('Mensagem:', erro.message);
        console.log('URL:', erro.url);
        this.sugestoes = [];
      }
    });
  }
  
  selecionarSugestao(livro: product) {
    this.router.navigate(['/details', livro.id]);
    this.sugestoes = [];
    this.searchTerm = '';
  }

  buscarLivros() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/books'], { queryParams: { q: this.searchTerm } });
      this.sugestoes = [];
    }
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
