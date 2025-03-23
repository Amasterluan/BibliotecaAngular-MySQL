import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../../services/favorite.service';
import { Router } from '@angular/router';
import { FavoriteBook } from '../../../data-types';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrl: './user-favorite.component.css'
})
export class UserFavoriteComponent implements OnInit{
  favoriteBooks: FavoriteBook[] = [];
  
  icon = faTrash;
  EditIcon = faEdit;

  constructor(private favoriteService: FavoriteService, private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      const idusuarios = parsedUser.id;
      console.log('ID do Usuário no LocalStorage:', idusuarios);
      this.loadFavorites(idusuarios);
    } else {
      console.error('ID do usuário não encontrado no localStorage');
    }
  }

  loadFavorites(idusuarios: number): void {
    this.favoriteService.getFavoritesByUser(idusuarios).subscribe(
      (books: FavoriteBook[]) => {
        console.log('Livros Favoritos:', books);
        console.log('usuario:', idusuarios)
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
