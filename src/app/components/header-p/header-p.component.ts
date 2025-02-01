import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { product } from '../../data-types';

@Component({
  selector: 'app-header-p',
  templateUrl: './header-p.component.html',
  styleUrls: ['./header-p.component.css']
})
export class HeaderPComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: product[] | undefined;
  userName: string = '';
  cartItems=0;

  constructor(private router: Router, private product: ProductsService) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        // Verifica se o usuário é um vendedor
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData?.name;
        } 
        // Verifica se o usuário é um cliente
        else if (localStorage.getItem('user')) {
          this.menuType = 'user';
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData?.name || ''; // Define o nome do usuário
          this.product.getCartList(userData.id);
        } 
        // Menu padrão
        else {
          this.menuType = 'default';
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems= JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems=items.length
    });
  }

  logout(): void {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  userLogout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    this.product.cartData.emit([]);
  }

  searchProducts(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const query = input.value.trim();

    if (query.length > 2) {
      this.product.searchProducts(query).subscribe((result) => {
        this.searchResult = result.slice(0, 5);
      });
    } else {
      this.searchResult = undefined;
    }
  }

  hideSearch(): void {
    this.searchResult = undefined;
  }

  redirectToDetails(id: number): void {
    this.router.navigate([`/details/${id}`]);
  }

  submitSearch(query: string): void {
    if (query.trim()) {
      this.router.navigate([`/search/${query}`]);
    }
  }
}
