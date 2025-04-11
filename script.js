const baseProducts = [
    {
        name: "Black Lotus",
        price: 999999.99,
        image: "https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg"
    },
    {
        name: "Time Walk",
        price: 4999.99,
        image: "https://cards.scryfall.io/large/front/7/0/70901356-3266-4bd9-aacc-f06c27271de5.jpg"
    },
    {
        name: "Lands - Swamp",
        price: 5.99,
        image: "https://cdn11.bigcommerce.com/s-3b5vpig99v/products/550612/images/662203/Swamp252__06271.1642014319.386.513.jpg?c=2"
    },
    {
        name: "Blood Moon",
        price: 149.99,
        image: "https://product-images.tcgplayer.com/fit-in/874x874/218849.jpg"
    },
    {
        name: "Lands - Forest",
        price: 5.99,
        image: "https://i0.wp.com/mtgazone.com/wp-content/uploads/2019/10/thb-254-forest.png?resize=265%2C370&ssl=1"
    },
    {
        name: "Lands - Islands",
        price: 5.99,
        image: "https://mox.land/cdn/shop/products/82e8a9e6-992f-43f8-ba7c-cc4a37dd9a70_670x.jpg?v=1684224224"
    },
    {
        name: "Lands - Mountain",
        price: 5.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRps2jSdtiHwszPsB3B6PUcZJ-pgKcvP1sQlg&s"
    },
    {
        name: "Lands - Plains",
        price: 5.99,
        image: "https://cdn11.bigcommerce.com/s-3b5vpig99v/images/stencil/1280x1280/products/497557/905570/Plains250__82643.1648781036.jpg?c=2"
    },

];

// Função para formatar preço
function formatPrice(price) {
    return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Função para embaralhar array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para criar elemento de card
function createCardElement(product) {
    return `
        <div class="card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <button class="buy-button">${formatPrice(product.price)}</button>
        </div>
    `;
}

// Função para gerar conjunto de produtos aleatórios
function generateRandomProducts() {
    const products = [];
    for (let i = 0; i < 12; i++) { // 2 linhas x 6 colunas = 12 produtos
        const randomProduct = baseProducts[Math.floor(Math.random() * baseProducts.length)];
        products.push({
            ...randomProduct,
            price: randomProduct.price * (0.8 + Math.random() * 0.4) 
        });
    }
    return products;
}

// Função para atualizar o carrossel
function updateCarousel() {
    const wrapper = document.querySelector('.carousel-wrapper');
    const products = generateRandomProducts();
    wrapper.innerHTML = products.map(product => createCardElement(product)).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.carousel-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let isTransitioning = false;

    updateCarousel();

    // Função para animar a transição
    function animateTransition(direction) {
        if (isTransitioning) return;
        isTransitioning = true;

        const newProducts = generateRandomProducts();
        const currentWrapper = wrapper;
        
        // Cria um novo wrapper com os novos produtos
        const newWrapper = document.createElement('div');
        newWrapper.className = 'carousel-wrapper';
        newWrapper.innerHTML = newProducts.map(product => createCardElement(product)).join('');
        
        // Configura posição inicial
        newWrapper.style.position = 'absolute';
        newWrapper.style.top = '0';
        newWrapper.style.left = '0';
        newWrapper.style.width = '100%';
        newWrapper.style.transform = `translateX(${direction === 'next' ? '100%' : '-100%'})`;
        
        // Adiciona o novo wrapper
        currentWrapper.parentNode.appendChild(newWrapper);
        
        // Inicia a animação após um pequeno delay
        requestAnimationFrame(() => {
            currentWrapper.style.transition = 'transform 1.5s ease';
            newWrapper.style.transition = 'transform 1.5s ease';
            
            currentWrapper.style.transform = `translateX(${direction === 'next' ? '-100%' : '100%'})`;
            newWrapper.style.transform = 'translateX(0)';
            
            // Após a animação
            setTimeout(() => {
                currentWrapper.remove();
                newWrapper.style.position = 'relative';
                isTransitioning = false;
            }, 1500);
        });
    }

    // Atualiza o wrapper inicial
    wrapper.style.position = 'relative';
    wrapper.style.transform = 'translateX(0)';

    prevBtn.addEventListener('click', () => animateTransition('prev'));
    nextBtn.addEventListener('click', () => animateTransition('next'));

    // Rotação automática
    setInterval(() => {
        if (!isTransitioning) {
            animateTransition('next');
        }
    }, 12000);
}); 