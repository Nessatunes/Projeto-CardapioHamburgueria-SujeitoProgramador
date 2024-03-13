const menu = document.getElementById('menu') // menu
const cartBtn = document.getElementById('cart-btn') //botao do carrinho
const cartModal = document.getElementById('cart-modal') //div do modal
const cartItemsContainer = document.getElementById('cart-items') // itens dento do carinho
const cartTotal = document.getElementById('cart-total') // total do carrinho
const checkoutBtn = document.getElementById('checkout-btn') // finalizar o carrinho
const closeModalBtn = document.getElementById('close-modal-btn') // botao fechar
const cartCounter = document.getElementById('cart-count') // quantidade dos itens no carrinho
const addressInput = document.getElementById('address') // campo do endereço
const addressWarn = document.getElementById('address-warn') // campo peindo o endereço

let cart = []; /* array do carrinho começa vazio*/

// Abrir o modal do carrinho
cartBtn.addEventListener('click', function(){
    cartModal.style.display = 'flex' /* esta função mostra o carrinho*/
})

// Fechar o modal
cartModal.addEventListener('click', function(event){
 if (event.target === cartModal) {
    cartModal.style.display = 'none'
 }  
})
//botao de fechar dentro do modal
closeModalBtn.addEventListener('click', function(){
    cartModal.style.display = 'none'
})
// botao icone do carrinho
menu.addEventListener('click', function(event){
  let parentButton = event.target.closest('.add-to-cart-btn')
  if (parentButton){
    const name = parentButton.getAttribute('data-name')
    const price = parseFloat(parentButton.getAttribute('data-price')) /* parseFloaat é para converter em numero*/
    // Adicional no carrinho
    addtoCart(name, price)
    
  }
})

/* Função para add no carrinho*/
function addtoCart(name, price){
    const existingItem = cart.find(item => item.name === name)
    if(existingItem){
        //se o item já existe aumenta a quantidade, o find verifica
        existingItem.quantity += 1;
    } else{
      cart.push({
        name,
        price,
        quantity: 1,  
      })
    } 
    updateCartModal()  
    
}
// atualiza carrinho
function updateCartModal(){
cartItemsContainer.innerHTML = '';
let total = 0;

cart.forEach(item => {
  const cartItemElement = document.createElement('div');

  cartItemElement.innerHTML = `
  <div>
  <div>
  <p>${item.name}</p>
  <p>${item.quantity}</p>
  <p> R$ ${item.price}</p>
  </div>
  <div>
  <button>
  Remover
  </button>
  </div>

  </div>

  `
  cartItemsContainer.appendChild(cartItemElement)

})

}

