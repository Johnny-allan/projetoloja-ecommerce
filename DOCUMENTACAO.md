# 📚 Documentação - ProjetoLoja E-commerce

## 📋 Sobre o Projeto

**ProjetoLoja** é uma loja online completa desenvolvida para demonstração de um e-commerce funcional com área administrativa.

### 🎯 Objetivo
Criar uma plataforma de vendas online simples, responsiva e funcional para aprendizado e demonstração.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização e responsividade
- **JavaScript** - Interatividade e funcionalidades

### Backend
- **Node.js** - Servidor
- **Express.js** - Framework web
- **Dados em memória** - Armazenamento temporário

### Deploy
- **Render.com** - Hospedagem gratuita
- **GitHub** - Controle de versão

---

## 📁 Estrutura do Projeto

```
ProjetoLojafinalizado/
├── front/                  # Frontend da aplicação
│   ├── index.html         # Página principal
│   ├── styles.css         # Estilos CSS
│   └── script.js          # JavaScript do frontend
├── src/                   # Backend da aplicação
│   ├── routes/            # Rotas da API
│   ├── controller/        # Controladores
│   ├── models/            # Modelos de dados
│   └── middleware/        # Middlewares
├── server.js              # Servidor principal
├── package.json           # Dependências do projeto
└── render.yaml           # Configuração do deploy
```

---

## 🚀 Funcionalidades

### 🛍️ Para Clientes
- ✅ **Catálogo de produtos** com 26 itens
- ✅ **Filtros por categoria** (eletrônicos, roupas, livros, alimentos, outros)
- ✅ **Busca por nome** ou descrição
- ✅ **Carrinho de compras** completo
- ✅ **Adicionar/remover itens** do carrinho
- ✅ **Alterar quantidades** no carrinho
- ✅ **Finalizar compra** (demonstração)
- ✅ **Design responsivo** para mobile

### 🔧 Para Administradores
- ✅ **Login administrativo**
- ✅ **Adicionar novos produtos**
- ✅ **Editar produtos existentes**
- ✅ **Deletar produtos**
- ✅ **Gerenciar estoque**
- ✅ **Interface administrativa completa**

### 🎨 Recursos Visuais
- ✅ **Seção Black Friday** com animações
- ✅ **Design moderno** e atrativo
- ✅ **Otimizado para smartphones**
- ✅ **Efeitos CSS** e transições

---

## 🔐 Acesso Administrativo

### Credenciais de Login
- **Email:** `admin@projetoloja.com`
- **Senha:** `admin123`

### Como Acessar
1. Clique em **"Login"** no header
2. Digite as credenciais acima
3. Clique em **"Entrar"**
4. Acesse a aba **"Admin"** no menu

---

## 🌐 Como Usar a Loja

### Para Comprar
1. **Navegue** pelos produtos na página inicial
2. **Use os filtros** para encontrar produtos específicos
3. **Clique em um produto** para ver detalhes
4. **Adicione ao carrinho** os itens desejados
5. **Clique no carrinho** para revisar itens
6. **Finalize a compra** quando pronto

### Para Administrar
1. **Faça login** como administrador
2. **Acesse a aba Admin**
3. **Adicione produtos** preenchendo o formulário
4. **Edite produtos** clicando em "Editar"
5. **Delete produtos** clicando em "Deletar"

---

## 📱 Responsividade

### Dispositivos Suportados
- 💻 **Desktop** (1200px+)
- 📱 **Tablet** (768px - 1199px)
- 📱 **Smartphone** (até 767px)

### Otimizações Mobile
- Header fixo e compacto
- Botões touch-friendly (44px mínimo)
- Modais otimizados para telas pequenas
- Layout adaptativo do carrinho
- Navegação simplificada

---

## 🔧 Instalação Local

### Pré-requisitos
- Node.js instalado
- Git instalado

### Passos
```bash
# 1. Clone o repositório
git clone https://github.com/Johnny-allan/projetoloja-ecommerce.git

# 2. Entre na pasta
cd projetoloja-ecommerce

# 3. Instale dependências
npm install

# 4. Execute o servidor
npm start

# 5. Acesse no navegador
http://localhost:10000
```

---

## 🌍 Deploy Online

### URL da Loja
**https://projetoloja.onrender.com**

### Como Fazer Deploy
1. Faça push do código para GitHub
2. Conecte o repositório no Render.com
3. Configure as variáveis de ambiente
4. Deploy automático!

---

## 📊 Dados do Sistema

### Produtos Disponíveis
- **26 produtos** em 5 categorias
- **Imagens** do Unsplash
- **Preços** de R$ 19,99 a R$ 2.499,99
- **Estoque** controlado por produto

### Categorias
- **Eletrônicos** (11 produtos)
- **Roupas** (4 produtos)
- **Livros** (4 produtos)
- **Alimentos** (4 produtos)
- **Outros** (3 produtos)

---

## ⚠️ Limitações

### Sistema de Demonstração
- **Dados em memória** - resetam a cada reinicialização
- **Sem pagamento real** - apenas simulação
- **Login simples** - sem criptografia avançada
- **Sem banco de dados** - dados temporários

### Para Produção Real
- Implementar banco de dados (PostgreSQL/MySQL)
- Sistema de pagamento (Stripe/PayPal)
- Autenticação JWT
- Upload de imagens
- Sistema de pedidos
- Envio de emails

---

## 🆘 Suporte

### Problemas Comuns
- **Site não carrega:** Aguarde ~30s (Render pode estar "dormindo")
- **Produtos não aparecem:** Verifique se a API está respondendo
- **Login não funciona:** Use exatamente as credenciais fornecidas
- **Mobile com problemas:** Limpe o cache do navegador

### Contato
- **Desenvolvedor:** Johnny Allan
- **GitHub:** https://github.com/Johnny-allan/projetoloja-ecommerce
- **Projeto:** Demonstração educacional

---

## 📝 Licença

Este projeto é para fins educacionais e de demonstração.

**© 2025 ProjetoLoja - Todos os direitos reservados**