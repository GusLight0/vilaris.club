// Global Variables
let cart = [];
const WHATSAPP_NUMBER = '5598970216233';

// Mock Database para Detalhes Profissionais
const PRODUTOS_DB = {
    'produto-1': {
        nome: 'Ocean Black Classic',
        preco: 129.90,
        cor: 'Preto Carbono',
        descricao: 'Inspirado nas profundezas do Atlântico, o Ocean Black combina acetato italiano com lentes polarizadas de alta tecnologia.',
        especificacoes: ['Proteção UV400', 'Lentes Polarizadas', 'Acetato Premium', 'Hastes Flexíveis'],
        imagens: ['./assets/images/insta-2.jpg', './assets/images/insta-3.jpg']
    },
    'produto-2': {
        nome: 'Sunset Premium',
        preco: 149.90,
        cor: 'Tartaruga / Dourado',
        descricao: 'O Sunset Premium traz o brilho do entardecer para o seu olhar. Com detalhes em metal nobre e acabamento polido à mão, é a escolha perfeita para o lifestyle resort.',
        especificacoes: ['Proteção UV400', 'Lentes Gradientes', 'Detalhes em Metal', 'Conforto Anatômico'],
        imagens: ['./assets/images/insta-3.jpg']
    },
    'produto-3': {
        nome: 'Areia Sofisticada',
        preco: 139.90,
        cor: 'Nude Matte',
        descricao: 'Tons neutros que harmonizam com qualquer ambiente. O modelo Areia é leve e resistente, ideal para uso prolongado.',
        especificacoes: ['Proteção UV400', 'Acetato Fosco', 'Design Anatômico', 'Ultra Leve'],
        imagens: ['./assets/images/insta-4.jpg']
    },
    'produto-4': {
        nome: 'Marítimo Clean',
        preco: 119.90,
        cor: 'Crystal / Azul',
        descricao: 'Transparência e leveza definem o Marítimo Clean. Um visual moderno para quem busca um acessório discreto e marcante.',
        especificacoes: ['Proteção UV400', 'Lentes Cristalinas', 'Acabamento Premium'],
        imagens: ['./assets/images/insta-5.jpg']
    },
    'produto-5': {
        nome: 'Luxe Azul',
        preco: 159.90,
        cor: 'Navy Blue',
        descricao: 'O auge da sofisticação. O Luxe Azul traz detalhes refinados e uma cor exclusiva que remete ao mar profundo.',
        especificacoes: ['Proteção UV400', 'Lentes Polarizadas', 'Hastes Reforçadas', 'Edição Limitada'],
        imagens: ['./assets/images/insta-6.jpg']
    }
};

// Modal de Produto
function abrirPaginaProduto(id) {
    const produto = PRODUTOS_DB[id];
    if (!produto) return;

    const modal = document.getElementById('productDetailModal');
    // Remove inline styles from close button and move to CSS
    modal.innerHTML = `
        <div class="container">
            <button class="close-product-modal" onclick="fecharDetalhes()">&times;</button>
            <div class="modal-container">
                <div class="modal-gallery">
                    <img src="${produto.imagens[0]}" class="main-img" id="mainModalImg">
                    <div class="thumb-grid" style="${produto.imagens.length <= 1 ? 'display:none' : ''}">
                        ${produto.imagens.map((img, index) => `<img src="${img}" class="thumb-img ${index === 0 ? 'active' : ''}" onclick="selectThumbnail(this, '${img}')">`).join('')}
                    </div>
                </div>
                <div class="modal-info">
                    <span class="badge destaque">Best Seller</span>
                    <h2>${produto.nome}</h2>
                    <div class="modal-price">R$ ${produto.preco.toFixed(2)}</div>
                    <div class="modal-color"><strong>Cor:</strong> ${produto.cor}</div>
                    <div class="modal-description">${produto.descricao}</div>
                    
                    <div class="modal-features">
                        <h4>Características:</h4>
                        <ul>
                            ${produto.especificacoes.map(spec => `<li>${spec}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal-actions">
                        <div class="quantity-selector">
                            <button class="qty-btn" onclick="updateModalQuantity(-1)">-</button>
                            <span id="modalQuantity">1</span>
                            <button class="qty-btn" onclick="updateModalQuantity(1)">+</button>
                        </div>
                        <button class="btn btn-primary full-width" onclick="adicionarAoCarrinho('${produto.nome}', ${produto.preco}, parseInt(document.getElementById('modalQuantity').textContent)); fecharDetalhes();">Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Initialize quantity for the modal
    modal.dataset.currentQuantity = 1;
}

