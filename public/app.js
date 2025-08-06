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

// Handle login form submission
function handleLoginForm() {
  const form = document.getElementById('login-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await res.json();
      alert(result.message);

      if (res.ok) {
        // ✅ Save user to localStorage
        localStorage.setItem('auth_user', JSON.stringify(result.user || { email }));

        // ✅ Redirect to welcome page
        window.location.href = '/welcome';
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed.');
    }
  });
}

// Handle registration form submission
function handleRegisterForm() {
  const form = document.getElementById('register-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const age = form.age.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    const newUser = { name, age, email, password };

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      const result = await res.json();
      alert(result.message);
      if (res.ok) navigate('signin');
    } catch (err) {
      console.error('Register error:', err);
      alert('Failed to register.');
    }
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
const existingUser = JSON.parse(localStorage.getItem('auth_user'));

if (existingUser && existingUser.email) {
  console.log('Auto-login with saved credentials');

  // Add delay (e.g. 2000 ms = 2 seconds)
  alert("Auto-login with saved credentials")
  setTimeout(() => {
    
    window.location.href = '/welcome';

  }, 2000);

} else {
  navigate('signin');
}
