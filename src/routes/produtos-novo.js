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
    },
    {
        id: 7,
        nome: "Smart TV 55 Polegadas",
        preco: 1899.99,
        descricao: "Smart TV 4K com HDR e sistema Android TV",
        estoque: 12,
        categoria: "eletrônicos",
        imagem: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=200&fit=crop"
    },
    {
        id: 8,
        nome: "Tênis Esportivo",
        preco: 159.90,
        descricao: "Tênis para corrida com tecnologia de amortecimento",
        estoque: 35,
        categoria: "roupas",
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop"
    },
    {
        id: 9,
        nome: "Relógio Smartwatch",
        preco: 299.99,
        descricao: "Smartwatch com monitor cardíaco e GPS",
        estoque: 18,
        categoria: "eletrônicos",
        imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"
    },
    {
        id: 10,
        nome: "Jaqueta Jeans",
        preco: 89.90,
        descricao: "Jaqueta jeans clássica, disponível em vários tamanhos",
        estoque: 25,
        categoria: "roupas",
        imagem: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=200&fit=crop"
    },
    {
        id: 11,
        nome: "Mouse Gamer RGB",
        preco: 79.99,
        descricao: "Mouse gamer com iluminação RGB e 7 botões",
        estoque: 40,
        categoria: "eletrônicos",
        imagem: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop"
    },
    {
        id: 12,
        nome: "Livro: Python para Iniciantes",
        preco: 69.90,
        descricao: "Aprenda programação Python do zero",
        estoque: 30,
        categoria: "livros",
        imagem: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300&h=200&fit=crop"
    },
    {
        id: 13,
        nome: "Chocolate Gourmet",
        preco: 19.99,
        descricao: "Chocolate belga premium 70% cacau",
        estoque: 60,
        categoria: "alimentos",
        imagem: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=200&fit=crop"
    },
    {
        id: 14,
        nome: "Câmera Digital",
        preco: 1299.99,
        descricao: "Câmera DSLR com lente 18-55mm",
        estoque: 8,
        categoria: "eletrônicos",
        imagem: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop"
    },
    {
        id: 15,
        nome: "Vestido Floral",
        preco: 79.90,
        descricao: "Vestido feminino com estampa floral",
        estoque: 22,
        categoria: "roupas",
        imagem: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=200&fit=crop"
    },
    {
        id: 16,
        nome: "Teclado Mecânico",
        preco: 249.99,
        descricao: "Teclado mecânico RGB para gamers",
        estoque: 15,
        categoria: "eletrônicos",
        imagem: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop"
    },
    {
        id: 17,
        nome: "Vinho Tinto Reserva",
        preco: 45.90,
        descricao: "Vinho tinto seco, safra 2020",
        estoque: 28,
        categoria: "alimentos",
        imagem: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=300&h=200&fit=crop"
    },
    {
        id: 18,
        nome: "Mochila Executiva",
        preco: 129.90,
        descricao: "Mochila para notebook até 15.6 polegadas",
        estoque: 33,
        categoria: "outros",
        imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop"
    },
    {
        id: 19,
        nome: "Perfume Masculino",
        preco: 89.99,
        descricao: "Perfume masculino amadeirado 100ml",
        estoque: 45,
        categoria: "outros",
        imagem: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop"
    },
    {
        id: 20,
        nome: "Livro: Design Thinking",
        preco: 59.90,
        descricao: "Metodologia de inovação centrada no usuário",
        estoque: 20,
        categoria: "livros",
        imagem: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop"
    },
    {
        id: 21,
        nome: "Tablet Android",
        preco: 599.99,
        descricao: "Tablet 10 polegadas com 64GB de armazenamento",
        estoque: 16,
        categoria: "eletrônicos",
        imagem: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop"
    },
    {
        id: 22,
        nome: "Calça Jeans Skinny",
        preco: 69.90,
        descricao: "Calça jeans feminina modelo skinny",
        estoque: 38,
        categoria: "roupas",
        imagem: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=300&h=200&fit=crop"
    },
    {
        id: 23,
        nome: "Cafeteira Elétrica",
        preco: 149.99,
        descricao: "Cafeteira elétrica com timer programável",
        estoque: 24,
        categoria: "outros",
        imagem: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop"
    },
    {
        id: 24,
        nome: "Óculos de Sol",
        preco: 119.90,
        descricao: "Óculos de sol com proteção UV400",
        estoque: 42,
        categoria: "outros",
        imagem: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=200&fit=crop"
    },
    {
        id: 25,
        nome: "Livro: Marketing Digital",
        preco: 79.90,
        descricao: "Estratégias de marketing para era digital",
        estoque: 26,
        categoria: "livros",
        imagem: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=300&h=200&fit=crop"
    },
    {
        id: 26,
        nome: "Proteína Whey",
        preco: 89.90,
        descricao: "Suplemento proteico sabor chocolate 1kg",
        estoque: 35,
        categoria: "alimentos",
        imagem: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    }
];
let proximoId = 27;

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