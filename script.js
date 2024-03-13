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
    updateCartModal();
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
  cartItemElement.classList.add('flex','justify-between', 'mb-4', 'flex-col')

  cartItemElement.innerHTML = `
   <div class='flex items-center justify-between'>
  <div>
  <p class='font-bold'>${item.name}</p>
  <p>Quant:${item.quantity}</p>
  <p class='font-medium mt-2'> R$ ${item.price.toFixed(2)}</p>
  </div>  
  <button class='remove-from-cart-btn' data-name='${item.name}'>Remover</button>
  </div> `
  total += item.price * item.quantity;

  cartItemsContainer.appendChild(cartItemElement)
})

cartTotal.textContent = total.toLocaleString('pt-BR',{
style:'currency',
currency: 'BRL'
});

cartCounter.innerHTML = cart.length;

}
// Função remover item do carrinho
cartItemsContainer.addEventListener('click', function(event){
  if (event.target.classList.contains('remove-from-cart-btn')){
    const name = event.target.getAttribute('data-name')

    removeItemCart(name);
  }
})
function removeItemCart(name){
  const index = cart.findIndex(item => item.name === name);

  if (index !== -1){
    const item = cart[index];

    if (item.quantity > 1){
      item.quantity -= 1;
      updateCartModal();
      return;
    }
    cart.splice(index, 1);
    updateCartModal();
  }
}

// campo do endereço
addressInput.addEventListener('input', function(event){
let inputValue = event.target.value;
if (inputValue !== ''){
  addressInput.classList.remove('border-red-500')
  addressWarn.classList.add('hidden')
}

})//Finalizar o pedido
checkoutBtn.addEventListener('click', function(){
const isOpen = checkRestaurantOpen();
if (!isOpen){
  alert('RESTAURANTE FECHADO NO MOMENTO!')
  return;
}
  if (cart.length === 0) return;
  if (addressInput.value === ''){
    addressWarn.classList.remove('hidden')
    addressInput.classList.add('border-red-500')
    return;
  }

  // Enviar o pedido para o whatsapp
  const cartItems = cart.map((item)=> {
  return (
  `${item.name} Quantidade: (${item.quantity}) Preço: R$ ${item.price} | `
)
  }).join('')

  const message = encodeURIComponent(cartItems)
  const phone = '46999290989'

  window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, '_blank')

  cart = []; // limpando o carrinho
  updateCartModal();
})


// verificar a hora abertura e fechamento do restaurante
function checkRestaurantOpen(){
  const data = new Date();
  const hora = data.getHours();
  return hora >= 18 && hora < 22; // true - aberto
}
const spanItem = document.getElementById('date-span')
const isOpen = checkRestaurantOpen(); // verifica horario restaurante

if (isOpen){
  spanItem.classList.remove('bg-red-500'); // fechado
  spanItem.classList.add('bg-green-600') // aberto
}else{
  spanItem.classList.remove('bg-green-600') // aberto
  spanItem.classList.add('bg-red-500') // fechado
}


