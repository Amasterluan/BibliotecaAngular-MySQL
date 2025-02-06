// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Importando as rotas
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

// Usando as rotas
app.use('/api', productRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
