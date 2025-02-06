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
    // Pega o id do produto na URL
    const productId = this.route.snapshot.paramMap.get('id');
  
    if (productId) {
      // Carrega os dados do produto para edição
      this.productService.getProductId(productId).subscribe(
        (data) => {
          this.product = data;
  
          // Verifica se o ano de publicação está presente e no formato correto
          if (this.product.publicationYear) {
            // Ajusta para o formato correto 'YYYY-MM-DD'
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
    if (form.valid) {
      // Verifica se a data é válida e formata para 'YYYY-MM-DD'
      const dataFormatada = new Date(this.product.publicationYear).toISOString().split('T')[0];
      
      // Atualiza os dados do produto, incluindo a data formatada
      const updatedProduct = {
        ...this.product,
        publicationYear: dataFormatada, // Garante que a data esteja no formato correto
      };
  
      // Envia os dados do produto para o backend
      this.productService.updateProduct(this.product.id, updatedProduct).subscribe(
        (response) => {
          this.productMessage = 'Produto atualizado com sucesso!';
          this.router.navigate(['/products']);
        },
        (error) => {
          this.productMessage = 'Erro ao atualizar o produto. ' + (error.message || 'Tente novamente.');
          console.error('Erro ao atualizar produto:', error);
        }
      );
    } else {
      this.productMessage = 'Por favor, preencha todos os campos.';
    }
  }
  
  
}
