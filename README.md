# 🕶️ Velaris - Website Premium de Óculos de Luxo

Website sofisticado, minimalista e elegante para a marca **Velaris**, especializada em óculos de beach luxury.

## 📋 Estrutura do Projeto

```
velaris.club/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos principais (responsive)
├── js/
│   └── script.js          # Funcionalidades JavaScript
├── pages/
│   ├── sobre.html         # Página Sobre
│   └── contato.html       # Página de Contato
├── assets/
│   ├── images/            # Imagens de produtos e lifestyle
│   ├── icons/             # Ícones customizados
│   └── videos/            # Vídeos (hero section)
└── README.md              # Este arquivo
```

## 🎨 Identidade Visual

### Paleta de Cores
- **Branco Sofisticado**: #ffffff
- **Azul Marinho**: #001a33 (principal)
- **Azul Oceano**: #1a4d7a
- **Azul Aqua**: #5ac7dd
- **Azul Gelo**: #bdefff
- **Off-white Azul**: #f2fbff / #f5fbff
- **Textos**: #333333
- **Secundário**: #0066cc

### Tipografia
- Font-family: 'Segoe UI', Trebuchet MS, sans-serif
- Weights: 200 (light), 300 (light), 400 (regular), 500 (medium), 600 (bold)
- Letter-spacing: Amplo (0.03em a 0.08em para elegância)

## 🚀 Funcionalidades Principais

### 1. **Navegação Premium**
- Navbar minimalista e responsiva
- Menu mobile hamburger
- Logo sofisticado
- Carrinho flutuante com contador

### 2. **Hero Section Cinematográfica**
- Background com vídeo/imagem
- Overlay gradiente sofisticado
- Animações fade-in suaves
- Botões elegantes com efeito hover

### 3. **Sistema de Carrinho com WhatsApp**
- Adicionar produtos ao carrinho
- Ajustar quantidades
- Remover itens
- Envio automático para WhatsApp com formatação profissional
- Observações personalizadas
- LocalStorage para persistência

### 4. **Catálogo de Produtos**
- Grid responsivo
- Badges (Destaque, Promoção, Novo)
- Hover effects elegantes
- Filtros por categoria
- Buscador integrado
- Pronta entrega destacada

### 5. **Coleções**
- Summer Collection
- Ocean Collection
- Premium Edition
- Sunset Collection
- Classic Collection
- Resort Aesthetic

### 6. **Seção Lifestyle Editorial**
- Layout masonry responsivo
- Imagens cinematográficas
- Aesthetic resort luxury

### 7. **Integração Social**
- Feed Instagram estilizado
- Links diretos para redes
- WhatsApp integrado
- TikTok

### 8. **FAQ Section**
- Perguntas frequentes
- Design clean
- Hover effects

### 9. **Página Sobre**
- História da marca
- Visão e valores
- Grid de valores com ícones
- Design sofisticado

### 10. **Página de Contato**
- Formulário de contato
- Integração WhatsApp
- Informações de contato
- Redes sociais
- Horário de atendimento

## 📱 Responsividade

O website é **100% responsivo** com breakpoints estratégicos:

- **Desktop**: 1400px+ (experiência completa)
- **Tablet**: 768px-1399px (ajustes de grid)
- **Mobile**: até 767px (otimizado ao máximo)
- **Small Mobile**: até 480px (menu compacto, textos otimizados)

### Mobile-First Priorities
- Navegação fluida e intuitiva
- Touch-friendly buttons e elementos
- Carregamento otimizado
- Layout adaptável automaticamente

## 🛒 Sistema de Carrinho

### Fluxo de Compra
1. Usuário navega catálogo
2. Clica "Adicionar ao Carrinho"
3. Visualiza no carrinho (sidebar)
4. Ajusta quantidades ou remove itens
5. Adiciona observações (opcional)
6. Clica "Comprar pelo WhatsApp"
7. Mensagem formatada é enviada automaticamente

