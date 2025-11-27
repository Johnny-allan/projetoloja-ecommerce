require('dotenv').config();
const sequelize = require('./src/config/database');
const Produto = require('./src/models/produto');
const Usuario = require('./src/models/usuario');
const bcrypt = require('bcryptjs');

const produtosDemonstracao = [
  {
    nome: "Smartphone Samsung Galaxy",
    preco: 899.99,
    descricao: "Smartphone com tela de 6.1 polegadas, 128GB de armazenamento",
    estoque: 15,
    categoria: "eletrônicos",
    imagem: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
  },
  {
    nome: "Notebook Dell Inspiron",
    preco: 2499.99,
    descricao: "Notebook com processador Intel i5, 8GB RAM, SSD 256GB",
    estoque: 8,
    categoria: "eletrônicos",
    imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop"
  },
  {
    nome: "Camiseta Básica",
    preco: 39.90,
    descricao: "Camiseta 100% algodão, disponível em várias cores",
    estoque: 50,
    categoria: "roupas",
    imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop"
  },
  {
    nome: "Livro: JavaScript Moderno",
    preco: 89.90,
    descricao: "Guia completo para desenvolvimento web com JavaScript",
    estoque: 25,
    categoria: "livros",
    imagem: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop"
  },
  {
    nome: "Café Premium",
    preco: 24.99,
    descricao: "Café especial torrado artesanalmente, 250g",
    estoque: 30,
    categoria: "alimentos",
    imagem: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=200&fit=crop"
  },
  {
    nome: "Fone Bluetooth",
    preco: 199.99,
    descricao: "Fone de ouvido sem fio com cancelamento de ruído",
    estoque: 20,
    categoria: "eletrônicos",
    imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
  }
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco!');
    
    await sequelize.sync({ force: true });
    console.log('Tabelas criadas!');
    
    // Criar usuário admin
    const senhaHash = await bcrypt.hash('admin123', 10);
    await Usuario.create({
      nome: 'Administrador',
      email: 'admin@projetoloja.com',
      senha: senhaHash,
      tipo: 'admin'
    });
    
    // Criar produtos
    await Produto.bulkCreate(produtosDemonstracao);
    
    console.log('Dados de demonstração inseridos com sucesso!');
    console.log('Login admin: admin@projetoloja.com / admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Erro:', error);
    process.exit(1);
  }
}

seed();