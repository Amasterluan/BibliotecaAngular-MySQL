const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Adicionar um item ao carrinho
router.post('/cart', cartController.addToCart);

// Atualizar quantidade do item no carrinho
router.post('/cart/', cartController.updateCartItem);

// Obter os itens do carrinho de um usuário
router.get('/cart/:idusuario', cartController.getCartItems);

// Remover um item do carrinho
router.delete('/cart/:idusuario/:idlivro', cartController.removeFromCart);


module.exports = router;
