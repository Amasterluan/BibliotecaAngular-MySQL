import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../../services/favorite.service';
import { Router } from '@angular/router';

interface FavoriteBook {
  idfavoritos: number;
  idlivros: number;
  imagem: string;
  titulo_livro: string;
  nome_autor: string;
}

@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrl: './user-favorite.component.css'
})
export class UserFavoriteComponent implements OnInit{
  favoriteBooks: FavoriteBook[] = [];
  
  constructor(private favoriteService: FavoriteService, private router: Router) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteService.getFavorites().subscribe(
      (books: FavoriteBook[]) => {
        this.favoriteBooks = books;
      },
      error => {
        console.error('Erro ao buscar favoritos', error);
      }
    );
  }

  viewBook(id: number): void {
    this.router.navigate(['/products', id]);
  }

  deleteBook(idfavoritos: number): void {
    this.favoriteService.deleteFavorite(idfavoritos).subscribe(
      () => {
        this.favoriteBooks = this.favoriteBooks.filter(book => book.idfavoritos !== idfavoritos);
      },
      error => {
        console.error('Erro ao remover livro dos favoritos', error);
      }
    );
  }
}
