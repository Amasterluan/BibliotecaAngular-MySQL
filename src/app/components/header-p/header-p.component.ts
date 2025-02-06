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

  constructor(private router: Router, private product: ProductsService) {}

  ngOnInit(): void {}

   
}
