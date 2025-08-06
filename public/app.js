function renderSignInForm() {
  return `
    <h2>Welcome Back</h2>
    <form id="login-form">
      <label>Email</label>
      <input type="email" required autocomplete="off" />
      <label>Password</label>
      <input type="password" required autocomplete="new-password" />
      <button type="submit">Sign In</button>
    </form>
  `;
}

function renderSignUpForm() {
  return `
    <h2>Create Account</h2>
    <form id="register-form">
      <label>Email</label>
      <input type="email" required autocomplete="off" />
      <label>Phone</label>
      <input type="tel" required autocomplete="off" />
      <label>Password</label>
      <input type="password" required autocomplete="new-password" />
      <button type="submit">Sign Up</button>
    </form>
  `;
}

function navigate(view) {
  const authForm = document.getElementById('auth_form');
  const btnSignIn = document.getElementById('btn-signin');
  const btnSignUp = document.getElementById('btn-signup');

  if (view === 'signin') {
    authForm.innerHTML = renderSignInForm();
    btnSignIn.classList.add('active');
    btnSignUp.classList.remove('active');
  } else {
    authForm.innerHTML = renderSignUpForm();
    btnSignUp.classList.add('active');
    btnSignIn.classList.remove('active');
  }
}

// Default load
navigate('signin');
