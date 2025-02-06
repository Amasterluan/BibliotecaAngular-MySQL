import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { product } from '../../../data-types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: product[] = [];  // Aqui são armazenados os produtos

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();  // Chama a função que vai buscar os produtos
  }

  loadProducts(): void {
    this.productsService.productList().subscribe((data) => {
      this.products = data;  // Armazena os dados recebidos do backend
    }, (error) => {
      console.error('Erro ao buscar produtos:', error);
    });
  }
}
