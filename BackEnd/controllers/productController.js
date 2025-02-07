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

  console.log("Buscando produto com ID:", id); // Log para ver se o ID está chegando corretamente

  db.query(
    `SELECT idlivros AS id, imagem AS image, titulo_livro AS title, anoPublicacao AS year, descricao AS description, estoque AS stock, preco AS price, nome_autor AS author, nome_genero AS genre, nome_editora AS publisher FROM livros WHERE idlivros = ?`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Erro ao buscar produto:", err);
        return res.status(500).json({ error: "Erro ao buscar produto" });
      }

      if (result.length === 0) {
        console.warn("Produto não encontrado.");
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      console.log("Produto encontrado:", result[0]); // Log para verificar se o produto foi retornado corretamente
      res.json(result[0]); // Garante que retorna um objeto e não um array
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

// Atualizar um produto
const updateProduct = (req, res) => {
  const { id } = req.params;
  const { imagem, titulo_livro, anopublicacao, descricao, estoque, preco, nome_autor, nome_genero, nome_editora } = req.body;

  // Verificar se campos obrigatórios estão presentes
  if (!titulo_livro || !descricao || !estoque || !preco || !nome_autor) {
    return res.status(400).json({ error: "Campos obrigatórios não preenchidos!" });
  }

  console.log("Dados recebidos para atualização:", req.body);  // Verifique os dados que estão chegando

  db.query(
    "UPDATE livros SET imagem = ?, titulo_livro = ?, anopublicacao = ?, descricao = ?, estoque = ?, preco = ?, nome_autor = ?, nome_genero = ?, nome_editora = ? WHERE idlivros = ?",
    [imagem, titulo_livro, anopublicacao, descricao, estoque, preco, nome_autor, nome_genero, nome_editora, id],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar produto:", err);
        return res.status(500).json({ error: "Erro ao atualizar produto" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      res.json({ message: "Produto atualizado com sucesso" });
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

module.exports = { getProducts, getProductById, addProduct, deleteProduct, updateProduct };
