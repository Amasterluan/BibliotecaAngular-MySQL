import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../../../data-types';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  searchResult: undefined|product[]

  constructor(private activeRoute:ActivatedRoute, private product: ProductsService){}

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query')
    query && this.product.searchProducts(query).subscribe((result)=>{
      this.searchResult=result;
    })
  }

}
