# 🚀 Deploy no Render - Guia Passo a Passo

## 1. Preparar o Repositório GitHub

### Criar repositório no GitHub:
1. Acesse [github.com](https://github.com)
2. Clique em "New repository"
3. Nome: `projetoloja-ecommerce`
4. Deixe público
5. Clique em "Create repository"

### Fazer upload do código:
```bash
# No terminal, dentro da pasta do projeto:
git init
git add .
git commit -m "Projeto loja e-commerce completo"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/projetoloja-ecommerce.git
git push -u origin main
```

## 2. Deploy no Render

### Conectar com Render:
1. Acesse [render.com](https://render.com)
2. Faça login/cadastro
3. Clique em "New +" → "Web Service"
4. Conecte sua conta GitHub
5. Selecione o repositório `projetoloja-ecommerce`

### Configurações do Deploy:
- **Name:** `projetoloja`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** Free

### Variáveis de Ambiente:
Adicione estas variáveis em "Environment":
- `NODE_ENV` = `production`
- `PORT` = `10000`

## 3. Finalizar Deploy

1. Clique em "Create Web Service"
2. Aguarde o build (5-10 minutos)
3. Sua loja estará disponível em: `https://projetoloja.onrender.com`

## 🔐 Acesso Admin

Após o deploy, acesse:
- **URL:** `https://projetoloja.onrender.com`
- **Admin:** admin@projetoloja.com
- **Senha:** admin123

## ⚠️ Importante

- O Render pode demorar ~30 segundos para "acordar" na primeira visita
- Todos os dados são em memória (resetam a cada deploy)
- Para dados persistentes, configure um banco PostgreSQL no Render

## 🆘 Problemas Comuns

### Build falha:
- Verifique se o `package.json` está correto
- Confirme que todas as dependências estão listadas

### Aplicação não inicia:
- Verifique os logs no dashboard do Render
- Confirme se a porta está configurada corretamente

### 404 nas rotas da API:
- Verifique se o servidor está servindo as rotas corretas
- Teste localmente primeiro