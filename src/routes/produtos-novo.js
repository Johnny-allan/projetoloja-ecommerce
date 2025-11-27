const express = require('express');
const router = express.Router();

// Simulando banco em memória diretamente na rota
let produtos = [];
let proximoId = 1;

// GET /api/produtos
router.get('/', (req, res) => {
    res.json({
        success: true,
        data: produtos,
        message: 'Produtos listados com sucesso'
    });
});

// POST /api/produtos
router.post('/', (req, res) => {
    const { nome, preco, descricao, estoque, categoria, imagem } = req.body;
    
    const novoProduto = {
        id: proximoId++,
        nome,
        preco: parseFloat(preco),
        descricao: descricao || '',
        estoque: parseInt(estoque) || 0,
        categoria: categoria || 'Geral',
        imagem: imagem || 'https://via.placeholder.com/300x200?text=Produto'
    };
    
    produtos.push(novoProduto);
    
    res.status(201).json({
        success: true,
        data: novoProduto,
        message: 'Produto criado com sucesso'
    });
});

// PUT /api/produtos/:id
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);
    
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Produto não encontrado'
        });
    }
    
    const { nome, preco, descricao, estoque, categoria, imagem } = req.body;
    
    produtos[index] = {
        ...produtos[index],
        nome: nome || produtos[index].nome,
        preco: preco ? parseFloat(preco) : produtos[index].preco,
        descricao: descricao !== undefined ? descricao : produtos[index].descricao,
        estoque: estoque !== undefined ? parseInt(estoque) : produtos[index].estoque,
        categoria: categoria || produtos[index].categoria,
        imagem: imagem || produtos[index].imagem
    };
    
    res.json({
        success: true,
        data: produtos[index],
        message: 'Produto atualizado com sucesso'
    });
});

// DELETE /api/produtos/:id
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);
    
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Produto não encontrado'
        });
    }
    
    produtos.splice(index, 1);
    
    res.json({
        success: true,
        message: 'Produto deletado com sucesso'
    });
});

module.exports = router;