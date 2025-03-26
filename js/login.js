const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async(e)=>{
  e.preventDefault();

  const user = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  };

  try {
    const endpoint = 'auth/login';
    const response = await postData(endpoint,user);

      //Save User Info in Local Storage
      localStorage.setItem('token',response.token); //Store JWT token
      localStorage.setItem('userData',JSON.stringify(response.userDto)); //Store user details
      window.location.href = 'index.html';

  } catch (error) {
    console.error('Error during login:', error);
  }

});