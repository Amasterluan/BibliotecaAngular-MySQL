import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  product } from '../../../data-types';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  productData:undefined | product;
  productQuantity:number=1;
  quantity:number=1;
  removeCart = false;
  cartData:product|undefined;
  
  constructor(private ActiveRoute:ActivatedRoute, private product:ProductsService) {}

  ngOnInit(): void {}
  

}