### Formato da Mensagem WhatsApp
```
Olá! Gostaria de realizar o seguinte pedido:

🕶️ Produto: Óculos Ocean Black
Quantidade: 2
Valor: R$ 129,90

🕶️ Produto: Sunset Premium
Quantidade: 1
Valor: R$ 149,90

💰 Total do pedido: R$ 409,70

📝 Observações: [cliente adiciona aqui]

Gostaria de confirmar disponibilidade.
```

## ⚡ Animações

- **Fade In Up**: Elementos aparecem deslizando para cima
- **Zoom Hover**: Produtos têm zoom suave no hover
- **Blur Transitions**: Transições suaves entre estados
- **Parallax Leve**: Scroll effects sutis
- **Microinterações**: Feedback visual em botões e filtros

## 🔧 Como Customizar

### Adicionar Novos Produtos
No `index.html`, copie a estrutura de `.produto-card`:

```html
<div class="produto-card" data-filtro="destaque">
    <div class="produto-image">
        <img src="assets/images/novo-produto.jpg" alt="Nome">
        <span class="badge destaque">Destaque</span>
        <div class="produto-hover">
            <button class="btn-add-cart" onclick="adicionarAoCarrinho('Nome', 129.90)">
                <i class="fas fa-shopping-bag"></i> Adicionar
            </button>
        </div>
    </div>
    <div class="produto-info">
        <h3>Nome do Produto</h3>
        <p class="descricao">Descrição elegante</p>
        <div class="produto-footer">
            <span class="preco">R$ 129,90</span>
            <span class="badge-entrega">Pronta Entrega</span>
        </div>
    </div>
</div>
```

### Mudar Cores
Edite as variáveis CSS em `css/styles.css`:

```css
:root {
    --primary: #001a33;        /* Azul marinho */
    --secondary: #f2fbff;      /* Branco azulado */
    --accent: #0066cc;         /* Azul destaque */
    --aqua: #5ac7dd;           /* Azul aqua */
    --ice-blue: #bdefff;       /* Azul claro */
    --ocean: #1a4d7a;          /* Oceano */
    /* ... */
}
```

### Números WhatsApp
Procure por `5598970216233` nos arquivos e substitua pelo número desejado.

### Redes Sociais
Atualize os links Instagram, TikTok e WhatsApp em todo o projeto.

## 📊 SEO & Performance

### Otimizações Implementadas
- Meta tags apropriadas
- Estrutura semântica HTML5
- CSS minimalista e otimizado
- JavaScript sem dependências externas
- Lazy loading de imagens
- LocalStorage para carrinho (sem servidor necessário)

## 🌐 Deployment

### Opções
1. **GitHub Pages** (grátis, estático)
2. **Netlify** (grátis, com formulários)
3. **Vercel** (grátis, performance excelente)
4. **Servidor próprio** (completo controle)

### Instrções Básicas
1. Faça upload de todos os arquivos
2. Defina `index.html` como página inicial
3. Configure CORS se necessário
4. Teste responsividade em diferentes dispositivos

## 📝 Notas Importantes

- **Sem Gateway de Pagamento**: O site usa WhatsApp para finalizar pedidos
- **Pronta Entrega**: Todos os produtos são de estoque imediato
- **Delivery Local**: Não há envio interestadual por enquanto
- **Sem Endereço Físico**: Operação 100% online
- **Atendimento WhatsApp**: Principal canal de comunicação

## 🎯 KPIs Esperados

- ✅ Aumentar vendas
- ✅ Fortalecer branding
- ✅ Demonstrar profissionalismo
- ✅ Exibir catálogo premium
- ✅ Atrair clientes qualificados
- ✅ Aumentar autoridade visual
- ✅ Criar presença digital sofisticada

## 📞 Contato

- **WhatsApp**: +55 98 97021-6233
- **Instagram**: @velaris.club
- **Email**: (adicione se disponível)

## 📄 Licença

Desenvolvido para Velaris - Luxury Beach Eyewear
© 2024 Todos os direitos reservados.

---

**Desenvolvido com ❤️ para Velaris**

Elegância em cada detalhe. Minimalismo sofisticado para todos os momentos.
