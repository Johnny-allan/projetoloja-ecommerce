// Middleware simplificado sem JWT
const verificarToken = (req, res, next) => {
    // Sem verificação de token - acesso livre
    next();
};

const verificarAdmin = (req, res, next) => {
    // Sem verificação de admin - acesso livre
    next();
};

module.exports = { verificarToken, verificarAdmin };
