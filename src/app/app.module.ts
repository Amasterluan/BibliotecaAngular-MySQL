import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderPComponent } from './components/header-p/header-p.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { SellerAuthComponent } from './components/pages/seller-auth/seller-auth.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './components/pages/seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerService } from './services/seller.service';
import { SellerAddProductComponent } from './components/pages/seller-add-product/seller-add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SellerUpdateProductComponent } from './components/pages/seller-update-product/seller-update-product.component';
import { SearchComponent } from './components/pages/search/search.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { UserAuthComponent } from './components/pages/user-auth/user-auth.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { MyOrdersComponent } from './components/pages/my-orders/my-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    SearchComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    CartPageComponent,
    CheckoutComponent,
    MyOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [AuthGuard, SellerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
