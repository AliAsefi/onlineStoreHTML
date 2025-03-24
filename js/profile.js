const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async(e)=>{
  e.preventDefault();

  const user = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  };

  try {
    const endpoint = 'auth/login';
    await postData(endpoint,user);
    window.location.href = 'index.html'; // Redirect to product page
  } catch (error) {
    console.error('Error during login:', error);
  }

})