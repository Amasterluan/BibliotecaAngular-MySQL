import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { ProductsService } from '../../../services/products.service';
import { product } from '../../../data-types';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.css']
})
export class BookFilterComponent implements OnInit {
  livros: product[] = [];
  filteredBooks: product[] = [];

  autores: string[] = [];
  categorias: string[] = [];
  ratings: number[] = [1, 2, 3, 4, 5]; // Classificação de 1 a 5

  selectedAuthor: string = '';
  selectedCategory: string = '';
  minRating: number | null = null; 
  sortOption: string = '';

  faixasPreco = [
    { label: 'Até R$20', value: 'ate20' },
    { label: 'R$20 a R$40', value: '20a40' },
    { label: 'R$40 a R$60', value: '40a60' },
    { label: 'R$60 a R$80', value: '60a80' },
    { label: 'Mais de R$80', value: 'mais80' }
  ];
  
  selectedPriceRange: string = '';

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productService.productList().subscribe((data: product[]) => {
      this.livros = data;
      this.filteredBooks = [...this.livros];
      this.autores = [...new Set(data.map(l => l.author))];
      this.categorias = [...new Set(data.map(l => l.genre))];
  
      this.route.queryParams.subscribe(params => {
        const search = params['q'];
        if (search) {
          this.searchByTitle(search);
        }
      });
    });
  }

  searchByTitle(term: string) {
    const lowerTerm = term.toLowerCase();
    this.filteredBooks = this.livros.filter(livro =>
      livro.title.toLowerCase().includes(lowerTerm)
    );
  }

  applyFilters() {
    this.filteredBooks = this.livros.filter(livro => {
      const matchesAuthor = !this.selectedAuthor || livro.author === this.selectedAuthor;
      const matchesCategory = !this.selectedCategory || livro.genre === this.selectedCategory;
      const matchesRating = !this.minRating || livro.classificacao >= this.minRating;

      let matchesPrice = true;
      switch (this.selectedPriceRange) {
        case 'ate20':
          matchesPrice = livro.price <= 20;
          break;
        case '20a40':
          matchesPrice = livro.price > 20 && livro.price <= 40;
          break;
        case '40a60':
          matchesPrice = livro.price > 40 && livro.price <= 60;
          break;
        case '60a80':
          matchesPrice = livro.price > 60 && livro.price <= 80;
          break;
        case 'mais80':
          matchesPrice = livro.price > 80;
          break;
      }
  
      return matchesAuthor && matchesCategory && matchesRating && matchesPrice;
    });
  
    this.sortBooks();
  }

  sortBooks() {
    switch (this.sortOption) {
      case 'priceAsc':
        this.filteredBooks.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        this.filteredBooks.sort((a, b) => b.price - a.price);
        break;
      case 'az':
        this.filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        this.filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
  }

  verDetalhes(id: number) {
    this.router.navigate(['/details', id]);
  }

  adicionarAoCarrinho(livro: product) {
    const userId = this.userService.getUserId();
    if (userId) {
      const quantidade = livro.quantidade || 1;
      this.cartService.addToCart(userId, livro.id, quantidade).subscribe(() => {
        console.log('Livro adicionado ao carrinho!');
      });
    }
  }
}
