const express = require("express");
const app = express();
const mysql = require("mysql2/promise");
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

// Configuração do MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'bancolivraria',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middlewares
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rota para obter todos os livros cadastrados
app.get('/products', async (req, res) => {
  try {
    const [livros] = await pool.query(
      `SELECT l.idlivros, l.imagem, l.titulo_livro, l.anopublicacao, l.descricao, 
              l.estoque, l.preco, a.nome_autor, g.nome_genero, e.nome_editora
       FROM livros l
       JOIN autores a ON l.idautor = a.idautores
       JOIN generos g ON l.idgeneros = g.idgeneros
       JOIN editora e ON l.ideditora = e.ideditora`
    );
    res.json(livros);
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});



// Rota de cadastro
app.post('/signup', async (req, res) => {
  try {
    const { nome_user, cpf_user, email, senha, endereco } = req.body;

    // Validação básica
    if (!nome_user || !cpf_user || !email || !senha || !endereco) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const [existing] = await pool.query(
      'SELECT idusuarios FROM usuarios WHERE email = ? OR cpf_user = ?',
      [email, cpf_user]
    );

    if (existing.length > 0) return res.status(409).json({ error: "Usuário já existe" });

    const hashedPassword = await bcrypt.hash(senha, 10);

    // Iniciar transação
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Inserir usuário
      const [userResult] = await connection.query(
        `INSERT INTO usuarios 
        (nome_user, cpf_user, email, senha) 
        VALUES (?, ?, ?, ?)`,
        [nome_user, cpf_user, email, hashedPassword]
      );

      // Inserir endereço
      await connection.query(
        `INSERT INTO enderecos 
        (idusuario, logradouro, numero, cep, cidade, estado) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [userResult.insertId, endereco.logradouro, endereco.numero, endereco.cep, endereco.cidade, endereco.estado]
      );

      await connection.commit();
      connection.release();

      res.status(201).json({
        id: userResult.insertId,
        nome_user,
        email
      });

    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }

  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const [users] = await pool.query(
      `SELECT u.*, e.logradouro, e.numero, e.cep, e.cidade, e.estado 
       FROM usuarios u
       LEFT JOIN enderecos e ON u.idusuarios = e.idusuario
       WHERE u.email = ?`,
      [email]
    );

    if (users.length === 0) return res.status(404).json({ error: "Usuário não encontrado" });
    
    const user = users[0];
    const match = await bcrypt.compare(senha, user.senha);
    if (!match) return res.status(401).json({ error: "Credenciais inválidas" });

    const { senha: _, ...userData } = user;
    res.json(userData);

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// Rota para obter formas de pagamento
app.get('/formas-pagamento', async (req, res) => {
  try {
    const [formas] = await pool.query('SELECT * FROM formas_pagamento');
    res.json(formas);
  } catch (error) {
    console.error('Erro ao buscar formas de pagamento:', error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// Rotas para Produtos
router.get('/products', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM livros');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

router.get('/products/trendy', async (req, res) => {
  try {
    const [rows] = await connection.query(
      'SELECT * FROM livros ORDER BY vendas DESC LIMIT 10'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos populares' });
  }
});

router.get('/products/search', async (req, res) => {
  try {
    const query = req.query.q;
    const [rows] = await connection.query(
      'SELECT * FROM livros WHERE titulo_livro LIKE ?',
      [`%${query}%`]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro na pesquisa' });
  }
});

// Rotas para Carrinho
router.post('/cart', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const [result] = await connection.query(
      'INSERT INTO carrinho (user_id, product_id, quantity) VALUES (?, ?, ?)',
      [userId, productId, quantity]
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar ao carrinho' });
  }
});

router.get('/cart/:userId', async (req, res) => {
  try {
    const [rows] = await connection.query(
      `SELECT l.*, c.quantity 
       FROM carrinho c
       JOIN livros l ON c.product_id = l.idlivros
       WHERE c.user_id = ?`,
      [req.params.userId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar carrinho' });
  }
});

// Rotas para Pedidos
router.post('/orders', async (req, res) => {
  try {
    const { userId, products, total, paymentMethod } = req.body;
    const [result] = await connection.query(
      `INSERT INTO pedidos 
       (user_id, products, total, payment_method) 
       VALUES (?, ?, ?, ?)`,
      [userId, JSON.stringify(products), total, paymentMethod]
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
});

// Rota para atualizar produto
app.put('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      titulo_livro,
      imagemLivro,
      descricao,
      estoque,
      preco,
      nome_autor,
      nome_genero,
      nome_editora
    } = req.body;

    // Buscar IDs das tabelas relacionadas
    const [autor] = await pool.query(
      'SELECT idautores FROM autores WHERE nome_autor = ?',
      [nome_autor]
    );
    
    const [genero] = await pool.query(
      'SELECT idgeneros FROM generos WHERE nome_genero = ?',
      [nome_genero]
    );
    
    const [editora] = await pool.query(
      'SELECT ideditora FROM editora WHERE nome_editora = ?',
      [nome_editora]
    );

    // Atualizar livro
    const [result] = await pool.query(
      `UPDATE livros SET
        titulo_livro = ?,
        imagem = ?,
        descricao = ?,
        estoque = ?,
        preco = ?,
        idautor = ?,
        idgeneros = ?,
        ideditora = ?
      WHERE idlivros = ?`,
      [
        titulo_livro,
        imagemLivro,
        descricao,
        estoque,
        preco,
        autor[0]?.idautores,
        genero[0]?.idgeneros,
        editora[0]?.ideditora,
        productId
      ]
    );

    res.json(result);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Rota para buscar produto individual
app.get('/api/products/:id', async (req, res) => {
  try {
    const [livro] = await pool.query(
      `SELECT l.*, a.nome_autor, g.nome_genero, e.nome_editora
       FROM livros l
       JOIN autores a ON l.idautor = a.idautores
       JOIN generos g ON l.idgeneros = g.idgeneros
       JOIN editora e ON l.ideditora = e.ideditora
       WHERE l.idlivros = ?`,
      [req.params.id]
    );
    
    if (livro.length === 0) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    res.json(livro[0]);
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
//a