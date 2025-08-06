function renderSignInForm() {
  return `
    <h2>Welcome Back</h2>
    <form id="login-form">
      <label>Email</label>
      <input type="email" name="email" required autocomplete="off" />
      <label>Password</label>
      <input type="password" name="password" required autocomplete="new-password" />
      <button type="submit">Sign In</button>
    </form>
  `;
}

function renderSignUpForm() {
  return `
    <h2>Create Account</h2>
    <form id="register-form">
      <label>Name</label>
      <input type="text" name="name" required autocomplete="off" />
      <label>Age</label>
      <input type="number" name="age" required autocomplete="off" />
      <label>Email</label>
      <input type="email" name="email" required autocomplete="off" />
      <label>Password</label>
      <input type="password" name="password" required autocomplete="new-password" />
      <button type="submit">Sign Up</button>
    </form>
  `;
}

// Simulated backend authentication using localStorage
function fakeAuth({ email, password }) {
  const savedUser = JSON.parse(localStorage.getItem('user'));
  return savedUser && savedUser.email === email && savedUser.password === password;
}

// Handle login form submission
function handleLoginForm() {
  const form = document.getElementById('login-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (fakeAuth({ email, password })) {
      alert('Login Success! Redirecting...');
      window.location.href = '/welcome/index.html'; // 🔁 Redirect
    } else {
      alert('Invalid credentials or user not registered.');
    }
  });
}

// Handle registration form submission
function handleRegisterForm() {
  const form = document.getElementById('register-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const age = form.age.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    const newUser = { name, age, email, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    alert('Account created. You can now sign in!');
    navigate('signin');
  });
}

// UI navigation between Sign In and Sign Up
function navigate(view) {
  const authForm = document.getElementById('auth_form');
  const btnSignIn = document.getElementById('btn-signin');
  const btnSignUp = document.getElementById('btn-signup');

  if (view === 'signin') {
    authForm.innerHTML = renderSignInForm();
    btnSignIn.classList.add('active');
    btnSignUp.classList.remove('active');
    handleLoginForm(); // Login event binding
  } else {
    authForm.innerHTML = renderSignUpForm();
    btnSignUp.classList.add('active');
    btnSignIn.classList.remove('active');
    handleRegisterForm(); // Register event binding
  }
}

// 🚀 Auto-login if user already exists
const existingUser = JSON.parse(localStorage.getItem('user'));
if (existingUser && existingUser.email && existingUser.password) {
  console.log('Auto-login with saved credentials');
  window.location.href = '/welcome.html';
} else {
  navigate('signin');
}
