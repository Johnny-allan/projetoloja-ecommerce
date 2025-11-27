const express = require('express');
const router = express.Router();
const produtoController = require('../controller/produtoController');
const { validarProduto } = require('../middleware/validacao');
const { verificarToken, verificarAdmin } = require('../middleware/auth');

// Rota de teste
router.get('/teste', (req, res) => {
    res.json({ success: true, message: 'API funcionando!' });
});

// Rota de teste para POST
router.post('/teste', (req, res) => {
    res.json({ success: true, message: 'POST funcionando!', data: req.body });
});

// Rotas públicas (sem autenticação)
router.get('/', produtoController.listarTodos);
router.get('/:id', produtoController.buscarPorId);

// Rotas temporárias sem autenticação (para testes)
router.post('/', produtoController.criar);
router.put('/:id', produtoController.atualizar);
router.delete('/:id', produtoController.deletar);

module.exports = router;
