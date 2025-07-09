const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory storage of orders (reset on server restart)
const orders = [];

// Endpoint to receive orders
app.post('/orders', (req, res) => {
  const order = req.body;
  if (!order.username || !order.method || !order.txn || !order.email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  order.id = orders.length + 1;
  order.date = new Date().toISOString();
  orders.push(order);
  res.status(201).json({ message: 'Order saved', id: order.id });
});

// Endpoint to get all orders (for admin panel)
app.get('/admin/orders', (req, res) => {
  res.json(orders);
});

// Serve static files (for admin panel frontend)
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
