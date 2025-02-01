import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { cart, priceSummary } from '../../../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit{
  cartData:cart[]|undefined;
  priceSummary:priceSummary={
    price:0,
    discount:0,
    delivery:0,
    total:0,
  }

  constructor(private product:ProductsService, private router:Router){

  }

  ngOnInit(): void {
    this.loadDetails();
  }

  removeToCart(cartId:number|undefined){
    cartId && this.cartData&&this.product.removeToCart(cartId).subscribe((result)=>{
      this.loadDetails()
    })
  }

  loadDetails(){
    this.product.currentCart().subscribe((result)=>{
      this.cartData=result;
      let price=0
      result.forEach((item)=>{
        if(item.quantity){
          price=price + (+item.preco* +item.quantity);
        }
        
      });
      this.priceSummary.price=price;
      this.priceSummary.discount=price/10;
      this.priceSummary.delivery=20;

      let vPrice = this.priceSummary.price;
      let vDiscount = this.priceSummary.discount;
      let vDelivery = this.priceSummary.delivery

      this.priceSummary.total=vPrice+vDelivery-vDiscount;

      if(!this.cartData.length){
        this.router.navigate(['/checkout'])
      }
    })
  }

  checkout(){
    this.router.navigate(['/checkout'])
  }
}
