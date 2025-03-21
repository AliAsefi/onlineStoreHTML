// Fetch products from the backend API
document.addEventListener('DOMContentLoaded', async()=> { 
    
    const productContainer = document.getElementById('product-container');

  try {
    const products = await fetchData("products");

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
        `;
        productContainer.appendChild(productDiv);
    });

  } catch (error) {
    console.error('Error fetching products:', error);
  }
});