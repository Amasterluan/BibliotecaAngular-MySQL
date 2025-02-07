import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: any = null; // Inicializado como null
  loading: boolean = true;
  productMessage: string = '';

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    console.log("ID do produto recebido:", productId);
    // Verifique se o ID está correto
    if (productId) {
      this.productService.getProductId(productId).subscribe(
        (data) => {
          console.log("Produto carregado:", data);
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
  
}
