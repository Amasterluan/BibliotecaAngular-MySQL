import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { cart, order } from '../../../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData:cart[]|undefined;
  orderMsg:string|undefined
  constructor(private product: ProductsService, private router:Router) {}

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData=result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.preco * +item.quantity;
        }
      });
      this.totalPrice = price + 20 - price / 10;
    });
  }

  orderNow(data: {
    email: string,
    cpf: string, 
    name: string,
    address: string,
    numberPhone: string,
    city: string,
    state: string,
    CEP: string 
  }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId, id:undefined
      };
      this.cartData?.forEach((item)=>{
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id)
        }, 700);
      })
      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg='Seu pedido foi realizado com Sucesso!';

          setTimeout(() => {
            this.router.navigate(['/my-orders'])
            this.orderMsg=undefined;
          }, 4000);
        }
      });
    }
  }
//Não está puxando endereço, email, contato... pro JSON-Server
}
