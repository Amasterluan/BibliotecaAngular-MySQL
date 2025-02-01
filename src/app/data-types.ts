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
  idlivros: number;             // Alinhado com o nome da coluna no banco de dados
  imagemLivro: string;               // Campo para a imagem do livro
  titulo_livro: string;         // Nome do livro
  anopublicacao: string;        // Ano de publicação
  descricao: string;            // Descrição do livro
  estoque: number;              // Quantidade em estoque
  preco: number;                // Preço do livro
  nome_autor: string;           // Nome do autor
  nome_genero: string;          // Gênero do livro
  nome_editora: string;         // Nome da editora
  quantity: number | undefined; // Quantidade no carrinho ou undefined
  productId: number | undefined; // ID do produto no carrinho, caso exista
}


export interface cart {
    imagemLivro: string;
    nomeLivro: string;
    nomeAutor: string;
    categoria: string;
    descricaoLivro: string;
    preco: number;
    estoque: number;
    id:number | undefined;
    quantity:undefined | number;
    userId:number;
    productId:number;
  }

  export interface priceSummary{
    price:number;
    discount:number;
    delivery:number;
    total:number;
  }

  export interface order {
    email: string;
    cpf: string; 
    name: string;
    address: string;
    numberPhone: string;
    city: string;
    state: string;
    CEP: string; 
    totalPrice: number;
    userId: number; 
    id: number | undefined;
  }
  
  
  