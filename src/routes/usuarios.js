const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');
const { validarUsuario } = require('../middleware/validacao');

router.get('/', usuarioController.listarTodos);
router.get('/:id', usuarioController.buscarPorId);
router.post('/', validarUsuario, usuarioController.criar);
router.post('/registro', validarUsuario, usuarioController.registro);
router.post('/login', usuarioController.login);


module.exports = router;