function updateModalQuantity(change) {
    const modal = document.getElementById('productDetailModal');
    let currentQuantity = parseInt(modal.dataset.currentQuantity);
    currentQuantity += change;
    if (currentQuantity < 1) currentQuantity = 1;
    modal.dataset.currentQuantity = currentQuantity;
    document.getElementById('modalQuantity').textContent = currentQuantity;
}

function selectThumbnail(element, imgSrc) {
    document.getElementById('mainModalImg').src = imgSrc;
    document.querySelectorAll('.thumb-img').forEach(thumb => thumb.classList.remove('active'));
    element.classList.add('active');
}

function fecharDetalhes() {
    const modal = document.getElementById('productDetailModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeNav();
    initializeCart();
    initializeFilters();
    initializeFAQ();
    loadCartFromStorage();
    atualizarCarrinho();
});

// Navigation
function initializeNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Cart Functions
function initializeCart() {
    const cartIcon = document.querySelector('.cart-icon');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartModal = document.getElementById('cartModal');

    if (cartIcon && cartModal) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            if (cartModal.classList.contains('active')) {
                fecharCarrinho();
            } else {
                abrirCarrinho();
            }
        });
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', fecharCarrinho);
    }

    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                fecharCarrinho();
            }
        });
    }
}

function abrirCarrinho() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.add('active');
    }
}

function fecharCarrinho() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.remove('active');
    }
}

function adicionarAoCarrinho(nome, preco, quantidade = 1) {
    const item = cart.find(item => item.nome === nome);
    
    if (item) {
        item.quantidade += quantidade;
    } else {
        cart.push({
            id: cart.length,
            nome: nome,
            preco: preco,
            quantidade: quantidade
        });
    }

    salvarCarrinhoStorage();
    atualizarCarrinho();
    abrirCarrinho();
    
    // Animation feedback
    mostrarNotificacao('Produto adicionado ao carrinho!');
    
    // Shake icon effect
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.classList.remove('cart-shake');
        void cartIcon.offsetWidth; // Trigger reflow to restart animation
        cartIcon.classList.add('cart-shake');
    }
}

function removerDoCarrinho(id) {
    cart = cart.filter(item => item.id !== id);
    salvarCarrinhoStorage();
    atualizarCarrinho();
}

function atualizarQuantidade(id, quantidade) {
    const item = cart.find(item => item.id === id);
    if (item) {
        if (quantidade > 0) {
            item.quantidade = quantidade;
        } else {
            removerDoCarrinho(id);
        }
        salvarCarrinhoStorage();
        atualizarCarrinho();
    }
}

function atualizarCarrinho() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartCount = document.querySelector('.cart-count');
    const subtotalSpan = document.getElementById('subtotal');
    const totalSpan = document.getElementById('total');

    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantidade, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }

    // Update items
    if (cartItemsDiv) {
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        } else {
            cartItemsDiv.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.nome}</h4>
                        <p>R$ ${item.preco.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="atualizarQuantidade(${item.id}, ${item.quantidade - 1})">−</button>
                        <span style="width: 25px; text-align: center;">${item.quantidade}</span>
                        <button class="qty-btn" onclick="atualizarQuantidade(${item.id}, ${item.quantidade + 1})">+</button>
                        <button class="qty-btn" onclick="removerDoCarrinho(${item.id})" style="background: #f0f0f0; color: #d32f2f;">×</button>
                    </div>
                </div>
            `).join('');
        }
    }

    // Update totals
    const subtotal = cart.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    if (subtotalSpan) {
        subtotalSpan.textContent = `R$ ${subtotal.toFixed(2)}`;
    }
    if (totalSpan) {
        totalSpan.textContent = `R$ ${subtotal.toFixed(2)}`;
    }
}

function salvarCarrinhoStorage() {
    localStorage.setItem('velaris_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('velaris_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function finalizarCompra() {
    if (cart.length === 0) {
        mostrarNotificacao('Seu carrinho está vazio!');
        return;
    }

    const observacoes = document.getElementById('observacoes').value;
    
    // Build message
    let mensagem = 'Olá! Gostaria de realizar o seguinte pedido:\n\n';
    
    cart.forEach(item => {
        const totalItem = (item.preco * item.quantidade).toFixed(2);
        mensagem += `🕶️ Produto: ${item.nome}\n`;
        mensagem += `   Quantidade: ${item.quantidade}\n`;
        mensagem += `   Valor: R$ ${item.preco.toFixed(2)}\n\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    mensagem += `💰 Total do pedido: R$ ${total.toFixed(2)}\n\n`;
    
    if (observacoes) {
        mensagem += `📝 Observações: ${observacoes}\n\n`;
    }

    mensagem += 'Gostaria de confirmar disponibilidade.';

    // URL encode and open WhatsApp
    const urlEncodedMessage = encodeURIComponent(mensagem);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${urlEncodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after sending
    setTimeout(() => {
        cart = [];
        salvarCarrinhoStorage();
        atualizarCarrinho();
        fecharCarrinho();
        mostrarNotificacao('Pedido enviado com sucesso!');
    }, 500);
}

// Filters
function initializeFilters() {
    const filterToggle = document.getElementById('filterToggle');
    const filterMenu = document.getElementById('filterMenu');
    const filtroButtons = document.querySelectorAll('.filtro-btn');
    const searchInput = document.getElementById('searchInput');

    atualizarContadoresFiltros();

    if (filterToggle && filterMenu) {
        filterToggle.addEventListener('click', () => {
            filterToggle.classList.toggle('active');
            filterMenu.classList.toggle('active');
        });
    }

    filtroButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filtroButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filtro = btn.dataset.filtro;
            filtrarProdutos(filtro, searchInput.value);
            
            // Rola para a seção de produtos ao filtrar
            scrollToSection('produtos');

            // Fecha o menu após filtrar (opcional, melhora mobile UX)
            if (window.innerWidth < 768) {
                filterToggle.classList.remove('active');
                filterMenu.classList.remove('active');
            }
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeFiltro = document.querySelector('.filtro-btn.active').dataset.filtro;
            filtrarProdutos(activeFiltro, e.target.value);

            // Se o usuário começar a digitar, redireciona para a seção de produtos
            if (e.target.value.length > 0) {
                scrollToSection('produtos');
            }
        });
    }
}

