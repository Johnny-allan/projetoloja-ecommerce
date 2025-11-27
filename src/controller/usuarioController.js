// Sistema simplificado sem JWT
let usuarios = [
  {
    id: 1,
    nome: "Administrador",
    email: "admin@projetoloja.com",
    senha: "admin123",
    tipo: "admin",
    criadoEm: new Date()
  }
];
let proximoId = 2;

const usuarioController = {
  // GET /api/usuarios
  listarTodos: (req, res) => {
    const usuariosSemSenha = usuarios.map(u => ({
      id: u.id,
      nome: u.nome,
      email: u.email,
      tipo: u.tipo,
      criadoEm: u.criadoEm,
    }));

    res.json({
      success: true,
      data: usuariosSemSenha,
    });
  },

  // POST /api/usuarios
  criar: (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    // Verificar se email já existe
    const emailExiste = usuarios.find(u => u.email === email);
    if (emailExiste) {
      return res.status(400).json({
        success: false,
        message: "Email já cadastrado",
      });
    }

    const novoUsuario = {
      id: proximoId++,
      nome,
      email,
      senha,
      tipo: tipo || "cliente",
      criadoEm: new Date()
    };

    usuarios.push(novoUsuario);

    const { senha: _, ...usuarioSemSenha } = novoUsuario;

    res.status(201).json({
      success: true,
      data: usuarioSemSenha,
      message: "Usuário criado com sucesso",
    });
  },

  // GET /api/usuarios/:id
  buscarPorId: (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    const { senha: _, ...usuarioSemSenha } = usuario;

    res.json({
      success: true,
      data: usuarioSemSenha,
    });
  },

  // POST /api/usuarios/registro
  registro: (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    // Verificar se email já existe
    const emailExiste = usuarios.find(u => u.email === email);
    if (emailExiste) {
      return res.status(400).json({
        success: false,
        message: "Email já cadastrado",
      });
    }

    const novoUsuario = {
      id: proximoId++,
      nome,
      email,
      senha,
      tipo: tipo || "cliente",
      criadoEm: new Date()
    };

    usuarios.push(novoUsuario);

    const { senha: _, ...usuarioSemSenha } = novoUsuario;

    res.status(201).json({
      success: true,
      data: usuarioSemSenha,
      message: "Usuário registrado com sucesso",
    });
  },

  // POST /api/usuarios/login
  login: (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios",
      });
    }

    // Buscar usuário
    const usuario = usuarios.find(u => u.email === email);
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    // Verificar senha simples
    if (senha !== usuario.senha) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    const { senha: _, ...usuarioSemSenha } = usuario;

    res.json({
      success: true,
      data: usuarioSemSenha,
      message: "Login realizado com sucesso",
    });
  },
};

module.exports = usuarioController;
