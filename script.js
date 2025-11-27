// ========================================
// DADOS DE EXEMPLO
// ========================================
const produtos = [
  {
    id: 1,
    nome: "Smartphone Samsung",
    preco: 1299.99,
    descricao: "Smartphone de última geração com câmera de 108MP",
    estoque: 15,
    categoria: "eletrônicos",
  },
  {
    id: 2,
    nome: "Notebook Dell",
    preco: 3499.99,
    descricao: "Notebook potente para trabalho e jogos",
    estoque: 8,
    categoria: "eletrônicos",
  },
  {
    id: 3,
    nome: "Fone Bluetooth",
    preco: 199.99,
    descricao: "Fone sem fio com cancelamento de ruído",
    estoque: 25,
    categoria: "eletrônicos",
  },
  {
    id: 4,
    nome: "Camiseta Premium",
    preco: 79.99,
    descricao: "Camiseta 100% algodão de alta qualidade",
    estoque: 50,
    categoria: "roupas",
  },
  {
    id: 5,
    nome: "Calça Jeans",
    preco: 129.99,
    descricao: "Calça jeans clássica e confortável",
    estoque: 30,
    categoria: "roupas",
  },
  {
    id: 6,
    nome: "Livro Clean Code",
    preco: 89.99,
    descricao: "Guia essencial para código limpo e profissional",
    estoque: 12,
    categoria: "livros",
  },
  {
    id: 7,
    nome: "JavaScript Avançado",
    preco: 99.99,
    descricao: "Domine as técnicas avançadas de JavaScript",
    estoque: 18,
    categoria: "livros",
  },
  {
    id: 8,
    nome: "Café Premium",
    preco: 49.99,
    descricao: "Café especial grão inteiro 500g",
    estoque: 40,
    categoria: "alimentos",
  },
  {
    id: 9,
    nome: "Chocolate Belga",
    preco: 35.99,
    descricao: "Chocolate importado belga 200g",
    estoque: 22,
    categoria: "alimentos",
  },
  {
    id: 10,
    nome: "Produto Genérico",
    preco: 59.99,
    descricao: "Produto de boa qualidade",
    estoque: 10,
    categoria: "outros",
  },
];

let carrinho = [];
let usuarioLogado = null;

// ========================================
// CARREGAR PRODUTOS
// ========================================
function carregarProdutos(lista = produtos) {
  const gridProdutos = document.getElementById("grid-produtos");
  gridProdutos.innerHTML = "";

  if (lista.length === 0) {
    gridProdutos.innerHTML =
      '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Nenhum produto encontrado.</p>';
    return;
  }

  lista.forEach(produto => {
    const emojis = {
      eletrônicos: "📱",
      roupas: "👕",
      livros: "📚",
      alimentos: "🍽️",
      outros: "📦",
    };

    const card = document.createElement("div");
    card.className = "card-produto";
    card.innerHTML = `
            <div class="produto-imagem" onclick="abrirModal(${produto.id})">
                ${emojis[produto.categoria] || "📦"}
            </div>
            <div class="produto-info">
                <span class="produto-categoria">${produto.categoria}</span>
                <h3 class="produto-nome">${produto.nome}</h3>
                <p class="produto-descricao">${produto.descricao}</p>
                <p class="produto-preco">R$ ${produto.preco.toFixed(2)}</p>
                <p class="produto-estoque ${
                  produto.estoque > 0 ? "disponivel" : "indisponivel"
                }">
                    ${
                      produto.estoque > 0
                        ? `Em estoque (${produto.estoque})`
                        : "Indisponível"
                    }
                </p>
                <button onclick="abrirModal(${
                  produto.id
                })">Ver Detalhes</button>
            </div>
        `;
    gridProdutos.appendChild(card);
  });
}

// ========================================
// MODAL DO PRODUTO
// ========================================
function abrirModal(produtoId) {
  const produto = produtos.find(p => p.id === produtoId);
  if (!produto) return;

  const emojis = {
    eletrônicos: "📱",
    roupas: "👕",
    livros: "📚",
    alimentos: "🍽️",
    outros: "📦",
  };

  document.getElementById("modal-imagem").style.fontSize = "4rem";
  document.getElementById("modal-imagem").textContent =
    emojis[produto.categoria] || "📦";
  document.getElementById("modal-imagem").style.background =
    "linear-gradient(135deg, #667eea, #764ba2)";
  document.getElementById("modal-nome").textContent = produto.nome;
  document.getElementById("modal-categoria").textContent =
    produto.categoria.toUpperCase();
  document.getElementById("modal-descricao").textContent = produto.descricao;
  document.getElementById(
    "modal-preco"
  ).textContent = `R$ ${produto.preco.toFixed(2)}`;
  document.getElementById(
    "modal-estoque"
  ).textContent = `${produto.estoque} unidades disponíveis`;
  document.getElementById("modal-estoque").className =
    produto.estoque > 0 ? "estoque-info" : "estoque-info indisponivel";
  document.getElementById("quantidade-produto").value = 1;
  document.getElementById("quantidade-produto").max = produto.estoque;

  // Desabilitar botão se não houver estoque
  const botaoAdicionar = document.querySelector(
    "#modalProduto .modal-acoes button"
  );
  botaoAdicionar.disabled = produto.estoque === 0;

  document.getElementById("modalProduto").style.display = "block";
  document.body.style.overflow = "hidden";
}

