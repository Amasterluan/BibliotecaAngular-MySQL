import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { product } from '../../../data-types';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: product | undefined;
  productMessage: string | undefined;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProduct(productId).subscribe({
        next: (data) => {
          this.productData = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar produto:', error);
          this.loading = false;
        }
      });
    }
  }

  submit(data: product): void {
    if (this.productData) {
      data.idlivros = this.productData.idlivros;
      this.productService.updateProduct(data).subscribe({
        next: (result) => {
          this.productMessage = "Produto Atualizado com Sucesso!";
          setTimeout(() => this.productMessage = undefined, 3000);
        },
        error: (error) => {
          console.error('Erro na atualização:', error);
          this.productMessage = "Erro ao atualizar produto!";
          setTimeout(() => this.productMessage = undefined, 3000);
        }
      });
    }
  }
}