import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { product } from '../../../data-types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  trendyProducts: product[] = []; // Garantindo que seja do tipo product[]

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    // Obtendo os livros populares através do serviço
    this.productService.trendyProducts().subscribe((data) => {
      this.trendyProducts = data; // Atribuindo os produtos recebidos
    });
  }
}
