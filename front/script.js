// Configuração da API
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api' 
    : '/api';

// Estado da aplicação
let produtos = [];
let carrinho = [];
let usuarioLogado = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos();
    verificarLogin();
});

// Funções da API
async function carregarProdutos() {
    try {
        const response = await fetch(`${API_BASE_URL}/produtos`);
        const data = await response.json();
        
        if (data.success) {
            produtos = data.data;
            exibirProdutos(produtos);
        }
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        exibirProdutos([]);
    }
}

function exibirProdutos(produtosParaExibir) {
    const grid = document.getElementById('grid-produtos');
    
    if (produtosParaExibir.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Nenhum produto encontrado.</p>';
        return;
    }
    
    grid.innerHTML = produtosParaExibir.map(produto => `
        <div class="card-produto" onclick="abrirModalProduto(${produto.id})">
            <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem" onerror="this.src='https://via.placeholder.com/300x200?text=Produto'">
            <div class="produto-info">
                <span class="produto-categoria">${produto.categoria}</span>
                <h3 class="produto-nome">${produto.nome}</h3>
                <p class="produto-descricao">${produto.descricao}</p>
                <p class="produto-preco">R$ ${produto.preco.toFixed(2)}</p>
                <p class="produto-estoque ${produto.estoque > 0 ? 'disponivel' : 'indisponivel'}">
                    ${produto.estoque > 0 ? `${produto.estoque} em estoque` : 'Indisponível'}
                </p>
                <button onclick="event.stopPropagation(); adicionarAoCarrinhoRapido(${produto.id})" 
                        ${produto.estoque === 0 ? 'disabled' : ''}>
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `).join('');
}

// Filtros
function filtrarProdutos() {
    const busca = document.getElementById('busca').value.toLowerCase();
    const categoria = document.getElementById('categoria').value;
    
    let produtosFiltrados = produtos.filter(produto => {
        const matchBusca = produto.nome.toLowerCase().includes(busca) || 
                          produto.descricao.toLowerCase().includes(busca);
        const matchCategoria = !categoria || produto.categoria.toLowerCase() === categoria;
        
        return matchBusca && matchCategoria;
    });
    
    exibirProdutos(produtosFiltrados);
}

// Login/Registro
async function fazerLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="text"]').value;
    const senha = form.querySelector('input[type="password"]').value;
    
    // Login hardcoded para admin
    if (email === 'admin@projetoloja.com' && senha === 'admin123') {
        const adminUser = {
            id: 1,
            nome: "Administrador",
            email: "admin@projetoloja.com",
            tipo: "admin"
        };
        
        localStorage.setItem('usuario', JSON.stringify(adminUser));
        usuarioLogado = adminUser;
        fecharModalLogin();
        atualizarInterfaceUsuario();
        alert('Login realizado com sucesso!');
        return;
    }
    
    // Tentar login via API para outros usuários
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('usuario', JSON.stringify(data.data));
            usuarioLogado = data.data;
            fecharModalLogin();
            atualizarInterfaceUsuario();
            alert('Login realizado com sucesso!');
        } else {
            alert('Credenciais inválidas');
        }
    } catch (error) {
        console.error('Erro no login:', error);
        alert('Credenciais inválidas');
    }
}

async function fazerRegistro(event) {
    event.preventDefault();
    const form = event.target;
    const nome = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const senha = form.querySelectorAll('input[type="password"]')[0].value;
    const confirmarSenha = form.querySelectorAll('input[type="password"]')[1].value;
    
    if (senha !== confirmarSenha) {
        alert('Senhas não coincidem');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios/registro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, senha })
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('usuario', JSON.stringify(data.data));
            usuarioLogado = data.data;
            fecharModalRegistro();
            atualizarInterfaceUsuario();
            alert('Conta criada com sucesso!');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Erro no registro:', error);
        alert('Erro ao criar conta');
    }
}

function verificarLogin() {
    const usuario = localStorage.getItem('usuario');
    
    if (usuario) {
        usuarioLogado = JSON.parse(usuario);
        atualizarInterfaceUsuario();
    }
}

