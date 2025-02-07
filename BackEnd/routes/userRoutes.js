// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para cadastro de usuário
router.post("/signup", userController.signup);

// Rota para login de usuário
router.post("/login", userController.login);

// Rota para pegar o endereço do usuário
router.get('/user-address/:id', userController.getUserAddress);

// Rota para atualizar os dados do usuário
router.put('/user/:id', userController.updateUserData);

// Definindo a rota para atualizar o endereço do usuário
router.put('/users/:id/address', userController.saveUserAddress);  // Use a função importada na rota

module.exports = router;
