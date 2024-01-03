import Product from './Product.js'; // Assuming Product.js is in the same directory as home.js
import  {openPopup,ClosePopup,findProductByMore,isPriceInRange,findNum} from './utils.js';
import BasketItem from './BasketItem.js';
import {updateURL,productURL,searchURL,getURLSearchParameters,getURLParameters} from './URL.js';
import { calculateAndDisplayTotalPrice } from './totalPrice.js';
// import {searchProductsHome,searchProducts} from './filter.js';
document.addEventListener('DOMContentLoaded', async function () {
  let basketContainer;
  let productId; 
  let Data;
  let quantity;
  try {
    //json dataga avj bn
    const [promotionData, productData] = await Promise.all([
      fetch('data.json').then(response => response.json()),
      fetch('data.json').then(response => response.json())
    ]);
    // buteegdehuun sagslah container aa olj avj bn
    basketContainer = document.getElementById('basketItems');

    // serverees sagslah baraanii medeellig avj bn
    try {
      const response = await fetch('http://localhost:5000/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      
      if (response.ok) {
        console.log('Products retrieved successfully.');
        Data = await response.json();
      } else {
        console.error('Failed to retrieve products. HTTP status:', response.status);
      }
    } catch (error) {
      console.error('Error retrieving products:', error);
    }
    // serveres avsn datag sagsand hiine
    Data.forEach(itemData => {
      basketContainer.innerHTML += new BasketItem(...Object.values(itemData)).generateBasketItems();
      
      calculateAndDisplayTotalPrice();
      findNum();
    });
    
    // uramshuulaltai baraa buteegdehuunig render hiij bn
    const promotionProductsContainer=document.getElementById('promotionProducts');
    promotionProductsContainer.innerHTML = promotionData.promotionData.map(productInfo => {
      const product = new Product(...Object.values(productInfo));
      return product.generateHTML();
    }).join('');

    // engiin baraa buteegdehuunig render hiij bn
    const normalProductsContainer = document.getElementById('normalProducts');
    normalProductsContainer.innerHTML = productData.productData.map(productInfo => {
      const product = new Product(...Object.values(productInfo));
      return product.generateHTML();
    }).join('');

    //buteegdehuunuud dr hiij bi uildluudin negdsn eventlistener
    document.addEventListener('click', async function (event) {
      // baraanii popup medeelel
      if (event.target.classList.contains('popup-button')) {
        const productId = event.target.id;
        openPopup(productId);
        productURL(productId);
      }
      // poup haah
      if (event.target.classList.contains('close-popup')) {
        ClosePopup();
        productURL('');
      }
      // sagslah, sagsalj bui baraa bolon tuunii toog serverluu post lono.
      if (event.target.classList.contains('b')) {
        productId = findProductByMore(event.target.dataset.element, promotionData.promotionData.concat(productData.productData));
        const moreValue = event.target.dataset.element;
        const countElement = document.querySelector(`[data-count="${productId.pID}"]`);
        quantity = countElement ? parseInt(countElement.textContent) : 0;
        console.log('quantity:',quantity);
          const newAttributes = {
            count: quantity
          };
          
          const clonedProduct = Object.assign({}, productId, newAttributes);
        if (productId) {
          basketContainer.innerHTML += new BasketItem(...Object.values(clonedProduct)).generateBasketItems();
          setCounter(moreValue);
          alert('Бүтээгдэхүүн амжилттай сагсанд нэмлээ!');
          calculateAndDisplayTotalPrice();
          findNum();
          
          try {
            const response = await fetch('http://localhost:5000/products', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(clonedProduct),
            });
    
            if (response.ok) {
              console.log('Product added to the database successfully.');
            } else {
              console.error('Failed to add product to the database. HTTP status:', response.status);
            }
          } catch (error) {
            console.error('Error adding product to the database:', error);
          }

        }
      }
      // sagsnaas ustgaj bui baraag server bolon basketcontainer-s ustgana.
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
          findNum();
        }
      }
      // baraani counter 
      if (event.target.tagName === 'BUTTON' && event.target.dataset.count) {
        const action = event.target.dataset.count === 'increment' ? 'increment' : 'decrement';
        const moreValue = event.target.parentElement.parentElement.querySelector('.b').dataset.element;
        updateCounter(action, moreValue);
      }
    });
   
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
