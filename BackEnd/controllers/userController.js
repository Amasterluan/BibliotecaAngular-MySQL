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
      cpf: user.cpf_user,
      telefone: user.telefone_user
    });
  });
};

// Buscar endereço do usuário
const getUserAddress = (req, res) => {
  const userId = req.params.id;
  console.log('Buscando endereço para o usuário com ID:', userId);
  
  db.query("SELECT * FROM enderecos WHERE idusuarios = ?", [userId], (err, results) => {
    if (err) {
      console.error("Erro ao buscar endereço:", err);
      return res.status(500).json({ error: "Erro ao buscar endereço" });
    }
    
    if (results.length === 0) {
      console.log('Endereço não encontrado para o usuário com ID:', userId);
      // Se não encontrar endereço, retorna um objeto vazio ou uma mensagem indicando que o endereço não foi cadastrado
      return res.status(404).json({ message: "Endereço não encontrado para este usuário" });
    }
    
    console.log('Endereço encontrado:', results[0]);
    res.json(results[0]);
  });
};


// Atualizar dados do usuário
const updateUserData = (req, res) => {
  const { nome, email, senha_user, cpf_user, telefone_user } = req.body;
  const userId = req.params.id;

  db.query(
    "UPDATE usuarios SET nome_user = ?, email_user = ?, senha_user = ?, cpf_user = ?, telefone_user = ? WHERE idusuarios = ?",
    [nome, email, senha_user, cpf_user, telefone_user, userId],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar dados do usuário:", err);
        return res.status(500).json({ error: "Erro ao atualizar dados" });
      }
      res.status(200).json({ message: "Dados do usuário atualizados com sucesso" });
    }
  );
};

// Rota para editar ou inserir o endereço do usuário
const saveUserAddress = (req, res) => {
  const userId = req.params.id;
  const { logradouro, cidade, estado, cep, numero } = req.body;  // Incluindo o numero da casa

  console.log('Salvando endereço para o usuário com ID:', userId);

  // Verificar se o usuário já tem um endereço
  db.query("SELECT * FROM enderecos WHERE idusuarios = ?", [userId], (err, results) => {
    if (err) {
      console.error("Erro ao buscar endereço:", err);
      return res.status(500).json({ error: "Erro ao salvar endereço" });
    }
    
    // Se não encontrar, faz o INSERT
    if (results.length === 0) {
      db.query("INSERT INTO enderecos (idusuarios, logradouro, cidade, estado, cep, numero) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, logradouro, cidade, estado, cep, numero],  // Incluindo o numero
        (insertErr, insertResults) => {
          if (insertErr) {
            console.error("Erro ao inserir endereço:", insertErr);
            return res.status(500).json({ error: "Erro ao inserir endereço" });
          }
          console.log('Endereço inserido com sucesso');
          res.status(201).json({ message: 'Endereço criado com sucesso' });
        }
      );
    } else {
      // Se já encontrar, faz o UPDATE
      console.log('Endereço encontrado. Atualizando...');
      db.query(
        "UPDATE enderecos SET logradouro = ?, cidade = ?, estado = ?, cep = ?, numero = ? WHERE idusuarios = ?",
        [logradouro, cidade, estado, cep, numero, userId],  // Incluindo o numero
        (updateErr, updateResults) => {
          if (updateErr) {
            console.error("Erro ao atualizar endereço:", updateErr);
            return res.status(500).json({ error: "Erro ao atualizar endereço" });
          }
          console.log('Endereço atualizado com sucesso');
          res.status(200).json({ message: 'Endereço atualizado com sucesso' });
        }
      );
    }
  });
};

module.exports = { signup, login, getUserAddress, updateUserData, saveUserAddress };




