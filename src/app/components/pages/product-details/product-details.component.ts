import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { FavoriteService } from '../../../services/favorite.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: any = null;
  loading: boolean = true;
  productMessage: string = '';

  constructor(
    private productService: ProductsService,
    private favoriteService: FavoriteService,
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
    
}