// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');

// Rota para pegar o favorito do usuario
router.get('/favorite/:idusuarios', favoriteController.getFavoritesByUser);

// Rota para adicionar o produto aos favoritos 
router.post('/favorite', favoriteController.addFavorite);

// Rota para deletar um livro dos favoritos
router.delete('/favorite/:idfavoritos', favoriteController.removeFavorite);

module.exports = router;