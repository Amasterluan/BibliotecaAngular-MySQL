export interface SingUp{
    name:string,
    password:string,
    email:string
}

export interface login{
    email:string,
    password:string,
}

export interface product {
  id: number;                 // 'idlivros'
  image: string;              // Campo para a imagem do livro
  title: string;              // Nome do livro
  year: string;               // Ano de publicação (não está sendo usado no HTML atual)
  description: string;        // Descrição do livro (não está sendo usado no HTML atual)
  stock: number;              // Quantidade em estoque (não está sendo usado no HTML atual)
  price: number;              // Preço do livro
  author: string;             // Nome do autor
  genre: string;              // Gênero do livro
  publisher: string;          // Nome da editora (não está sendo usado no HTML atual)
}


