import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { product } from '../../../data-types';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: product[] | undefined;
  productMessage: string | undefined;

  icon = faTrash;
  EditIcon = faEdit;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Livro Deletado com Sucesso!';
        this.list(); // Recarrega a lista de produtos
      }
    });
    setTimeout(() => {
      this.productMessage = undefined; // Limpa a mensagem após 3 segundos
    }, 3000);
  }

  list(): void {
    this.productService.productList().subscribe((result) => {
      if (result) {
        this.productList = result; // Preenche a lista de produtos
      }
    });
  }
}
