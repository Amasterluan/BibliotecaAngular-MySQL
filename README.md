# Backend API - Sistema de Livraria
*Esse é um projeto ainda em desenvolvimento.

Este é o backend de uma aplicação de livraria, desenvolvido com Node.js, Express e MySQL. A API permite a criação, leitura, atualização e deleção de produtos (livros), bem como o cadastro e login de usuários.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework web para Node.js.
- **MySQL**: Banco de dados relacional.
- **Cors**: Middleware para habilitar requisições entre domínios.
- **Dotenv**: Carregar variáveis de ambiente.

## Estrutura de Pastas do BackEnd

├── backend
│ ├── config
│ │ └── db.js // Configuração do banco de dados MySQL.
│ ├── controllers
│ │ ├── productController.js // Lógica de negócios para produtos.
│ │ └── userController.js // Lógica de negócios para usuários.
│ ├── routes
│ │ ├── productRoutes.js // Definição das rotas de produtos.
│ │ └── userRoutes.js // Definição das rotas de usuários.
│ ├── middleware
│ │ └── authMiddleware.js // (Opcional) Middleware de autenticação.
│ └── server.js // Arquivo principal para iniciar o servidor.

## Autor
- Desenvolvido por Luan Moreira.