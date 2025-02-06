// backend/controllers/productController.js
const db = require('../config/db');

// Obter todos os produtos
const getProducts = (req, res) => {
  db.query("SELECT idlivros AS id, imagem AS image,  titulo_livro AS title, anoPublicacao AS year,  descricao AS description, estoque AS stock, preco AS price, nome_autor AS author, nome_genero AS genre, nome_editora AS publisher FROM livros", (err, results) => {
    if (err) {
      console.error("Erro ao buscar produtos:", err);
      return res.status(500).json({ error: "Erro ao buscar produtos" });
    }
    res.json(results);
  });
};

// Obter um produto pelo ID
const getProductById = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT idlivros AS id, imagem AS image, titulo_livro AS title, anoPublicacao AS year, descricao AS description, estoque AS stock, preco AS price, nome_autor AS author, nome_genero AS genre, nome_editora AS publisher FROM livros WHERE idlivros = ?`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Erro ao buscar produto:", err);
        return res.status(500).json({ error: "Erro ao buscar produto" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      res.json(result[0]);
    }
  );
};

// Adicionar um novo produto
const addProduct = (req, res) => {
  const { imagem, titulo_livro, anopublicacao, descricao, estoque, preco, nome_autor, nome_genero, nome_editora } = req.body;

  db.query(
    "INSERT INTO livros (imagem, titulo_livro, anopublicacao, descricao, estoque, preco, nome_autor, nome_genero, nome_editora) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [imagem, titulo_livro, anopublicacao, descricao, estoque, preco, nome_autor, nome_genero, nome_editora],
    (err, result) => {
      if (err) {
        console.error("Erro ao adicionar produto:", err);
        return res.status(500).json({ error: "Erro ao adicionar produto" });
      }
      res.status(201).json({ message: "Produto adicionado com sucesso", id: result.insertId });
    }
  );
};

// Deletar um produto
const deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM livros WHERE idlivros = ?", [id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar produto:", err);
      return res.status(500).json({ error: "Erro ao deletar produto" });
    }
    res.json({ message: "Produto deletado com sucesso" });
  });
};

module.exports = { getProducts, getProductById, addProduct, deleteProduct };
