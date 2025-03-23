import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { product } from '../../../data-types';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service'; // Importação do UserService

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: product[] = [];  // Aqui são armazenados os produtos
  cartItemCount: number = 0;  // Variável para armazenar o número de itens no carrinho

  constructor(
    private productsService: ProductsService,
    private cartService: CartService, // Injeção do serviço de carrinho
    private userService: UserService // Injeção do UserService
  ) {}

  ngOnInit(): void {
    this.loadProducts();  // Chama a função que vai buscar os produtos
    this.loadCartItems();  // Carregar os itens do carrinho
  }

  loadProducts(): void {
    this.productsService.productList().subscribe((data) => {
      this.products = data;  // Armazena os dados recebidos do backend
    }, (error) => {
      console.error('Erro ao buscar produtos:', error);
    });
  }

  loadCartItems() {
    const idusuario = this.userService.getUserId(); // Obtém o ID do usuário logado
    if (idusuario) {
      this.cartService.getCartItems(idusuario).subscribe((items) => {
        this.cartItemCount = items.length;  // Atualiza a quantidade de itens no carrinho
      });
    }
  }

  // Método para adicionar um produto ao carrinho
addToCart(item: product): void {
  const idusuario = this.userService.getUserId(); // Obtém o id do usuário logado
  if (idusuario) {
    const idlivro = item.id; // O ID do livro (produto)
    const quantidade = item.quantidade || 1; // A quantidade (padrão para 1, caso não seja fornecida)

    // Chama o serviço para adicionar o produto ao carrinho
    this.cartService.addToCart(idusuario, idlivro, quantidade).subscribe(() => {
      console.log('Item adicionado ao carrinho');
      this.loadCartItems();  // Atualiza o contador de itens no carrinho
    });
  }
}

}
