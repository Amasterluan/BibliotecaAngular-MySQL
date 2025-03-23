// backend/controllers/favoriteController.js
const db = require('../config/db');

// Adicionar livro aos favoritos
const addFavorite = (req, res) => {
  const { idlivros, idusuarios } = req.body;

  if (!idlivros || !idusuarios) {
    return res.status(400).json({ error: "ID do livro e do usuário são obrigatórios" });
  }

  db.query(
    "INSERT INTO favoritos (idlivros, idusuarios) VALUES (?, ?)",
    [idlivros, idusuarios],
    (err, result) => {
      if (err) {
        console.error("Erro ao adicionar favorito:", err);
        return res.status(500).json({ error: "Erro ao adicionar favorito" });
      }
      res.status(201).json({ message: "Livro adicionado aos favoritos com sucesso", id: result.insertId });
    }
  );
};

// Obter todos os favoritos de um usuário
const getFavoritesByUser = (req, res) => {
  const { idusuarios } = req.params;
  console.log('ID do Usuário:', idusuarios);

  db.query(
    `SELECT 
  f.idfavoritos,
  l.idlivros,
  l.titulo_livro,
  l.imagem,
  l.nome_autor,
  l.preco,
  l.descricao
FROM 
  favoritos f
JOIN livros l ON f.idlivros = l.idlivros
WHERE 
  f.idusuarios = ?;`,
    [idusuarios],
    (err, results) => {
      if (err) {
        console.error("Erro ao buscar favoritos:", err);
        return res.status(500).json({ error: "Erro ao buscar favoritos" });
      }
      res.json(results);
    }
  );
};

// Remover um livro dos favoritos
const removeFavorite = (req, res) => {
  const { idfavoritos } = req.params;

  db.query("DELETE FROM favoritos WHERE idfavoritos = ?", [idfavoritos], (err, result) => {
    if (err) {
      console.error("Erro ao remover favorito:", err);
      return res.status(500).json({ error: "Erro ao remover favorito" });
    }
    res.json({ message: "Livro removido dos favoritos com sucesso" });
  });
};

module.exports = { addFavorite, getFavoritesByUser, removeFavorite };
