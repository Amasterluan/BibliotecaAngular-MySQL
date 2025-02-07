import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage: string = ''; 

  constructor(private http: HttpClient, private router: Router) {}

  submit(formValues: any): void {
    // Verifique se a data está válida antes de tentar formatá-la
    const anoPublicacao = formValues.anoPublicacao;
    const dataFormatada = anoPublicacao ? new Date(anoPublicacao).toISOString().split('T')[0] : null;
  
    if (!dataFormatada) {
      this.addProductMessage = 'Por favor, forneça uma data válida.';
      return;
    }
  
    // Enviar os dados do formulário para a API do back-end
    const bookData = {
      imagem: formValues.imagemLivro,
      titulo_livro: formValues.nomeLivro,
      anopublicacao: dataFormatada,
      descricao: formValues.descricaoLivro,
      estoque: parseInt(formValues.estoque, 10),
      preco: parseFloat(formValues.preco),
      nome_autor: formValues.nomeAutor,
      nome_genero: formValues.categoria,
      nome_editora: formValues.nomeEditora
    };
  
    // Envio dos dados para o back-end
    this.http.post('http://localhost:3000/api/products', bookData).subscribe(
      (response) => {
        this.addProductMessage = 'Livro adicionado com sucesso!';
        console.log('Livro adicionado:', response);
  
        // Aguarda 2 segundos antes de redirecionar
        setTimeout(() => {
          this.router.navigate(['/listagem-livros']); // Substitua '/listagem-livros' pela rota da página de listagem de livros
        }, 2000); // Atraso de 2 segundos
      },
      (error) => {
        this.addProductMessage = 'Erro ao adicionar o livro.';
        console.error('Erro ao adicionar livro:', error);
      }
    );
  }
  
}
