const db = require('../config/db'); // Configuração da conexão com o banco de dados

// Adicionar um livro ao carrinho
const addToCart = (req, res) => {
    const { idusuario, idlivro, quantidade } = req.body;

    // Validação de entrada
    if (!idusuario || !idlivro || !quantidade || quantidade <= 0) {
        return res.status(400).json({ message: 'Dados inválidos para adicionar ao carrinho' });
    }

    // Verificar se o livro está disponível no estoque
    const queryCheckStock = 'SELECT estoque, preco FROM livros WHERE idlivros = ?';
    db.query(queryCheckStock, [idlivro], (err, result) => {
        if (err) {
            console.error('Erro ao verificar o estoque', err);
            return res.status(500).json({ message: 'Erro ao verificar o estoque', error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        const estoque = result[0].estoque;
        const preco = result[0].preco;

        if (quantidade > estoque) {
            return res.status(400).json({ message: 'Quantidade indisponível no estoque' });
        }

        // Verificar se o livro já está no carrinho do usuário
        const queryCheckCart = 'SELECT idlivros, quantidade FROM compras WHERE idusuarios = ? AND idlivros = ?';
        db.query(queryCheckCart, [idusuario, idlivro], (err, cartResult) => {
            if (err) {
                console.error('Erro ao verificar o carrinho', err);
                return res.status(500).json({ message: 'Erro ao verificar o carrinho', error: err.message });
            }

            const total = quantidade * preco;  // Calcular o preço total uma vez

            if (cartResult.length > 0) {
                // Item já existe no carrinho, então atualize a quantidade
                const existingQuantity = cartResult[0].quantidade;
                const newQuantity = existingQuantity + quantidade;

                // Verificar se a nova quantidade excede o estoque
                if (newQuantity > estoque) {
                    return res.status(400).json({ message: 'Quantidade total excede o estoque' });
                }

                // Atualizar a quantidade do item no carrinho
                const queryUpdateCart = 'UPDATE compras SET quantidade = ?, total = ? WHERE idusuarios = ? AND idlivros = ?';
                db.query(queryUpdateCart, [newQuantity, newQuantity * preco, idusuario, idlivro], (err, result) => {
                    if (err) {
                        console.error('Erro ao atualizar o carrinho', err);
                        return res.status(500).json({ message: 'Erro ao atualizar o carrinho', error: err.message });
                    }
                    res.status(200).json({ message: 'Quantidade atualizada no carrinho', result });
                });
            } else {
                // Adicionar item ao carrinho se não existir
                const queryInsertCart = 'INSERT INTO compras (idusuarios, idlivros, quantidade, total) VALUES (?, ?, ?, ?)';
                db.query(queryInsertCart, [idusuario, idlivro, quantidade, total], (err, result) => {
                    if (err) {
                        console.error('Erro ao adicionar ao carrinho', err);
                        return res.status(500).json({ message: 'Erro ao adicionar ao carrinho', error: err.message });
                    }
                    res.status(201).json({ message: 'Livro adicionado ao carrinho com sucesso', result });
                });
            }
        });
    });
};

// Remover um livro do carrinho
const removeFromCart = (req, res) => {
    const { idusuario, idlivro } = req.params;

    // Verificar se o item está no carrinho antes de tentar remover
    const queryCheckItem = 'SELECT * FROM compras WHERE idusuarios = ? AND idlivros = ?';
    db.query(queryCheckItem, [idusuario, idlivro], (err, result) => {
        if (err) {
            console.error('Erro ao verificar o carrinho para remoção', err);
            return res.status(500).json({ message: 'Erro ao verificar o carrinho para remoção', error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Livro não encontrado no carrinho' });
        }

        // Se o item existe, remover do carrinho
        const queryDelete = 'DELETE FROM compras WHERE idusuarios = ? AND idlivros = ?';
        db.query(queryDelete, [idusuario, idlivro], (err, result) => {
            if (err) {
                console.error('Erro ao remover do carrinho', err);
                return res.status(500).json({ message: 'Erro ao remover do carrinho', error: err.message });
            }
            res.status(200).json({ message: 'Livro removido do carrinho com sucesso', result });
        });
    });
};

// Listar todos os itens do carrinho
const getCartItems = (req, res) => {
    const { idusuario } = req.params;

    const querySelectCart = `
        SELECT c.idlivros,l.imagem, l.titulo_livro, c.quantidade, c.total, l.preco 
        FROM compras c
        JOIN livros l ON c.idlivros = l.idlivros
        WHERE c.idusuarios = ?
    `;
    
    db.query(querySelectCart, [idusuario], (err, result) => {
        if (err) {
            console.error('Erro ao obter os itens do carrinho', err);
            return res.status(500).json({ message: 'Erro ao obter os itens do carrinho', error: err.message });
        }
        res.status(200).json({ cartItems: result });
    });
};

// Atualizar a quantidade de um item no carrinho
const updateCartItem = (req, res) => {
    const { idusuario, idlivro, quantidade } = req.body;

    // Validação da quantidade
    if (quantidade <= 0) {
        // Se a quantidade for 0 ou negativa, remove o item
        const queryDelete = 'DELETE FROM compras WHERE idusuarios = ? AND idlivros = ?';
        db.query(queryDelete, [idusuario, idlivro], (err, result) => {
            if (err) {
                console.error('Erro ao remover do carrinho', err);
                return res.status(500).json({ message: 'Erro ao remover do carrinho', error: err.message });
            }
            return res.status(200).json({ message: 'Livro removido do carrinho com sucesso' });
        });
    } else {
        // Caso a quantidade seja maior que 0, continua com a atualização
        const queryCheckItem = 'SELECT * FROM compras WHERE idusuarios = ? AND idlivros = ?';
        db.query(queryCheckItem, [idusuario, idlivro], (err, result) => {
            if (err) {
                console.error('Erro ao verificar o carrinho para atualização', err);
                return res.status(500).json({ message: 'Erro ao verificar o carrinho para atualização', error: err.message });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'Livro não encontrado no carrinho' });
            }

            // Verificar o estoque disponível
            const queryCheckStock = 'SELECT estoque, preco FROM livros WHERE idlivros = ?';
            db.query(queryCheckStock, [idlivro], (err, stockResult) => {
                if (err) {
                    console.error('Erro ao verificar o estoque', err);
                    return res.status(500).json({ message: 'Erro ao verificar o estoque', error: err.message });
                }
                if (stockResult.length === 0) {
                    return res.status(404).json({ message: 'Livro não encontrado' });
                }

                const estoque = stockResult[0].estoque;
                const preco = stockResult[0].preco;

                // Verificar se a quantidade desejada está disponível no estoque
                if (quantidade > estoque) {
                    return res.status(400).json({ message: 'Quantidade indisponível no estoque' });
                }

                const total = quantidade * preco;  // Recalcular o total com base no preço atual

                // Atualizar a quantidade e o total do item no carrinho
                const queryUpdate = 'UPDATE compras SET quantidade = ?, total = ? WHERE idusuarios = ? AND idlivros = ?';
                db.query(queryUpdate, [quantidade, total, idusuario, idlivro], (err, result) => {
                    if (err) {
                        console.error('Erro ao atualizar o carrinho', err);
                        return res.status(500).json({ message: 'Erro ao atualizar o carrinho', error: err.message });
                    }
                    res.status(200).json({ message: 'Quantidade atualizada no carrinho com sucesso' });
                });
            });
        });
    }
};



module.exports = { addToCart, getCartItems, removeFromCart, updateCartItem };
