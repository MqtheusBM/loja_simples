// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', function () {

    // Seleciona o elemento do modal
    var productModal = document.getElementById('productModal');
  
    // Adiciona um ouvinte de evento que é acionado quando o modal está prestes a ser exibido
    productModal.addEventListener('show.bs.modal', function (event) {
      // Identifica o botão que acionou o modal
      var button = event.relatedTarget;
  
      // Extrai os dados do produto dos atributos 'data-*' do botão
      var productName = button.getAttribute('data-product-name');
      var productDescription = button.getAttribute('data-product-description');
      var productPrice = button.getAttribute('data-product-price');
      var productImage = button.getAttribute('data-product-image');
  
      // Encontra os elementos dentro do modal onde as informações serão exibidas
      var modalTitle = productModal.querySelector('.modal-title');
      var modalImage = productModal.querySelector('#modalProductImage');
      var modalDescription = productModal.querySelector('#modalProductDescription');
      var modalPrice = productModal.querySelector('#modalProductPrice');
  
      // Atualiza o conteúdo do modal com as informações do produto extraídas
      modalTitle.textContent = productName;
      modalImage.src = productImage;
      modalImage.alt = "[Imagem de " + productName + "]"; // Atualiza o texto alternativo da imagem
      modalDescription.textContent = productDescription;
      modalPrice.textContent = productPrice;
    });
  });
