// Script para adicionar produtos iniciais à loja
const API_BASE_URL = 'http://localhost:3000/api';

const produtosIniciais = [
    {
        nome: "Smartphone Samsung Galaxy A54",
        preco: 1299.99,
        descricao: "Smartphone com tela de 6.4 polegadas, câmera tripla de 50MP e bateria de 5000mAh",
        estoque: 15,
        categoria: "eletrônicos",
        imagem: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop"
    },
    {
        nome: "Notebook Dell Inspiron 15",
        preco: 2499.99,
        descricao: "Notebook com processador Intel i5, 8GB RAM, SSD 256GB e tela Full HD",
        estoque: 8,
        categoria: "eletrônicos",
        imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop"
    },
    {
        nome: "Fone de Ouvido Bluetooth JBL",
        preco: 199.99,
        descricao: "Fone wireless com cancelamento de ruído e bateria de 30 horas",
        estoque: 25,
        categoria: "eletrônicos",
        imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
    },
    {
        nome: "Camiseta Básica Algodão",
        preco: 39.99,
        descricao: "Camiseta 100% algodão, disponível em várias cores e tamanhos",
        estoque: 50,
        categoria: "roupas",
        imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop"
    },
    {
        nome: "Calça Jeans Masculina",
        preco: 89.99,
        descricao: "Calça jeans slim fit, tecido resistente e confortável",
        estoque: 30,
        categoria: "roupas",
        imagem: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop"
    },
    {
        nome: "Tênis Esportivo Nike",
        preco: 299.99,
        descricao: "Tênis para corrida com tecnologia de amortecimento avançado",
        estoque: 20,
        categoria: "roupas",
        imagem: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop"
    },
    {
        nome: "O Alquimista - Paulo Coelho",
        preco: 24.99,
        descricao: "Livro bestseller sobre seguir seus sonhos e encontrar seu destino",
        estoque: 40,
        categoria: "livros",
        imagem: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop"
    },
    {
        nome: "1984 - George Orwell",
        preco: 29.99,
        descricao: "Clássico da literatura distópica sobre totalitarismo e vigilância",
        estoque: 35,
        categoria: "livros",
        imagem: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop"
    },
    {
        nome: "Café Especial Torrado",
        preco: 18.99,
        descricao: "Café 100% arábica, torrado artesanalmente, 500g",
        estoque: 60,
        categoria: "alimentos",
        imagem: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop"
    },
    {
        nome: "Chocolate Artesanal 70% Cacau",
        preco: 12.99,
        descricao: "Chocolate premium com 70% de cacau, sabor intenso e marcante",
        estoque: 45,
        categoria: "alimentos",
        imagem: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=300&fit=crop"
    },
    {
        nome: "Mochila Executiva",
        preco: 149.99,
        descricao: "Mochila resistente à água com compartimento para notebook até 15.6 polegadas",
        estoque: 18,
        categoria: "outros",
        imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"
    },
    {
        nome: "Garrafa Térmica Inox",
        preco: 45.99,
        descricao: "Garrafa térmica de aço inoxidável, mantém temperatura por 12 horas",
        estoque: 32,
        categoria: "outros",
        imagem: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop"
    }
];

async function adicionarProdutos() {
    console.log('Iniciando adição de produtos...');
    
    for (const produto of produtosIniciais) {
        try {
            const response = await fetch(`${API_BASE_URL}/produtos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produto)
            });
            
            const data = await response.json();
            
            if (data.success) {
                console.log(`✓ Produto adicionado: ${produto.nome}`);
            } else {
                console.log(`✗ Erro ao adicionar ${produto.nome}: ${data.message}`);
            }
        } catch (error) {
            console.log(`✗ Erro ao adicionar ${produto.nome}:`, error.message);
        }
        
        // Pequena pausa entre requisições
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('Finalizado!');
}

// Executar se for chamado diretamente no navegador
if (typeof window !== 'undefined') {
    adicionarProdutos();
}

// Exportar para Node.js se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { produtosIniciais, adicionarProdutos };
}