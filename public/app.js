<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8" />
  <title>Cart with Payment Options</title>
  <style>
    #cart-items li {
      margin-bottom: 8px;
    }
    .payment-number {
      background: #f3f3f3;
      padding: 8px 12px;
      margin: 6px 0;
      border-radius: 5px;
      font-weight: bold;
    }
    .add-btn {
      background-color: #28a745;
      color: white;
      border: none;
      padding: 6px 12px;
      cursor: pointer;
      border-radius: 4px;
      margin-left: 10px;
    }
  </style>
</head>
<body>
  <h2>কার্ট আইটেমস</h2>
  <ul id="cart-items"></ul>
  <p>মোট দাম: ৳<span id="total">0</span></p>

  <h2>পেমেন্ট নম্বর (যেকোনো একটি ব্যবহার করুন)</h2>
  <div id="payment-options">
    <div class="payment-number">বাংলাদেশ ব্যাংক UPI: 017XXXXXXXX</div>
    <div class="payment-number">bKash: 018XXXXXXXX</div>
    <div class="payment-number">Rocket: 019XXXXXXXX</div>
    <div class="payment-number">Nagad: 016XXXXXXXX</div>
  </div>

  <h2>পণ্য যোগ করুন</h2>
  <button class="add-btn" onclick="addToCart('Minecraft Sword', 150)">Minecraft Sword - ৳150</button>
  <button class="add-btn" onclick="addToCart('Minecraft Pickaxe', 200)">Minecraft Pickaxe - ৳200</button>
  <button class="add-btn" onclick="addToCart('Minecraft Armor', 350)">Minecraft Armor - ৳350</button>

  <script>
    // কার্ট আইটেম গুলো লোকালস্টোরেজে রাখা হবে
    let cart = JSON.parse(localStorage.getItem('cartData')) || [];

    const cartItemsUl = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total');

    function renderCart() {
      cartItemsUl.innerHTML = '';

      if(cart.length === 0) {
        cartItemsUl.innerHTML = '<li>আপনার কার্ট খালি।</li>';
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

    // Make addToCart globally accessible for inline onclick
    window.addToCart = addToCart;
  </script>
</body>
</html>
