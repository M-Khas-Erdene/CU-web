
import BasketItem from './BasketItem.js';
let totalPrice = 0;
document.addEventListener('DOMContentLoaded',async function () {
  let basketContainer;
  let productsData;
  let productId;
  basketContainer=document.getElementById('basketItems');
  try {
    const response = await fetch('http://localhost:5000/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Products retrieved successfully.');
      productsData = await response.json();
      displayProducts(productsData);
    } else {
      console.error('Failed to retrieve products. HTTP status:', response.status);
    }
  } catch (error) {
    console.error('Error retrieving products:', error);
  }
  productsData.forEach(itemData => {
    basketContainer.innerHTML += new BasketItem(...Object.values(itemData)).generateBasketItems();
    
    calculateAndDisplayTotalPrice();
  });
  document.addEventListener('click', async function(event){
    if (event.target.classList.contains('removeItem')) {
      const basketItem = event.target.closest('.basketItem');
      const productID = parseInt(event.target.dataset.productid) || 0;

      if (basketItem) {
        
        basketItem.remove();
        try {

          const response = await fetch(`http://localhost:5000/products/${productID}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productId),
          });
  
          if (response.ok) {
            console.log('Product deleted to the database successfully.');
          } else {
            console.error('Failed to delete product to the database. HTTP status:', response.status);
          }
        } catch (error) {
          console.error('Error delete product database:', error);
        }
        calculateAndDisplayTotalPrice();
      }
    }
  })
});


function displayProducts(productsData) {
  const subbodyContainer = document.querySelector('.subbody');
  totalPrice = 0;

  productsData.forEach(itemData => {
    const productHTML = createProductHTML(itemData);
    subbodyContainer.innerHTML += productHTML;
    const numericPrice = parseInt(itemData.price);
    const count=itemData.count;
    totalPrice += numericPrice*count;
  });
  calculateTotalPrice();
}

function createProductHTML(itemData) {
  return `
    <div class="rowflex">
        <p><span>${itemData.name}</span></p>
        <p><span>${itemData.count}</span><span> x </span>${itemData.price}</p>
    </div>
  `;
}
function calculateTotalPrice() {
    const totalPriceElement = document.querySelector('.niit');
      totalPriceElement.textContent = totalPrice;
  }