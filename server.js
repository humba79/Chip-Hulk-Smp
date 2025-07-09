const express = require('express');
const path = require('path');
const app = express();

// ===== Settings =====
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ===== Middleware =====
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// ===== Admin Auth Middleware =====
function adminAuth(req, res, next) {
  const auth = { login: 'admin', password: 'admin123' };

  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  if (login === auth.login && password === auth.password) {
    return next();
  }

  res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
  res.status(401).send('Authentication required.');
}

// ===== Routes =====
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'payment.html'));
});

app.get('/admin', adminAuth, (req, res) => {
  res.render('admin'); // Renders views/admin.ejs
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
