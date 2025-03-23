import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { FavoriteService } from '../../../services/favorite.service';
import { UserService } from '../../../services/user.service';
import { CartService } from '../../../services/cart.service'; // Importando o CartService

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any = null;
  loading: boolean = true;
  productMessage: string = '';
  quantity: number = 1; // Variável para armazenar a quantidade selecionada pelo usuário

  constructor(
    private productService: ProductsService,
    private favoriteService: FavoriteService,
    private cartService: CartService, // Injeção do CartService
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductId(productId).subscribe(
        (data) => {
          this.product = data;
          this.loading = false;
        },
        (error) => {
          console.error("Erro ao carregar o produto:", error);
          this.productMessage = 'Erro ao carregar o produto.';
          this.loading = false;
        }
      );
    } else {
      this.productMessage = 'Produto não encontrado.';
      this.loading = false;
    }
  }

  // Adiciona o produto aos favoritos
  addToFavorites(idlivros: number) {
    const user = this.userService.currentUser.value; // Pega o usuário logado
  
    if (!idlivros) {
      console.error("ID do livro não encontrado.");
      alert("Erro: Não foi possível adicionar aos favoritos.");
      return;
    }
  
    if (!user || !user.id) {
      console.error("Usuário não está logado ou ID do usuário não encontrado.");
      alert("Erro: Você precisa estar logado para adicionar favoritos.");
      return;
    }
  
    const favoriteData = {
      idlivros: idlivros,
      idusuarios: user.id // Agora pegamos o ID do usuário autenticado
    };
  
    console.log("Enviando dados para favoritos:", favoriteData);
  
    this.favoriteService.addFavorite(favoriteData).subscribe(
      (response) => {
        console.log("Livro adicionado aos favoritos:", response);
        alert("Livro adicionado aos favoritos!");
      },
      (error) => {
        console.error("Erro ao adicionar aos favoritos:", error);
        alert("Erro ao adicionar aos favoritos.");
      }
    );
  }


  // Adiciona o produto ao carrinho
addToCart(product: any) {
  const user = this.userService.currentUser.value; // Pega o usuário logado
  if (!user || !user.id) {
    console.error("Usuário não logado.");
    alert("Você precisa estar logado para adicionar ao carrinho.");
    return;
  }

  const idusuario = user.id; // ID do usuário logado
  const idlivro = product.id; // ID do livro
  const quantidade = this.quantity; // Quantidade do produto selecionada

  // Envia o produto ao carrinho
  this.cartService.addToCart(idusuario, idlivro, quantidade).subscribe(
    (response) => {
      console.log("Produto adicionado ao carrinho:", response);
      alert("Produto adicionado ao carrinho!");
    },
    (error) => {
      console.error("Erro ao adicionar produto ao carrinho:", error);
      alert("Erro ao adicionar produto ao carrinho.");
    }
  );
}


  // Remove o produto do carrinho
  removeFromCart(product: any) {
    const user = this.userService.currentUser.value; // Pega o usuário logado
    if (!user || !user.id) {
      console.error("Usuário não logado.");
      alert("Você precisa estar logado para remover do carrinho.");
      return;
    }

    const idusuario = user.id; // ID do usuário logado

    // Remove o produto do carrinho
    this.cartService.removeFromCart(idusuario, product.id).subscribe(
      (response) => {
        console.log("Produto removido do carrinho:", response);
        alert("Produto removido do carrinho!");
      },
      (error) => {
        console.error("Erro ao remover produto do carrinho:", error);
        alert("Erro ao remover produto do carrinho.");
      }
    );
  }
}
