const validarProduto = (req, res, next) => {
    const { nome, preco, estoque, categoria } = req.body;
    const erros = [];
    
    // Validar nome
    if (!nome || nome.trim() === '') {
        erros.push('Nome é obrigatório');
    } else if (nome.length < 2) {
        erros.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    // Validar preço
    if (!preco) {
        erros.push('Preço é obrigatório');
    } else if (isNaN(preco) || parseFloat(preco) <= 0) {
        erros.push('Preço deve ser um número maior que zero');
    }
    
    // Validar estoque (opcional, mas se fornecido deve ser válido)
    if (estoque !== undefined && (isNaN(estoque) || parseInt(estoque) < 0)) {
        erros.push('Estoque deve ser um número maior ou igual a zero');
    }
    
    // Validar categoria (opcional)
    if (categoria && categoria.trim().length < 2) {
        erros.push('Categoria deve ter pelo menos 2 caracteres');
    }
    
    // Validar imagem (opcional)
    if (req.body.imagem && req.body.imagem.trim() === '') {
        erros.push('URL da imagem não pode estar vazia');
    }
    
    if (erros.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Dados inválidos',
            erros: erros
        });
    }
    
    next();
};

// Middleware para tratamento de erros globais
const tratarErros = (err, req, res, next) => {
    console.error(err.stack);
    
    res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
    });
};

const validarUsuario = (req, res, next) => {
    const { nome, email, senha, tipo } = req.body;
    const erros = [];
    
    // Validar nome
    if (!nome || nome.trim() === '') {
        erros.push('Nome é obrigatório');
    } else if (nome.length < 2) {
        erros.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    // Validar email
    if (!email || email.trim() === '') {
        erros.push('Email é obrigatório');
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            erros.push('Email deve ter um formato válido');
        }
    }
    
    // Validar senha
    if (!senha || senha.trim() === '') {
        erros.push('Senha é obrigatória');
    } else if (senha.length < 6) {
        erros.push('Senha deve ter pelo menos 6 caracteres');
    }
    
    // Validar tipo (opcional)
    if (tipo && !['admin', 'cliente'].includes(tipo)) {
        erros.push('Tipo deve ser "admin" ou "cliente"');
    }
    
    if (erros.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Dados inválidos',
            erros: erros
        });
    }
    
    next();
};

module.exports = { validarProduto, validarUsuario, tratarErros };
