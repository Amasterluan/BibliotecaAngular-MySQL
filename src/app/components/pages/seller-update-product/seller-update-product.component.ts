import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { product } from '../../../data-types';
import { ProductsService } from '../../../services/products.service'; // Seu serviço de produtos

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  product: any = null;  // Dados do produto a ser atualizado
  loading: boolean = true;  // Flag de carregamento
  productMessage: string = '';  // Mensagem de sucesso ou erro

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
  
    if (productId) {
      this.productService.getProductId(productId).subscribe(
        (data) => {
          this.product = data;
          console.log('Produto carregado:', this.product);  // Verifique se o produto é carregado corretamente
          if (this.product.publicationYear) {
            this.product.publicationYear = this.product.publicationYear.split('T')[0];
          }
          this.loading = false;
        },
        (error) => {
          this.productMessage = 'Erro ao carregar o produto.';
          this.loading = false;
        }
      );
    } else {
      this.productMessage = 'Produto não encontrado.';
      this.loading = false;
    }
  }
  onUpdateProduct(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.loading = true;
  
    // Map frontend fields to backend fields
    const updatedProduct = {
      imagem: this.product.image,
      titulo_livro: this.product.title,
      anopublicacao: this.product.publicationYear,
      descricao: this.product.description,
      estoque: this.product.stock,
      preco: this.product.price,
      nome_autor: this.product.author,
      nome_genero: this.product.genre,
      nome_editora: this.product.publisher
    };
  
    console.log('Dados mapeados para atualização:', updatedProduct); // Log the mapped data
  
    this.productService.updateProduct(this.product.id, updatedProduct).subscribe(
      (response) => {
        this.productMessage = 'Produto atualizado com sucesso!';
        this.loading = false;
        this.router.navigate(['/seller-home']);
      },
      (error) => {
        this.productMessage = 'Erro ao atualizar o produto!';
        this.loading = false;
      }
    );
  }
  
    
}
