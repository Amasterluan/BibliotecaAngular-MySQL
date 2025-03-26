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
  quantidade: number;
  idioma: string;
  classificacao: number; // de 1 a 5
}

//
export interface User {
  idusuarios: number;        // Identificador único do usuário
  nome_user: string | null;   // Nome do usuário
  email_user: string;        // Email do usuário (obrigatório)
  senha_user: string;        // Senha do usuário (deve ser armazenada de forma segura)
  cpf_user: string | null;   // CPF do usuário (opcional)
  telefone_user: string | null; // Telefone do usuário (opcional)
}

//
export interface Address {
  idenderecos: number;      // Identificador único do endereço
  logradouro: string | null; // Logradouro do endereço
  numero: string | null;    // Número do endereço
  cep: string | null;       // CEP do endereço (alterado para string para incluir o formato com hífen)
  cidade: string | null;    // Cidade do endereço
  estado: string | null;    // Estado do endereço
  idusuarios: number;      // ID do usuário associado a esse endereço
}

//

export interface FavoriteBook {
  idfavoritos: number;
  idlivros: number;
  imagem: string;
  titulo_livro: string;
  nome_autor: string;
  descricao: string;
  preco: number;
}

//
export interface CartItem {
  idlivros: number;   // ID do livro
  titulo_livro: string;  // Nome do livro
  quantidade: number;  // Quantidade do livro no carrinho
  total: number;  // Total (quantidade * preço)
  preco: number;  // Preço do livro
}