function atualizarContadoresFiltros(searchTerm = '') {
    const botoes = document.querySelectorAll('.filtro-btn');
    const produtos = document.querySelectorAll('.produto-card');

    botoes.forEach(btn => {
        const cat = btn.dataset.filtro;
        let count = 0;

        produtos.forEach(p => {
            const matchesFiltro = cat === 'todos' || p.dataset.filtro.includes(cat);
            const matchesSearch = !searchTerm || p.querySelector('.produto-info h3').textContent.toLowerCase().includes(searchTerm.toLowerCase());
            if (matchesFiltro && matchesSearch) count++;
        });

        let countSpan = btn.querySelector('.filter-count');
        if (!countSpan) {
            countSpan = document.createElement('span');
            countSpan.className = 'filter-count';
            btn.appendChild(countSpan);
        }
        countSpan.textContent = `(${count})`;
    });
}

function filtrarProdutos(filtro, searchTerm = '') {
    const produtos = document.querySelectorAll('.produto-card');
    const noResults = document.getElementById('noResults');
    let visibleCount = 0;
    
    produtos.forEach(produto => {
        let mostrar = true;

        // Filter by category
        if (filtro !== 'todos' && !produto.dataset.filtro.includes(filtro)) {
            mostrar = false;
        }

        // Filter by search
        if (searchTerm) {
            const nomeProduto = produto.querySelector('.produto-info h3').textContent.toLowerCase();
            if (!nomeProduto.includes(searchTerm.toLowerCase())) {
                mostrar = false;
            }
        }

        if (mostrar) {
            visibleCount++;
            produto.classList.remove('product-hidden');
            setTimeout(() => {
                produto.style.display = 'flex';
            }, 10);
        } else {
            produto.classList.add('product-hidden');
            setTimeout(() => {
                produto.style.display = 'none';
            }, 300);
        }
    });

    atualizarContadoresFiltros(searchTerm);

    if (noResults) {
        if (visibleCount === 0) {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
        }
    }
}

// FAQ Accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os outros
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));
            
            // Abre o atual se não estava ativo
            if (!isActive) item.classList.add('active');
        });
    });
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - 100; // Offset para a navbar
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 500; // Duração em ms (mais lento = mais cinematográfico)
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
            if (progress < duration) window.requestAnimationFrame(step);
        }

        // Função de Easing (Quad) para suavidade cinematográfica
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        window.requestAnimationFrame(step);
    }
}

// Notification
function mostrarNotificacao(mensagem) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 1rem 2rem;
        border-radius: 2px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInLeft 0.3s ease-out;
    `;
    notif.textContent = mensagem;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// Image lazy loading
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.produto-card, .colecao-card, .faq-item').forEach(el => {
    observer.observe(el);
});

// Prevent cart count increment glitch
document.addEventListener('click', (e) => {
    if (e.target.matches('.cart-icon') || e.target.closest('.cart-icon')) {
        e.preventDefault();
    }
});
