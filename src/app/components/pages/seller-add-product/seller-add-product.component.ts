import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { product } from '../../../data-types';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent implements OnInit{
  addProductMessage: string | undefined;
  constructor(private product:ProductsService){}

  ngOnInit(): void {
    
  }
  submit(data:product){
      this.product.addProduct(data).subscribe((result)=>{
        if(result){
          this.addProductMessage="Livro Cadastrado com Sucesso!"
        }
        setTimeout(()=>(this.addProductMessage=undefined),3000);
      });
  }
}
