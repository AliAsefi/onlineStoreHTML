const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async(e)=>{
  e.preventDefault();

  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return; // Stop submission
  }

  const newUser = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    username: document.getElementById('username').value,
    password: password,
    birthDate: document.getElementById('birthDate').value,
    email: document.getElementById('email').value,
    gender: document.getElementById('gender').value,
    phone: document.getElementById('phone').value,

    addressList: [{
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      country: document.getElementById('country').value,
      postalCode: document.getElementById('postalCode').value
    }]
  };

  try {
    const endpoint = 'auth/register';
    await postData(endpoint,newUser);
    window.location.href = "index.html"; // Redirect to product page
  } catch (error) {
    console.error('Error during registration:', error);
  }

})