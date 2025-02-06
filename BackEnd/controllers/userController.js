// backend/controllers/userController.js
const db = require('../config/db');

// Cadastro de usuário
const signup = (req, res) => {
  const { nome, email, senha, cpf } = req.body;

  db.query("SELECT * FROM usuarios WHERE email_user = ?", [email], (err, results) => {
    if (err) {
      console.error("Erro ao verificar o e-mail:", err);
      return res.status(500).json({ error: "Erro ao verificar o e-mail" });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "E-mail já registrado" });
    }

    db.query(
      "INSERT INTO usuarios (nome_user, email_user, senha_user, cpf_user) VALUES (?, ?, ?, ?)",
      [nome, email, senha, cpf],
      (err, result) => {
        if (err) {
          console.error("Erro ao cadastrar usuário:", err);
          return res.status(500).json({ error: "Erro ao cadastrar usuário" });
        }
        res.status(201).json({ message: "Usuário cadastrado com sucesso" });
      }
    );
  });
};

// Login de usuário
const login = (req, res) => {
  const { email, senha } = req.body;

  db.query("SELECT * FROM usuarios WHERE email_user = ?", [email], (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuário:", err);
      return res.status(500).json({ error: "Erro ao buscar usuário" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const user = results[0];

    if (user.senha_user !== senha) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    res.json({
      id: user.idusuarios,
      nome: user.nome_user,
      email: user.email_user,
    });
  });
};

module.exports = { signup, login };
