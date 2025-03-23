import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private userService: UserService // Injetar o UserService
  ) {}

  ngOnInit() {
    const userId = this.userService.getUserId();
    if (userId) {
      this.cartService.getCartItems(userId).subscribe((items: any[]) => {
        this.cartItems = items;  // Agora deve ser um array de itens
        this.totalPrice = this.cartService.getTotalPrice(this.cartItems); // Passa o array correto
      });
    } else {
      console.log("Usuário não logado!");
    }
  }
  

  removeFromCart(index: number) {
    const idlivro = this.cartItems[index].idlivros; // Obtenha o idlivro do item
    const userId = this.userService.getUserId();
    if (userId) {
      this.cartService.removeFromCart(userId, idlivro).subscribe(() => {
        this.updateCart();  // Atualiza o carrinho após remover
      });
    }
  }

  updateCartItem(index: number) {
    let quantity = this.cartItems[index].quantidade;
    const userId = this.userService.getUserId();
    const idlivro = this.cartItems[index].idlivros;
  
    // Verificar se a quantidade é maior que 1 antes de diminuir
    if (quantity > 1) {
      quantity--;  // Diminuir a quantidade
    } else if (quantity < 1){
      this.removeFromCart(index);  // Se a quantidade for menor, remova o item
      return;  // Não faça mais nada após a remoção
    }
  
    if (userId) {
      this.cartService.updateCartItem(idlivro, quantity, userId).subscribe(() => {
        this.updateCart();  // Atualiza o carrinho após atualizar a quantidade
      });
    }
  }
  
  

  updateCart() {
    const userId = this.userService.getUserId();
    if (userId) {
      this.cartService.getCartItems(userId).subscribe(items => {
        this.cartItems = items;  // Atualiza os itens do carrinho
        this.totalPrice = this.cartService.getTotalPrice(this.cartItems); // Atualiza o preço total
      });
    }
  }

  checkout() {
    const userId = this.userService.getUserId();
    if (userId) {
      this.cartService.checkout(userId).subscribe(() => {
        this.updateCart();
      });
    }
  }
}
