const express = require('express');
const router = express.Router();

// Simulando banco em memória diretamente na rota
let produtos = [
    {
        id: 1,
        nome: "Smartphone Samsung Galaxy",
        preco: 899.99,
        descricao: "Smartphone com tela de 6.1 polegadas, 128GB de armazenamento",
        estoque: 15,
        categoria: "eletrônicos",
        imagem: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
    },
    {
        id: 2,
        nome: "Notebook Dell Inspiron",
        preco: 2499.99,
        descricao: "Notebook com processador Intel i5, 8GB RAM, SSD 256GB",
        estoque: 8,
        categoria: "eletrônicos",
        imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop"
    },
    {
        id: 3,
        nome: "Camiseta Básica",
        preco: 39.90,
        descricao: "Camiseta 100% algodão, disponível em várias cores",
        estoque: 50,
        categoria: "roupas",
        imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop"
    },
    {
        id: 4,
        nome: "Livro: JavaScript Moderno",
        preco: 89.90,
        descricao: "Guia completo para desenvolvimento web com JavaScript",
        estoque: 25,
        categoria: "livros",
        imagem: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop"
    },
    {
        id: 5,
        nome: "Café Premium",
        preco: 24.99,
        descricao: "Café especial torrado artesanalmente, 250g",
        estoque: 30,
        categoria: "alimentos",
        imagem: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=200&fit=crop"
    },
    {
        id: 6,
        nome: "Fone Bluetooth",
        preco: 199.99,
        descricao: "Fone de ouvido sem fio com cancelamento de ruído",
        estoque: 20,
        categoria: "eletrônicos",
        imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
    }
];
let proximoId = 7;

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