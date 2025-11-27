const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('front'));

// Rota para servir o index.html na raiz
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front/index.html');
});

// Rota de teste direta
app.post('/api/teste-direto', (req, res) => {
    res.json({ success: true, message: 'Rota direta funcionando!', body: req.body });
});

// Rota de teste para login admin
app.post('/api/teste-admin', (req, res) => {
    res.json({ 
        success: true, 
        data: {
            id: 1,
            nome: "Administrador",
            email: "admin@projetoloja.com",
            tipo: "admin"
        },
        message: 'Login admin teste funcionando!' 
    });
});

// Rotas
app.use('/api/produtos', require('./src/routes/produtos-novo'));
app.use('/api/usuarios', require('./src/routes/usuarios'));

const { tratarErros } = require('./src/middleware/validacao');
app.use(tratarErros);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
