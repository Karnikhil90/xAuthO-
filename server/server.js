const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 80;

// Serve static files from /public
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Load users from database
const USERS_FILE = path.join(__dirname, '../database/users.json');

function loadUsers() {
  const raw = fs.readFileSync(USERS_FILE);
  return JSON.parse(raw);
}

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    res.json({ success: true, message: 'Login successful', name: user.name });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Get local IP for hosting
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

// Start server
app.listen(PORT, () => {
  const ip = getLocalIP();
  console.log(`🌐 Server running at: http://${ip}:${PORT}`);
});
