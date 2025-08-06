const express = require('express');
const cors = require('cors');
const fs = require('fs');
const os = require('os');
const path = require('path');

const app = express();
const PORT = 80;

// Get local IP for LAN access
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (let iface in interfaces) {
    for (let i of interfaces[iface]) {
      if (i.family === 'IPv4' && !i.internal) {
        return i.address;
      }
    }
  }
  return 'localhost';
}

const HOST = getLocalIP();
const userDBPath = path.join(__dirname, '../database/user.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all requests like Python's http.server
app.use((req, res, next) => {
  const now = new Date();
  console.log(`\n[${now.toISOString()}]`);
  console.log(`${req.method} ${req.url}`);
  if (Object.keys(req.body).length) console.log('Body:', req.body);
  if (Object.keys(req.query).length) console.log('Query:', req.query);
  next();
});

// Serve static frontend
app.use('/', express.static(path.join(__dirname, '../public')));

// Load users from file (every time fresh to ensure sync)
function loadUsers() {
  if (fs.existsSync(userDBPath)) {
    try {
      const raw = fs.readFileSync(userDBPath, 'utf-8');
      return JSON.parse(raw);
    } catch (err) {
      console.error('❌ Error reading user.json:', err.message);
      return [];
    }
  }
  return [];
}

// Save users to file
function saveUsers(users) {
  try {
    fs.writeFileSync(userDBPath, JSON.stringify(users, null, 2), 'utf-8');
    console.log('✅ Updated user.json');
  } catch (err) {
    console.error('❌ Failed to write user.json:', err.message);
  }
}

// POST /api/login
app.post('/api/register', (req, res) => {
  const userData = req.body;
  console.log('[REGISTER]', userData);

  const dbPath = path.join(__dirname, '../database/user.json');
  const users = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath, 'utf8')) : [];

  const exists = users.find(u => u.email === userData.email);
  if (exists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  users.push(userData);
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));

  res.json({ message: 'User registered successfully!' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log('[LOGIN]', { email, password });

  const dbPath = path.join(__dirname, '../database/user.json');
  const users = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath, 'utf8')) : [];

  const found = users.find(u => u.email === email && u.password === password);
  if (!found) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json({ message: 'Login successful!' });
});

// GET /api/users (frontend can read this)
app.get('/api/users', (req, res) => {
  const users = loadUsers();
  res.json(users);
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running at: http://${HOST}:${PORT}/`);
});
