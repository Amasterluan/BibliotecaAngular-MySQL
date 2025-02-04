const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

// Configuração do MySQL
const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});


// Rota para listar todos os produtos (livros)
app.get('/api/products', (req, res) => {
  db.query('SELECT idlivros AS id, titulo_livro AS title, idautor AS author, idgeneros AS genre, preco AS price, imagem AS image FROM livros;', 
  (err, results) => {
      if (err) {
          console.error('Erro na consulta MySQL:', err);
          return res.status(500).json({ error: 'Erro ao buscar produtos' });
      }
      res.json(results);
  });
});


// Rota para buscar um produto pelo ID
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT idlivros AS id, titulo_livro AS title, nome_autor AS author, nome_genero AS genre, preco AS price, imagemLivro AS image FROM livros WHERE idlivros = ?', [id],
  (err, result) => {
      if (err) {
          console.error('Erro ao buscar produto:', err);
          return res.status(500).json({ error: 'Erro ao buscar produto' });
      }
      if (result.length === 0) {
          return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json(result[0]);
  });
});

// Rota para adicionar um novo produto
app.post('/api/products', (req, res) => {
  const { title, author, genre, price, image, stock, description } = req.body;

  // Inserir autor se não existir
  db.query('INSERT INTO autores (nome_autor) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM autores WHERE nome_autor = ?)', 
  [author, author], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar autor:', err);
      return res.status(500).json({ error: 'Erro ao adicionar autor' });
    }

    // Inserir categoria se não existir
    db.query('INSERT INTO generos (nome_genero) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM generos WHERE nome_genero = ?)', 
    [genre, genre], (err, result) => {
      if (err) {
        console.error('Erro ao adicionar categoria:', err);
        return res.status(500).json({ error: 'Erro ao adicionar categoria' });
      }

      // Obter os IDs do autor e da categoria
      db.query('SELECT idautores FROM autores WHERE nome_autor = ?', [author], (err, autorResults) => {
        if (err || autorResults.length === 0) {
          console.error('Erro ao buscar autor:', err);
          return res.status(500).json({ error: 'Erro ao buscar autor' });
        }

        const autorId = autorResults[0].idautores;

        db.query('SELECT idgeneros FROM generos WHERE nome_genero = ?', [genre], (err, genreResults) => {
          if (err || genreResults.length === 0) {
            console.error('Erro ao buscar categoria:', err);
            return res.status(500).json({ error: 'Erro ao buscar categoria' });
          }

          const genreId = genreResults[0].idgeneros;

          // Inserir livro com o id do autor e da categoria
          db.query('INSERT INTO livros (titulo_livro, idautores, idgeneros, preco, imagem, estoque, descricao) VALUES (?, ?, ?, ?, ?, ?, ?)', 
          [title, autorId, genreId, price, image, stock, description], (err, result) => {
            if (err) {
              console.error('Erro ao adicionar produto:', err);
              return res.status(500).json({ error: 'Erro ao adicionar produto' });
            }
            res.json({ message: 'Produto adicionado com sucesso', id: result.insertId });
          });
        });
      });
    });
  });
});



// Rota para atualizar um produto
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { titulo_livro, nome_autor, nome_genero, preco, imagem, estoque, descricao } = req.body;

  db.query(
    'UPDATE livros SET titulo_livro = ?, nome_autor = ?, nome_genero = ?, preco = ?, imagem = ?, estoque = ?, descricao = ? WHERE id = ?',
    [titulo_livro, nome_autor, nome_genero, preco, imagem, estoque, descricao, id],
    (err, result) => {
      if (err) {
        console.error('Erro ao atualizar produto:', err);
        return res.status(500).json({ error: 'Erro ao atualizar produto' });
      }
      res.json({ message: 'Produto atualizado com sucesso' });
    }
  );
});


// Rota para excluir um produto
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM livros WHERE idlivros=?', [id], 
  (err) => {
      if (err) {
          console.error('Erro ao deletar produto:', err);
          return res.status(500).json({ error: 'Erro ao deletar produto' });
      }
      res.json({ message: 'Produto deletado com sucesso' });
  });
});

// Rota para buscar produtos "trendy" (exemplo: os mais vendidos)
app.get('/api/products/trendy', (req, res) => {
  db.query('SELECT idlivros AS id, titulo_livro AS title, nome_autor AS author, nome_genero AS genre, preco AS price, imagemLivro AS image FROM livros ORDER BY preco DESC LIMIT 5', 
  (err, results) => {
      if (err) {
          console.error('Erro ao buscar produtos trendy:', err);
          return res.status(500).json({ error: 'Erro ao buscar produtos trendy' });
      }
      res.json(results);
  });
});

// Rota para pesquisa de produtos
app.get('/api/products/search', (req, res) => {
  const query = req.query.q;
  db.query('SELECT idlivros AS id, titulo_livro AS title, nome_autor AS author, nome_genero AS genre, preco AS price, imagemLivro AS image FROM livros WHERE titulo_livro LIKE ?', [`%${query}%`],
  (err, results) => {
      if (err) {
          console.error('Erro na pesquisa de produtos:', err);
          return res.status(500).json({ error: 'Erro ao buscar produtos' });
      }
      res.json(results);
  });
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});