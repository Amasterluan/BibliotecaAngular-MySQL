import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { SellerAuthComponent } from './components/pages/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './components/pages/seller-home/seller-home.component';
import { SellerAddProductComponent } from './components/pages/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './components/pages/seller-update-product/seller-update-product.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { UserAuthComponent } from './components/pages/user-auth/user-auth.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { UserFavoriteComponent } from './components/pages/user-favorite/user-favorite.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { BookFilterComponent } from './components/pages/book-filter/book-filter.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user-auth', component: UserAuthComponent},
  {path: 'seller-auth', component: SellerAuthComponent},
  {path: 'seller-home', component: SellerHomeComponent},
  {path: 'seller-add-product', component: SellerAddProductComponent},
  {path: 'seller-update-product/:id', component: SellerUpdateProductComponent},
  {path: 'details/:id', component: ProductDetailsComponent},
  {path: 'user-profile', component: UserProfileComponent}, 
  {path: 'favorite', component: UserFavoriteComponent},
  {path: 'cart', component: CartComponent},
  {path: 'books', component: BookFilterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
