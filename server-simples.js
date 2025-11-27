const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Banco em memória
let produtos = [];
let usuarios = [];
let proximoIdProduto = 1;
let proximoIdUsuario = 1;

// ROTAS DE PRODUTOS
app.get('/api/produtos', (req, res) => {
    res.json({
        success: true,
        data: produtos,
        message: 'Produtos listados com sucesso'
    });
});

app.post('/api/produtos', (req, res) => {
    const { nome, preco, descricao, estoque, categoria, imagem } = req.body;
    
    const novoProduto = {
        id: proximoIdProduto++,
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

app.put('/api/produtos/:id', (req, res) => {
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

app.delete('/api/produtos/:id', (req, res) => {
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

// ROTAS DE USUÁRIOS
app.post('/api/usuarios/registro', (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    
    const novoUsuario = {
        id: proximoIdUsuario++,
        nome,
        email,
        senha, // Em produção usar bcrypt
        tipo: tipo || 'cliente',
        criadoEm: new Date()
    };
    
    usuarios.push(novoUsuario);
    
    const { senha: _, ...usuarioSemSenha } = novoUsuario;
    
    res.status(201).json({
        success: true,
        data: usuarioSemSenha,
        token: 'fake-token-123',
        message: 'Usuário registrado com sucesso'
    });
});

app.post('/api/usuarios/login', (req, res) => {
    const { email, senha } = req.body;
    
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    
    if (!usuario) {
        return res.status(401).json({
            success: false,
            message: 'Credenciais inválidas'
        });
    }
    
    const { senha: _, ...usuarioSemSenha } = usuario;
    
    res.json({
        success: true,
        data: usuarioSemSenha,
        token: 'fake-token-123',
        message: 'Login realizado com sucesso'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor simples rodando na porta ${PORT}`);
});