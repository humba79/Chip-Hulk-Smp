// app.js

// কার্ট আইটেম গুলো লোকালস্টোরেজে রাখা হবে
let cart = JSON.parse(localStorage.getItem('cartData')) || [];

const cartItemsUl = document.getElementById('cart-items');
const totalSpan = document.getElementById('total');

function renderCart() {
  cartItemsUl.innerHTML = '';

  if(cart.length === 0) {
    cartItemsUl.innerHTML = '<li>Your cart is empty.</li>';
    totalSpan.textContent = '0';
    return;
  }

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ৳${item.price}`;
    
    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.style.marginLeft = '10px';
    removeBtn.style.backgroundColor = '#ff5555';
    removeBtn.style.color = '#fff';
    removeBtn.style.border = 'none';
    removeBtn.style.borderRadius = '4px';
    removeBtn.style.padding = '2px 6px';
    removeBtn.style.cursor = 'pointer';
    
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    };

    li.appendChild(removeBtn);
    cartItemsUl.appendChild(li);
  });

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  totalSpan.textContent = totalPrice;
}

function addToCart(name, price) {
  cart.push({name, price});
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem('cartData', JSON.stringify(cart));
}

// Initialize cart display on page load
renderCart();

// এই ফাংশনগুলোকে আপনার HTML এর বাটনগুলোর onclick-এ ব্যবহার করবেন
window.addToCart = addToCart;
