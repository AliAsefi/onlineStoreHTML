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

    cartItemList.innerHTML = `
    <div class="paymentContainer" style="display: none">
      <div class="totalPriceContainer">
        <div class="totalPriceText">Total Price:</div>
        <div class="totalCartPrice"></div>
      </div>
      <div paymentBtnContainer>
        <button class="paymentBtn">Proceed to Payment</button>
      </div>
    </div>
  `;

    for(const item of cartItems){
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('itemDiv');

      try {
        const product = await fetchData(`products/${item.productId}`);
          itemDiv.innerHTML = `
          <div class="checkboxContainer">
            <input type="checkbox" class="checkbox" data-item-id="${item.id}"
            data-item-price="${item.totalPrice}">
          </div>
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

//---------------------------------------------------
// delete cart item 
document.addEventListener('click',(event)=>{
  if (event.target.classList.contains("deleteCartItemBtn")){
    const itemId = event.target.dataset.itemId;
    const endPoint = `cartItems/${itemId}`;
    const token = localStorage.getItem("token");
    deleteCartItem(endPoint,token);
    window.location.reload();
  }
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

//---------------------------------------------------
// payment for selected cart item 
document.addEventListener('change',(e)=>{

  // Exit if cart is empty
  if(!cartItems.length) return; 

  const paymentContainer = document.querySelector('.paymentContainer');
  const checkboxes = document.querySelectorAll('.checkbox');
  const totalCartPriceElement = document.querySelector(".totalCartPrice");

  let totalPaymentPrice = 0;

  checkboxes.forEach(checkbox =>{
    if(checkbox.checked){
      totalPaymentPrice += parseFloat(checkbox.dataset.itemPrice);
    }
  })
  // Show or hide the paymentContainer based on selection
  paymentContainer.style.display = totalPaymentPrice>0 ? 'block' : 'none';
  
  totalCartPriceElement.textContent = `${totalPaymentPrice.toFixed(2)} €`;
})