function atualizarInterfaceUsuario() {
    const btnLogin = document.querySelector('.btn-login');
    const navAdmin = document.getElementById('nav-admin');
    
    if (usuarioLogado) {
        btnLogin.textContent = `Olá, ${usuarioLogado.nome}`;
        btnLogin.onclick = logout;
        
        // Mostrar aba admin se for administrador
        if (usuarioLogado.tipo === 'admin') {
            navAdmin.style.display = 'block';
        }
    } else {
        btnLogin.textContent = 'Login';
        btnLogin.onclick = abrirModalLogin;
        navAdmin.style.display = 'none';
        document.getElementById('admin').style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('usuario');
    usuarioLogado = null;
    atualizarInterfaceUsuario();
    alert('Logout realizado com sucesso!');
}

// Carrinho
function adicionarAoCarrinhoRapido(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (produto && produto.estoque > 0) {
        adicionarItemCarrinho(produto, 1);
    }
}

function adicionarItemCarrinho(produto, quantidade) {
    const itemExistente = carrinho.find(item => item.id === produto.id);
    
    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({ ...produto, quantidade });
    }
    
    atualizarContadorCarrinho();
    alert(`${produto.nome} adicionado ao carrinho!`);
}

function atualizarContadorCarrinho() {
    const contador = document.getElementById('quantidade-carrinho');
    const total = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    contador.textContent = total;
}

// Modais
function abrirModalLogin() {
    document.getElementById('modalLogin').style.display = 'block';
}

function fecharModalLogin() {
    document.getElementById('modalLogin').style.display = 'none';
}

function abrirModalRegistro() {
    fecharModalLogin();
    document.getElementById('modalRegistro').style.display = 'block';
}

function fecharModalRegistro() {
    document.getElementById('modalRegistro').style.display = 'none';
}

function abrirModalProduto(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) return;
    
    document.getElementById('modal-nome').textContent = produto.nome;
    document.getElementById('modal-categoria').textContent = produto.categoria;
    document.getElementById('modal-descricao').textContent = produto.descricao;
    document.getElementById('modal-preco').textContent = `R$ ${produto.preco.toFixed(2)}`;
    document.getElementById('modal-estoque').textContent = 
        produto.estoque > 0 ? `${produto.estoque} em estoque` : 'Indisponível';
    
    const modalImagem = document.getElementById('modal-imagem');
    modalImagem.src = produto.imagem || 'https://via.placeholder.com/300x200?text=Produto';
    modalImagem.alt = produto.nome;
    
    document.getElementById('modalProduto').style.display = 'block';
    document.getElementById('modalProduto').dataset.produtoId = produtoId;
}

function fecharModal() {
    document.getElementById('modalProduto').style.display = 'none';
}

function adicionarAoCarrinho() {
    const produtoId = parseInt(document.getElementById('modalProduto').dataset.produtoId);
    const quantidade = parseInt(document.getElementById('quantidade-produto').value);
    const produto = produtos.find(p => p.id === produtoId);
    
    if (produto && quantidade > 0 && quantidade <= produto.estoque) {
        adicionarItemCarrinho(produto, quantidade);
        fecharModal();
    } else {
        alert('Quantidade inválida ou produto indisponível');
    }
}

// Fechar modais clicando fora
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// ========================================
// FUNÇÕES DE ADMINISTRAÇÃO
// ========================================

// Navegação para aba admin
document.addEventListener('DOMContentLoaded', function() {
    const navAdmin = document.getElementById('nav-admin');
    if (navAdmin) {
        navAdmin.addEventListener('click', function(e) {
            e.preventDefault();
            mostrarAdmin();
        });
    }
    
    // Form de produto
    const produtoForm = document.getElementById('produto-form');
    if (produtoForm) {
        produtoForm.addEventListener('submit', salvarProduto);
    }
});

function mostrarAdmin() {
    // Verificar se usuário é admin
    if (!usuarioLogado || usuarioLogado.tipo !== 'admin') {
        alert('Acesso negado! Apenas administradores podem acessar esta área.');
        return;
    }
    
    // Esconder outras seções
    document.querySelectorAll('section').forEach(section => {
        if (section.id !== 'admin') {
            section.style.display = 'none';
        }
    });
    
    // Mostrar seção admin
    document.getElementById('admin').style.display = 'block';
    
    // Carregar produtos para administração
    carregarProdutosAdmin();
}

