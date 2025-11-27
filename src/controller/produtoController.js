// Simulando banco de dados em memória
let produtos = [];
let proximoId = 1;

const produtoController = {
    // GET /api/produtos
    listarTodos: (req, res) => {
        res.json({
            success: true,
            data: produtos,
            message: 'Produtos listados com sucesso'
        });
    },

    // GET /api/produtos/:id
    buscarPorId: (req, res) => {
        const id = parseInt(req.params.id);
        const produto = produtos.find(p => p.id === id);
        
        if (!produto) {
            return res.status(404).json({
                success: false,
                message: 'Produto não encontrado'
            });
        }
        
        res.json({
            success: true,
            data: produto
        });
    },

    // POST /api/produtos
    criar: (req, res) => {
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
    },

    // PUT /api/produtos/:id
    atualizar: (req, res) => {
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
    },

    // DELETE /api/produtos/:id
    deletar: (req, res) => {
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
    }
};

module.exports = produtoController;
