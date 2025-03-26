// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rota de busca
router.get('/search', productController.searchProducts); 

// Rota para obter todos os produtos
router.get("/products", productController.getProducts);

// Rota para obter um produto pelo ID
router.get("/products/:id", productController.getProductById);

//Rota para atualizar o produto
router.put("/products/:id", productController.updateProduct);

// Rota para adicionar um novo produto
router.post("/products", productController.addProduct);

// Rota para deletar um produto
router.delete("/products/:id", productController.deleteProduct);



module.exports = router;
