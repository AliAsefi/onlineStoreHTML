let cartItems = [];
let cart =[];
//-----------------------------------------
// change login and logout
const user = localStorage.getItem('token');
const loginSpan = document.querySelector('.login');
const logoutSpan = document.querySelector('.logout');
if(user){
  loginSpan.style.display = 'none';
  logoutSpan.style.display = 'block';
}

//---------------------------------
// Fetch userData from localStorage
async function fetchUserDataWithToken() {
  const token = localStorage.getItem("token");
  const welcome = document.querySelector('.welcome');
  if(token){
    try {
      const endPoint = "users/me";
      const userData = await fetchDataWithToken(endPoint,token);
      welcome.textContent = `Hi ${userData.firstName}`;
      console.log(userData);

      if (userData.cart && userData.cart.cartItemList) {
        totalCartQuantity = userData.cart.cartItemList.length;
        cartItems = userData.cart.cartItemList;
        cart = userData.cart;
      } else {
        totalCartQuantity = 0; // If no cart or items exist
      }
      document.querySelector('.cart-quantity').textContent = totalCartQuantity;

    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  }
}

//---------------------------------
// Fetch Cart Item List
document.addEventListener('DOMContentLoaded', async()=> {
  await fetchUserDataWithToken();
  const token = localStorage.getItem("token");
  const cartItemList = document.querySelector('.cartItemList');
  try {
    cartItemList.innerHTML = ""; // Clear previous items
    if(cartItems.length != 0){
      cartItemList.innerHTML = `
      <div class="totalPriceContainer">
        <div class="totalPriceText">Total Price:</div>
        <div class="totalCartPrice">${(cart.totalCartPrice).toFixed(2)} €</div>
      </div>
    `;
    }
    for(const item of cartItems){
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('itemDiv');

      try {
        const product = await fetchData(`products/${item.productId}`);
          itemDiv.innerHTML = `
          <div class="imageContainer">
            <img class="product-image" src="${product.image}">
          </div>
          <div class="productName">${product.name}</div>
          <div class="calculationcontainer">
            <div class="productQuantity">Quantity: <span>${item.quantity}</span></div>
            <div class="pricePerUnit">Price: <span>${item.pricePerUnit}</span></div>
            <div class="discountPercentage">Discount: <span>%${item.discountPercentage}</span></div>
            <div class="totalPrice">Total Price: <span>${(item.totalPrice).toFixed(2)} €</span></div>
          </div>

          <div class="deleteCartItem">
            <button class="deleteCartItemBtn"
            data-item-id="${item.id}">Delete Item</button>
          </div>
        `;

      } catch (error) {
        console.error("Error fetching product data:", error);
      }
        cartItemList.appendChild(itemDiv);
      }
  } catch (error) {
    console.error('Error fetching cartItemList:', error);
  }
})

document.addEventListener('click',(event)=>{
    const itemId = event.target.dataset.itemId;
    const endPoint = `cartItems/${itemId}`;
    const token = localStorage.getItem("token");
    deleteCartItem(endPoint,token);
    window.location.reload();
})

async function deleteCartItem(endPoint,token) {
  try {
    await deleteDataWithToken(endPoint,token);
    console.log(endPoint)
    fetchUserDataWithToken();
  } catch (error) {
    console.error("Error deleting cartItem:", error);
  }
}