function fecharModal() {
  document.getElementById("modalProduto").style.display = "none";
  document.body.style.overflow = "auto";
}

// ========================================
// CARRINHO
// ========================================
function adicionarAoCarrinho() {
  const nomeProducto = document.getElementById("modal-nome").textContent;
  const produto = produtos.find(p => p.nome === nomeProducto);
  const quantidade = parseInt(
    document.getElementById("quantidade-produto").value
  );

  if (!produto) return;

  // Verificar se já existe no carrinho
  const itemExistente = carrinho.find(item => item.id === produto.id);

  if (itemExistente) {
    itemExistente.quantidade += quantidade;
  } else {
    carrinho.push({
      ...produto,
      quantidade: quantidade,
    });
  }

  atualizarCarrinho();
  fecharModal();

  // Mostrar mensagem de sucesso
  mostrarNotificacao("Produto adicionado ao carrinho!");
}

function atualizarCarrinho() {
  const totalItens = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );
  document.getElementById("quantidade-carrinho").textContent = totalItens;
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function mostrarNotificacao(mensagem) {
  const notif = document.createElement("div");
  notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        z-index: 2000;
        animation: slideInRight 0.3s;
    `;
  notif.textContent = mensagem;
  document.body.appendChild(notif);

  setTimeout(() => notif.remove(), 3000);
}

// ========================================
// FILTROS
// ========================================
function filtrarProdutos() {
  const busca = document.getElementById("busca").value.toLowerCase();
  const categoria = document.getElementById("categoria").value;

  const produtosFiltrados = produtos.filter(produto => {
    const coincideBusca =
      produto.nome.toLowerCase().includes(busca) ||
      produto.descricao.toLowerCase().includes(busca);
    const coincideCategoria =
      categoria === "" || produto.categoria === categoria;

    return coincideBusca && coincideCategoria;
  });

  carregarProdutos(produtosFiltrados);
}

// Filtrar em tempo real
document.addEventListener("DOMContentLoaded", function () {
  const buscaInput = document.getElementById("busca");
  const categoriaSelect = document.getElementById("categoria");

  buscaInput.addEventListener("input", filtrarProdutos);
  categoriaSelect.addEventListener("change", filtrarProdutos);
});

// ========================================
// MODAIS DE AUTENTICAÇÃO
// ========================================
function abrirModalLogin() {
  if (usuarioLogado) {
    logout();
    return;
  }
  document.getElementById("modalLogin").style.display = "block";
  document.body.style.overflow = "hidden";
}

function fecharModalLogin() {
  document.getElementById("modalLogin").style.display = "none";
  document.body.style.overflow = "auto";
}

function abrirModalRegistro() {
  fecharModalLogin();
  document.getElementById("modalRegistro").style.display = "block";
}

function fecharModalRegistro() {
  document.getElementById("modalRegistro").style.display = "none";
  document.body.style.overflow = "auto";
}

function fazerLogin(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.elements[0].value;
  const nome = email.split("@")[0];

  usuarioLogado = {
    nome: nome,
    email: email,
  };

  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
  atualizarBotaoLogin();
  fecharModalLogin();
  mostrarNotificacao(`Bem-vindo, ${nome}!`);
  form.reset();
}

function fazerRegistro(event) {
  event.preventDefault();
  const form = event.target;
  const nome = form.elements[0].value;
  const email = form.elements[1].value;

  usuarioLogado = {
    nome: nome,
    email: email,
  };

  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
  atualizarBotaoLogin();
  fecharModalRegistro();
  mostrarNotificacao(`Conta criada com sucesso, ${nome}!`);
  form.reset();
}

function logout() {
  usuarioLogado = null;
  localStorage.removeItem("usuarioLogado");
  atualizarBotaoLogin();
  mostrarNotificacao("Você foi desconectado");
}

function atualizarBotaoLogin() {
  const btnLogin = document.querySelector(".btn-login");
  if (usuarioLogado) {
    btnLogin.textContent = `👤 ${usuarioLogado.nome}`;
  } else {
    btnLogin.textContent = "Login";
  }
}

// ========================================
// CARREGAR DADOS DO LOCAL STORAGE
// ========================================
window.addEventListener("load", function () {
  // Carregar usuário
  const usuarioSalvo = localStorage.getItem("usuarioLogado");
  if (usuarioSalvo) {
    usuarioLogado = JSON.parse(usuarioSalvo);
    atualizarBotaoLogin();
  }

  // Carregar carrinho
  const carrinhoSalvo = localStorage.getItem("carrinho");
  if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo);
    atualizarCarrinho();
  }

  // Carregar produtos
  carregarProdutos();
});

// ========================================
// FECHAR MODAIS AO CLICAR FORA
// ========================================
window.onclick = function (event) {
  const modalProduto = document.getElementById("modalProduto");
  const modalLogin = document.getElementById("modalLogin");
  const modalRegistro = document.getElementById("modalRegistro");

  if (event.target === modalProduto) {
    fecharModal();
  }
  if (event.target === modalLogin) {
    fecharModalLogin();
  }
  if (event.target === modalRegistro) {
    fecharModalRegistro();
  }
};

// ========================================
// ADICIONAR ANIMAÇÃO AO CSS
// ========================================
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
