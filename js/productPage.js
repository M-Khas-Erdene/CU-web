import Product from './Product.js'; // Assuming Product.js is in the same directory as home.js
import  {openPopup,ClosePopup,findProductByMore,isPriceInRange} from './utils.js';
import BasketItem from './BasketItem.js';
import {updateURL,productURL,searchURL,getURLSearchParameters,getURLParameters} from './URL.js';
import {calculateAndDisplayTotalPrice} from './totalPrice.js';
import  {initializeSearch,searchProductsHome,searchProducts} from './filter.js';
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function () {
    const filterBtn=document.getElementById('filterButton');
    if(filterBtn){
      const selectedType = document.getElementById('filterType').value;
    const selectedPrice = document.getElementById('filterPrice').value;

    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const ProductsContainer = document.getElementById('Products');
        ProductsContainer.innerHTML = ''; // Clear previous content

        const filteredProductsHTML = data.productDatas
          .filter(({ type, Price }) =>
            (selectedType === '' || type === selectedType) &&
            (selectedPrice === '' || (Price !== undefined && isPriceInRange(parseInt(Price.replace('₮', '')), selectedPrice)))
          )
          .map(productInfo => {
            const product = new Product(...Object.values(productInfo));
            return product.generateHTML();
          })
          .join('');

        ProductsContainer.insertAdjacentHTML('beforeend', filteredProductsHTML);

        // Update URL with selected parameters
        updateURL(selectedType, selectedPrice);
      })
      .catch(error => console.error('Error fetching data:', error));
    }
    
  });

  // Initial load without clicking the filter button
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const ProductsContainer = document.getElementById('Products');
      const basketContainer=document.getElementById('basketItems');
      const allProductsHTML = data.productDatas.map(productInfo => {
        const product = new Product(...Object.values(productInfo));
        return product.generateHTML();
      })
      .join('');
      ProductsContainer.insertAdjacentHTML('beforeend', allProductsHTML);

      // Get initial URL parameters and update the URL
      const { selectedType, selectedPrice } = getURLParameters();
      updateURL(selectedType, selectedPrice);

      document.addEventListener('click', function (event) {
        if (event.target.classList.contains('popup-button')) {
          const productId = event.target.id;
          event.preventDefault();
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
          const productId = findProductByMore(event.target.dataset.element, data.productDatas);
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
        if (event.target.classList.contains('removeItem')) {
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
      
      
    })
    .catch(error => console.error('Error fetching data:', error));
});
