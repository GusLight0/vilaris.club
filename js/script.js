// Global Variables
let cart = [];
const WHATSAPP_NUMBER = '5598970216233';
const FORMATADOR_PRECO = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

function formatarPreco(preco) {
    return FORMATADOR_PRECO.format(preco);
}

function montarPrecoMarkup(preco) {
    const partes = FORMATADOR_PRECO.formatToParts(preco);
    let moeda = 'R$';
    let valor = '';

    partes.forEach(parte => {
        if (parte.type === 'currency') moeda = parte.value;
        if (['integer', 'group', 'decimal', 'fraction'].includes(parte.type)) {
            valor += parte.value;
        }
    });

    return `<span class="preco-moeda">${moeda}</span><span class="preco-valor">${valor}</span>`;
}

// Mock Database para Detalhes Profissionais
const PRODUTOS_DB = {
    'produto-1': {
        nome: 'Óculos Sunset Safari',
        preco: 79.99,
        cor: 'Tartaruga / Tartoise',
        descricao: 'Armação tartaruga com lentes verde oliva, trazendo um visual resort clássico e leve. O formato arredondado valoriza o rosto sem pesar e combina bem com produções de praia, linho e tons naturais.',
        especificacoes: ['Proteção UV400', 'Lentes verde oliva', 'Armação tartaruga', 'Formato arredondado', 'Detalhe metálico lateral'],
        imagens: ['./assets/images/insta-7.png']
    },
    'produto-2': {
        nome: 'Óculos Midnight',
        preco: 79.99,
        cor: 'Preto',
        descricao: 'Modelo preto com lente escura e presença noturna sofisticada. A silhueta levemente oval entrega um acabamento urbano, minimalista e elegante para quem prefere um visual discreto e marcante.',
        especificacoes: ['Proteção UV400', 'Lentes escuras', 'Armação preta', 'Design oval minimalista', 'Detalhe lateral discreto'],
        imagens: ['./assets/images/insta-3.jpg']
    },
    'produto-3': {
        nome: 'Óculos Yellow Sunset',
        preco: 69.99,
        cor: 'Preto & Amarelo',
        descricao: 'Armação preta com lentes amarelas translúcidas, feita para um visual solar e descontraído. É uma peça leve, moderna e perfeita para destacar looks claros, praia e fim de tarde.',
        especificacoes: ['Proteção UV400', 'Lentes amarelas', 'Armação preta', 'Formato redondo leve', 'Visual sunset'],
        imagens: ['./assets/images/insta-6.jpg']
    },
    'produto-4': {
        nome: 'Óculos Breeze',
        preco: 74.99,
        cor: 'Preto & Marrom',
        descricao: 'O Breeze combina armação preta com lentes marrons, criando uma leitura quente e elegante. O desenho arredondado tem aparência leve e casual, ideal para uso diário com estética praiana sofisticada.',
        especificacoes: ['Proteção UV400', 'Lentes marrons', 'Armação preta', 'Formato redondo', 'Acabamento leve para o dia a dia'],
        imagens: ['./assets/images/insta-5.jpg']
    },
    'produto-5': {
        nome: 'Óculos Crystal Blue',
        preco: 79.99,
        cor: 'Preto & Ciano',
        descricao: 'Modelo com armação preta e lentes azul ciano translúcidas, trazendo frescor visual e uma pegada beach club. A lente clara cria um efeito cristalino, moderno e fácil de combinar com tons neutros.',
        especificacoes: ['Proteção UV400', 'Lentes ciano translúcidas', 'Armação preta', 'Visual crystal', 'Detalhe metálico lateral'],
        imagens: ['./assets/images/insta-4.jpg']
    },
    'produto-6': {
        nome: 'Óculos Crystal Grey',
        preco: 74.99,
        cor: 'Preto & Cinza',
        descricao: 'Armação cinza translúcida com lentes fumê, equilibrando modernidade e discrição. O acabamento cristalizado deixa o modelo elegante, versátil e com presença premium sem exagero.',
        especificacoes: ['Proteção UV400', 'Lentes cinza fumê', 'Armação cinza translúcida', 'Formato arredondado', 'Detalhes dourados laterais'],
        imagens: ['./assets/images/insta-8.jpg']
    },
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
                    <h2>${produto.nome}</h2>
                    <div class="modal-price">${montarPrecoMarkup(produto.preco)}</div>
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
    if ((window.location.hash === '#cart' || window.location.hash === '#cartModal') && document.getElementById('cartModal')) {
        abrirCarrinho();
    }
});

