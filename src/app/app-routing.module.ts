import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { SellerAuthComponent } from './components/pages/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './components/pages/seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './components/pages/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './components/pages/seller-update-product/seller-update-product.component';
import { SearchComponent } from './components/pages/search/search.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { UserAuthComponent } from './components/pages/user-auth/user-auth.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { MyOrdersComponent } from './components/pages/my-orders/my-orders.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'user-auth', component: UserAuthComponent},
  {path: 'seller-auth', component: SellerAuthComponent},
  {path: 'seller-home', component: SellerHomeComponent, canActivate:[AuthGuard]},
  {path: 'seller-add-product', component: SellerAddProductComponent, canActivate:[AuthGuard]},
  {path: 'seller-update-product/:id', component: SellerUpdateProductComponent, canActivate:[AuthGuard]},
  {path: 'search/:query', component: SearchComponent},
  {path: 'details/:productId', component: ProductDetailsComponent},
  {path: 'cart', component: CartPageComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'my-orders', component: MyOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
