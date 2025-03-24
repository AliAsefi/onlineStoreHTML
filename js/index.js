let totalCartQuantity = 0;

// Fetch products from the backend API
document.addEventListener('DOMContentLoaded', async()=> { 
    
    const productContainer = document.getElementById('products-grid');

  try {
    const products = await fetchData("products");

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
          <div class="product-image-container">
            <img class="product-image" src="${product.image}">
          </div>
          <div class="product-name">
            <h3>${product.name}</h3>
          </div>
          <div class="product-description">
            <button class="descriptionBtn" onclick="toggleDescription(this)">Show Description</button>
            <p class="description" style="display: none">${product.description}</p>
          </div>
          <div class="product-price">
            <p>Price: $${product.price}</p>
          </div>
          <div class="product-discountPercentage">
            <p>Discount: %${product.discountPercentage}</p>
          </div>
          <div class="product-quantity-container">
            Quantity: <select class="quantity-select">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="addToCart">
            <button class="addToCartBtn jsAddToCartBtn" 
            data-product-id="${product.id}">
            Add to cart
            </button>
          </div>
        `;

        productContainer.appendChild(productDiv);

        /*
          ------------------------------------------
          update cart quantity:
          1.Listen to all "Add to Cart" buttons' clicks.
          2.Get the selected quantity for that product.
          3.Keep track of total items added to the cart.
          4.Update .cart-quantity div.
        */
        const addToCartBtn = productDiv.querySelector('.addToCartBtn');
        const quantitySelect = productDiv.querySelector('.quantity-select');

        addToCartBtn.addEventListener('click',()=>{
          const quantity = parseInt(quantitySelect.value);
          addToCartBtn.textContent='Added';
          totalCartQuantity += quantity;

          const cartQuantity = document.querySelector('.cart-quantity');
          cartQuantity.textContent = totalCartQuantity;
        })
    });

  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

function toggleDescription(button){
  const description = button.nextElementSibling;

  if(description.style.display == 'none'){
    description.style.display = "block";
    button.textContent = "Hide Description"; 
  }else{
    description.style.display = "none";
    button.textContent = "Show Description"; 
  }
}