import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderPComponent } from './components/header-p/header-p.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SellerAuthComponent } from './components/pages/seller-auth/seller-auth.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './components/pages/seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerService } from './services/seller.service';
import { SellerAddProductComponent } from './components/pages/seller-add-product/seller-add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SellerUpdateProductComponent } from './components/pages/seller-update-product/seller-update-product.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { UserAuthComponent } from './components/pages/user-auth/user-auth.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { UserFavoriteComponent } from './components/pages/user-favorite/user-favorite.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPComponent,
    FooterComponent,
    HomeComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    UserProfileComponent,
    UserFavoriteComponent
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
