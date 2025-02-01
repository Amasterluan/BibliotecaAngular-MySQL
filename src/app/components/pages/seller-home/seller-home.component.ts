import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { product } from '../../../data-types';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {
  productList:undefined | product[];
  productMessage:undefined|string;

  icon=faTrash;
  EditIcon=faEdit;

  constructor(private product:ProductsService){

  }
  
  ngOnInit(): void {
    this.list();
  }
  deleteProduct(id:number){
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage="Livro Deletado com Sucesso!";
        this.list();
      }
    })
    setTimeout(()=>{
      this.productMessage=undefined
    },3000)
  }

  list(){
    this.product.productList().subscribe((result)=>{
      if(result){
        this.productList=result;
      }
    })
  }
}
