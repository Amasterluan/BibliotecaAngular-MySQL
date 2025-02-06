// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para cadastro de usuário
router.post("/signup", userController.signup);

// Rota para login de usuário
router.post("/login", userController.login);

module.exports = router;