async function carregarProdutosAdmin() {
    try {
        const response = await fetch(`${API_BASE_URL}/produtos`);
        const data = await response.json();
        
        if (data.success) {
            exibirProdutosAdmin(data.data);
        }
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

function exibirProdutosAdmin(produtos) {
    const lista = document.getElementById('admin-produtos-lista');
    
    if (produtos.length === 0) {
        lista.innerHTML = '<p>Nenhum produto cadastrado.</p>';
        return;
    }
    
    lista.innerHTML = produtos.map(produto => `
        <div class="admin-produto-item">
            <img src="${produto.imagem || 'https://via.placeholder.com/80x60'}" 
                 alt="${produto.nome}" class="admin-produto-imagem"
                 onerror="this.src='https://via.placeholder.com/80x60?text=Produto'">
            <div class="admin-produto-info">
                <h4>${produto.nome}</h4>
                <p>R$ ${produto.preco.toFixed(2)} | Estoque: ${produto.estoque} | ${produto.categoria}</p>
                <p>${produto.descricao}</p>
            </div>
            <div class="admin-produto-acoes">
                <button class="btn-editar" onclick="editarProduto(${produto.id})">Editar</button>
                <button class="btn-deletar" onclick="deletarProduto(${produto.id})">Deletar</button>
            </div>
        </div>
    `).join('');
}

async function salvarProduto(event) {
    event.preventDefault();
    
    const id = document.getElementById('produto-id').value;
    const nome = document.getElementById('produto-nome').value;
    const preco = document.getElementById('produto-preco').value;
    const estoque = document.getElementById('produto-estoque').value;
    const categoria = document.getElementById('produto-categoria').value;
    const descricao = document.getElementById('produto-descricao').value;
    const imagem = document.getElementById('produto-imagem').value;
    
    const produtoData = {
        nome,
        preco: parseFloat(preco),
        estoque: parseInt(estoque),
        categoria,
        descricao,
        imagem: imagem || 'https://via.placeholder.com/300x200?text=Produto'
    };
    
    try {
        let response;
        if (id) {
            // Atualizar produto existente
            response = await fetch(`${API_BASE_URL}/produtos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produtoData)
            });
        } else {
            // Criar novo produto
            response = await fetch(`${API_BASE_URL}/produtos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produtoData)
            });
        }
        
        const data = await response.json();
        
        if (data.success) {
            alert(data.message);
            limparFormulario();
            carregarProdutosAdmin();
            carregarProdutos(); // Atualizar lista pública também
        } else {
            alert(data.message || 'Erro ao salvar produto');
        }
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        alert('Erro ao salvar produto');
    }
}

function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;
    
    document.getElementById('produto-id').value = produto.id;
    document.getElementById('produto-nome').value = produto.nome;
    document.getElementById('produto-preco').value = produto.preco;
    document.getElementById('produto-estoque').value = produto.estoque;
    document.getElementById('produto-categoria').value = produto.categoria;
    document.getElementById('produto-descricao').value = produto.descricao;
    document.getElementById('produto-imagem').value = produto.imagem || '';
    
    document.getElementById('form-titulo').textContent = 'Editar Produto';
    document.getElementById('btn-salvar').textContent = 'Atualizar Produto';
    
    // Scroll para o formulário
    document.querySelector('.admin-form-container').scrollIntoView({ behavior: 'smooth' });
}

async function deletarProduto(id) {
    if (!confirm('Tem certeza que deseja deletar este produto?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/produtos/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Produto deletado com sucesso!');
            carregarProdutosAdmin();
            carregarProdutos(); // Atualizar lista pública também
        } else {
            alert(data.message || 'Erro ao deletar produto');
        }
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        alert('Erro ao deletar produto');
    }
}

function cancelarEdicao() {
    limparFormulario();
}

function limparFormulario() {
    document.getElementById('produto-form').reset();
    document.getElementById('produto-id').value = '';
    document.getElementById('form-titulo').textContent = 'Adicionar Produto';
    document.getElementById('btn-salvar').textContent = 'Salvar Produto';
}

// Navegação entre seções
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#admin') {
            // Mostrar todas as seções novamente
            document.querySelectorAll('section').forEach(section => {
                section.style.display = 'block';
            });
            document.getElementById('admin').style.display = 'none';
        }
    });
});