import Product from './Product.js'; // Assuming Product.js is in the same directory as home.js
import  {openPopup,ClosePopup,findProductByMore,isPriceInRange} from './utils.js';
import BasketItem from './BasketItem.js';
import {updateURL,productURL,searchURL,getURLSearchParameters,getURLParameters} from './URL.js';
import { calculateAndDisplayTotalPrice } from './totalPrice.js';


document.addEventListener('DOMContentLoaded', async function () {
  let basketContainer;
  let productId; 

  try {
    const [promotionData, productData] = await Promise.all([
      fetch('data.json').then(response => response.json()),
      fetch('data.json').then(response => response.json())
    ]);

    basketContainer = document.getElementById('basketItems');
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

    document.addEventListener('click', async function (event) {
      if (event.target.classList.contains('popup-button')) {
        const productId = event.target.id;
        openPopup(productId);
        productURL(productId);
      }

      if (event.target.classList.contains('close-popup')) {
        ClosePopup();
        productURL('');
      }

      if (event.target.classList.contains('b')) {
        productId = findProductByMore(event.target.dataset.element, promotionData.promotionData.concat(productData.productData));
        const moreValue = event.target.dataset.element;
    
        if (productId) {
          basketContainer.innerHTML += new BasketItem(...Object.values(productId)).generateBasketItems();
          setCounter(moreValue);
          alert('Бүтээгдэхүүн амжилттай сагсанд нэмлээ!');
          calculateAndDisplayTotalPrice();
    
          try {
            const response = await fetch('http://localhost:5000/products', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(productId),
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
      console.log('Sending data to the server:', JSON.stringify(productId));

      if (event.target.classList.contains('removeItem')) {
        const basketItem = event.target.closest('.basketItem');
        if (basketItem) {
          basketItem.remove();
          calculateAndDisplayTotalPrice();
        }
      }

      if (event.target.tagName === 'BUTTON' && event.target.dataset.count) {
        const action = event.target.dataset.count === 'increment' ? 'increment' : 'decrement';
        const moreValue = event.target.parentElement.parentElement.querySelector('.b').dataset.element;
        updateCounter(action, moreValue);
      }
    });
    document.addEventListener('DOMContentLoaded', async function(){
      const {search}=getURLSearchParameters();
      if(search != null && search !==undefined && search !== ''){
        document.getElementById('searchInput').value=search;
      }
      const searchInput = document.getElementById('searchInput').value.toLowerCase();
      const searchResults = document.getElementById('searchResults');
      const searchHeading = document.getElementById('searchH2');
      searchHeading.textContent='Хайлтын илэрц';
      
    
      const filteredProducts = productData.productDatas.filter(product => {
        return product.name.toLowerCase().includes(searchInput);
      });

      searchResults.className = 'products';
      searchResults.style.marginLeft = '10%';
      searchResults.style.marginRight = '10%'; 



      const filteredProductElements = filteredProducts.map(productInfo => {
        const product = new Product(...Object.values(productInfo));
        return product.generateHTML();
      });
      if(searchInput != ""){
        searchResults.innerHTML = filteredProductElements.join('');
      } else{
        searchResults.innerHTML='';
        searchHeading.textContent='';
      }
      searchURL('search',searchInput);
      });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});