// Navigation
function initializeNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                fecharCarrinho();
            }

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

function fecharMenuMobile() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (navMenu) navMenu.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
}

// Cart Functions
function initializeCart() {
    const cartIcons = document.querySelectorAll('.cart-icon');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartModal = document.getElementById('cartModal');

    if (cartIcons.length && cartModal) {
        cartIcons.forEach(cartIcon => cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            if (cartModal.classList.contains('active')) {
                fecharCarrinho();
            } else {
                abrirCarrinho();
            }
        }));
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
    const cartIcons = document.querySelectorAll('.cart-icon');
    cartIcons.forEach(cartIcon => {
        cartIcon.classList.remove('cart-shake');
        void cartIcon.offsetWidth; // Trigger reflow to restart animation
        cartIcon.classList.add('cart-shake');
    });
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
    const cartCounts = document.querySelectorAll('.cart-count');
    const subtotalSpan = document.getElementById('subtotal');
    const totalSpan = document.getElementById('total');

    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantidade, 0);
    cartCounts.forEach(cartCount => {
        cartCount.textContent = totalItems;
    });

    // Update items
    if (cartItemsDiv) {
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        } else {
            cartItemsDiv.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.nome}</h4>
                        <p>${formatarPreco(item.preco)}</p>
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
        subtotalSpan.textContent = formatarPreco(subtotal);
    }
    if (totalSpan) {
        totalSpan.textContent = formatarPreco(subtotal);
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
        mensagem += `   Valor: ${formatarPreco(item.preco)}\n\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    mensagem += `💰 Total do pedido: ${formatarPreco(total)}\n\n`;
    
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
    const clearSearchBtn = document.getElementById('clearSearchBtn');

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
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;

            e.preventDefault();

            const activeFiltroBtn = document.querySelector('.filtro-btn.active');
            const activeFiltro = activeFiltroBtn ? activeFiltroBtn.dataset.filtro : 'todos';

            filtrarProdutos(activeFiltro, e.target.value.trim());
            fecharMenuMobile();
            searchInput.blur();
            scrollToSection('produtos');
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', limparPesquisaProdutos);
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

        if (produto._filterTimer) {
            clearTimeout(produto._filterTimer);
        }

        if (mostrar) {
            visibleCount++;
            produto.style.display = 'flex';
            requestAnimationFrame(() => {
                produto.classList.remove('product-hidden');
            });
        } else {
            produto.classList.add('product-hidden');
            produto._filterTimer = setTimeout(() => {
                if (produto.classList.contains('product-hidden')) {
                    produto.style.display = 'none';
                }
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

function limparPesquisaProdutos() {
    const searchInput = document.getElementById('searchInput');
    const filtroButtons = document.querySelectorAll('.filtro-btn');
    const todosBtn = document.querySelector('.filtro-btn[data-filtro="todos"]');
    const filterToggle = document.getElementById('filterToggle');
    const filterMenu = document.getElementById('filterMenu');

    if (searchInput) searchInput.value = '';

    filtroButtons.forEach(btn => btn.classList.remove('active'));
    if (todosBtn) todosBtn.classList.add('active');

    filtrarProdutos('todos', '');
    if (filterToggle) filterToggle.classList.remove('active');
    if (filterMenu) filterMenu.classList.remove('active');
    scrollToSection('produtos');
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
    if (document.getElementById('cartModal') && (e.target.matches('.cart-icon') || e.target.closest('.cart-icon'))) {
        e.preventDefault();
    }
});
