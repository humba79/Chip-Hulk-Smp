const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const Order = mongoose.model('Order', {
  username: String,
  items: Array,
  method: String,
  txn: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});

app.post('/orders', async (req, res) => {
  const { username, method, txn, email, cart } = req.body;
  const newOrder = new Order({ username, method, txn, email, items: cart });
  await newOrder.save();
  res.send("✅ Order received!");
});

app.get('/admin/orders', async (req, res) => {
  const adminPass = req.query.pass;
  if (adminPass !== process.env.ADMIN_PASS) {
    return res.status(403).send("Unauthorized");
  }
  const orders = await Order.find().sort({ createdAt: -1 });
  res.render('admin', { orders });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
