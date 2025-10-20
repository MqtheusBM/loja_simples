// Aguarda o DOM carregar
document.addEventListener('DOMContentLoaded', () => {

    // Tenta carregar o carrinho do localStorage ou inicia um array vazio
    let cart = JSON.parse(localStorage.getItem('pigzCart')) || [];

    // Seleciona os elementos principais
    const productModal = document.getElementById('productModal');
    const btnAdicionarCarrinho = document.getElementById('btnAdicionarCarrinho');
    const cartContainer = document.getElementById('itensCarrinho');
    const cartCounter = document.getElementById('contadorCarrinho');
    const cartSubtotal = document.getElementById('subtotalCarrinho');
    const cartEmptyMsg = document.getElementById('carrinhoVazio');

    // Função principal para atualizar a UI do carrinho
    function updateCartUI() {
        // Limpa o contêiner do carrinho
        cartContainer.innerHTML = '';
        
        let subtotal = 0;

        if (cart.length === 0) {
            cartEmptyMsg.style.display = 'block';
        } else {
            cartEmptyMsg.style.display = 'none';
            
            cart.forEach((item, index) => {
                // Cria o HTML para cada item do carrinho
                const itemHTML = `
                    <div class="cart-item mb-3">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-info">
                            <h6 class="cart-item-title">${item.name}</h6>
                            <span class="cart-item-price">${item.price}</span>
                        </div>
                        <button class="btn btn-sm btn-outline-danger btn-remover-item" data-index="${index}">&times;</button>
                    </div>
                `;
                cartContainer.innerHTML += itemHTML;
                
                // Calcula o subtotal (removendo "R$ " e trocando "," por ".")
                subtotal += parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
            });
        }

        // Atualiza os totais
        cartCounter.textContent = cart.length;
        cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        
        // Salva o carrinho no localStorage
        saveCart();
    }

    // Função para salvar o carrinho no localStorage
    function saveCart() {
        localStorage.setItem('pigzCart', JSON.stringify(cart));
    }

    // Função para adicionar um item ao carrinho
    function addToCart() {
        // Pega as informações de dentro do modal que está aberto
        const name = document.getElementById('productModalLabel').textContent;
        const price = document.getElementById('modalProductPrice').textContent;
        const image = document.getElementById('modalProductImage').src;

        // Cria o objeto do produto
        const product = {
            id: Date.now(), // ID simples baseado no timestamp
            name,
            price,
            image
        };

        // Adiciona ao array do carrinho
        cart.push(product);
        
        // Atualiza a UI
        updateCartUI();

        // Fecha o modal do produto
        const modalInstance = bootstrap.Modal.getInstance(productModal);
        modalInstance.hide();
        
        // Abre o offcanvas do carrinho para mostrar o item adicionado
        const offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('offcanvasCarrinho'));
        offcanvasInstance.show();
    }

    // Função para remover um item do carrinho
    function removeFromCart(event) {
        // Verifica se o clique foi no botão de remover
        if (event.target.classList.contains('btn-remover-item')) {
            // Pega o índice do item a ser removido (armazenado no data-index)
            const itemIndex = parseInt(event.target.getAttribute('data-index'));
            
            // Remove o item do array
            cart.splice(itemIndex, 1);
            
            // Atualiza a UI
            updateCartUI();
        }
    }

    // --- ADICIONA OS OUVINTES DE EVENTOS ---

    // Ouvinte para o botão "Adicionar ao Carrinho" (dentro do modal)
    // Verifica se o botão existe (ele só existe nas páginas de produtos)
    if (btnAdicionarCarrinho) {
        btnAdicionarCarrinho.addEventListener('click', addToCart);
    }
    
    // Ouvinte para os botões "Remover" (dentro do carrinho)
    // Usamos delegação de evento no contêiner
    cartContainer.addEventListener('click', removeFromCart);

    // Atualiza a UI assim que a página carregar (para mostrar itens já salvos)
    updateCartUI();
});
