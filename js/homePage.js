import Product from './Product.js'; // Assuming Product.js is in the same directory as home.js
import {openPopup,ClosePopup,findProductByMore,plusSlides,isPriceInRange} from './utils.js';
import BasketItem from './BasketItem.js';
import {updateURL,productURL,searchURL,getURLSearchParameters,getURLParameters} from './URL.js';
import { calculateAndDisplayTotalPrice } from './totalPrice.js';


document.addEventListener('DOMContentLoaded', async function () {
  
  try {
    const [promotionData, productData] = await Promise.all([
      fetch('data.json').then(response => response.json()),
      fetch('data.json').then(response => response.json())
    ]);

    const basketContainer = document.getElementById('basketItems');
    const promotionProductsContainer = document.getElementById('promotionProducts');
    promotionProductsContainer.innerHTML = promotionData.promotionData.map(productInfo => {
      const product = new Product(...Object.values(productInfo));
      return product.generateHTML();
    }).join('');

    const normalProductsContainer = document.getElementById('normalProducts');
    normalProductsContainer.innerHTML = productData.productData.map(productInfo => {
      const product = new Product(...Object.values(productInfo));
      return product.generateHTML();
    }).join('');

    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('popup-button')) {
        const productId = event.target.id;
        openPopup(productId);
        productURL(productId);
      }
    });

    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('close-popup')) {
        ClosePopup();
        productURL('');
      }
    });
    

    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('b')) {
        const productId = findProductByMore(event.target.dataset.element, promotionData.promotionData.concat(productData.productData));
        const moreValue=event.target.dataset.element;
        // Now you have the product with the specified 'More' attribute
        if (productId) {
          // Do something with the product
          basketContainer.innerHTML += new BasketItem(...Object.values(productId)).generateBasketItems();
          setCounter(moreValue);
          alert('Бүтээгдэхүүн амжилттай сагсанд нэмлээ!');
          calculateAndDisplayTotalPrice();
        }

      }
      if(event.target.classList.contains('removeItem')) {
        const basketItem = event.target.closest('.basketItem');
        if (basketItem) {
          basketItem.remove();
          calculateAndDisplayTotalPrice();
        }
      }
    });
    document.addEventListener('click', function (event) {
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



















