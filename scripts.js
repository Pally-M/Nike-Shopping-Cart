// Selectors 
const cartContainer = document.querySelector('.cart-container');
const sideCart = document.querySelector('.side-cart');
const cartItem = document.querySelector('.cartItem');
const total = document.querySelector('#total');
const itemsDisplay = document.querySelector('.item-display');
const items = document.querySelectorAll('.items');

// Cart array
let cart = [];

// Functions
function updateCart() {
  const cartQuantity = cart.length;
  itemsDisplay.textContent = 'Items: ${cartQuantity}';
  if (cartQuantity > 0) {
    sideCart.classList.add('active');
  } else {
    sideCart.classList.remove('active');
  }
}

function addItemsToCart(item) {
  cart.push(item);
  updateCart();
  updateTotal();
}

function removeItemsFromCart(item) {
  const index = cart.indexOf(item);
  if (index > -1) {
    cart.splice(index, 1);
  }
  updateCart();
  updateTotal();
}

function updateTotal() {
  const totalCost = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  total.textContent = 'R ${totalCost.toFixed(2)}';
}

// Event listeners
items.forEach((item) => {
  const addButton = item.querySelector('.add-to-cart');
  const deleteButton = item.querySelector('.delete-button');
  const inputQuantity = item.querySelector('.input-quantity');
  const inputCost = item.querySelector('.input-cost');
  const price = perseFloat(item.querySelector('[data-price]').dataset.price);

  addButton.addEventListener('click', () => {
    const quantity = parseInt(inputQuantity.value);
    addItemsToCart({ name: item.querySelector('.item-name').textContent, price, quantity});
  });

  deleteButton.addEventListener('click', () => {
    removeItemsFromCart(items);
  });

  inputQuantity.addEventListener('input', () => {
    const quantity = parseInt(inputQuantity.value);
    inputCost.textContent = 'R ${(price * quantity).toFixed(2)}';
  });
});

updateCart();