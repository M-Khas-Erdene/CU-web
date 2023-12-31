import Product from './Product.js'; 
import  {openPopup,ClosePopup,findProductByMore,isPriceInRange} from './utils.js';
import Product from './Product.js'; // Assuming Product.js is in the same directory as home.js
import  {openPopup,ClosePopup,findProductByMore,isPriceInRange,findNum} from './utils.js';
import BasketItem from './BasketItem.js';
import {updateURL,productURL,searchURL,getURLSearchParameters,getURLParameters} from './URL.js';
import {calculateAndDisplayTotalPrice} from './totalPrice.js';
document.addEventListener('DOMContentLoaded', async function () {
  let basketContainer=document.getElementById('basketItems');
  let Data;
  let productId; 
  let quantity;
  //ugugduluu tatj avn
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
  // sags ruu renderlene
  Data.forEach(itemData => {
    basketContainer.innerHTML += new BasketItem(...Object.values(itemData)).generateBasketItems();
    calculateAndDisplayTotalPrice();
    findNum();
  });
  //filter filterbutton deerh
  document.getElementById('filterButton').addEventListener('click', function () {
    const selectedType = document.getElementById('filterType').value;
    const selectedPrice = document.getElementById('filterPrice').value;

    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const ProductsContainer = document.getElementById('Products');
        ProductsContainer.innerHTML = ''; 

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
        updateURL(selectedType, selectedPrice);
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const ProductsContainer = document.getElementById('Products');
      
      
      const allProductsHTML = data.productDatas.map(productInfo => {
        const product = new Product(...Object.values(productInfo));
        return product.generateHTML();
      })
      .join('');
      ProductsContainer.innerHTML = allProductsHTML
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
      document.addEventListener('click', async function (event) {
        if (event.target.classList.contains('b')) {
          const productId = findProductByMore(event.target.dataset.element, data.productDatas);
          const moreValue=event.target.dataset.element;
          const countElement = document.querySelector(`[data-count="${productId.pID}"]`);
          quantity = countElement ? parseInt(countElement.textContent) : 0;
          console.log('quantity:',quantity);
            const newAttributes = {
              count: quantity
            };
          
          const clonedProduct = Object.assign({}, productId, newAttributes);
          // Now you have the product with the specified 'More' attribute
          if (productId) {
            // Do something with the product
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
        
        
      });
      document.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON' && event.target.dataset.count) {
         
            const action = event.target.dataset.count === 'increment' ? 'increment' : 'decrement';
            const moreValue = event.target.parentElement.parentElement.querySelector('.b').dataset.element;
          updateCounter(action, moreValue);    
        }
      });
      document.getElementById('searchInput').addEventListener('input', function (event) {
        const searchInput = event.target;
        const searchResultsHome = document.getElementById('searchResults');
        const searchQuery = searchInput.value.trim().toLowerCase();
    
        // Function to get search parameters from URL
      
    
        // Clear previous search results only if there is no search query
        if (searchQuery === '') {
            searchResultsHome.innerHTML = '';
        } else {
            // Fetch data from data.json
            fetch('data.json')
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data.productDatas)) {
                        const filteredProducts = data.productDatas.filter(itemData => {
                            const productName = itemData.name.toLowerCase();
                            return productName.includes(searchQuery);
                        });
    
                        searchResultsHome.innerHTML = '';
    
                        if (filteredProducts.length > 0) {
                            filteredProducts.forEach(itemData => {
                                const product = new Product(...Object.values(itemData));
                                const productElement = document.createElement('div');
                                productElement.classList.add('searchResultItem');
                                productElement.innerHTML = product.generateHTML();
    
                                productElement.addEventListener('click', function () {
                                    console.log('Selected Product:', itemData);
                                });
    
                                searchResultsHome.appendChild(productElement);
                            });
                        } else {
                            searchResultsHome.innerHTML = '<p>Хайлт олдсонгүй</p>';
                        }
    
                        // Update URL with new search parameter
                        searchURL(searchQuery);
                    } else {
                        console.error('Invalid data structure:', data);
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    });
    
    
    
    
      
    })
    .catch(error => console.error('Error fetching data:', error));
});





