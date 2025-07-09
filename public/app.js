let cart = [];
let total = 0;

function addToCart(itemName, price) {
  cart.push({ name: itemName, price });
  total += price;
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('total');
  cartList.innerHTML = '';

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} – ৳${item.price}`;
    cartList.appendChild(li);
  });

  totalDisplay.textContent = total;
  localStorage.setItem('cartData', JSON.stringify(cart));
  localStorage.setItem('cartTotal', total);
}

// Load cart from storage if user goes to checkout
window.onload = function () {
  if (localStorage.getItem('cartData')) {
    cart = JSON.parse(localStorage.getItem('cartData'));
    total = parseInt(localStorage.getItem('cartTotal'), 10);
    if (document.getElementById('cart-items')) {
      updateCart();
    }
  }
};
