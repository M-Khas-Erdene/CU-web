import Product from './Product.js';
import {updateURL,productURL,searchURL,getURLSearchParameters,getURLParameters} from './URL.js'




function initializeSearch() {
  let jsonData;
 
  document.addEventListener('DOMContentLoaded', async function () {
    jsonData = await fetch('data.json').then(response => response.json());
    const { search } = getURLSearchParameters();

    if (search !== null && search !== undefined && search !== '') {
      document.getElementById('searchInput').value = search;
    }

    searchProductsHome();
  });
    document.addEventListener('DOMContentLoaded', async function () {
    jsonData = await fetch('data.json').then(response => response.json());
    const { search } = getURLSearchParameters();

    if (search !== null && search !== undefined && search !== '') {
      document.getElementById('searchInput').value = search;
    }

    searchProducts();
  });

}


function searchProducts() {
  if (!jsonData) {
    console.error('jsonData is not defined.');
    return;
  }
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const searchResults = document.getElementById('searchResults');
  const searchHeading = document.getElementById('searchH2');
  searchHeading.textContent='Хайлтын илэрц';
  
 
  const filteredProducts = jsonData.productDatas.filter(product => {
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
}




function searchProductsHome() {
  if (!jsonData) {
    console.error('jsonData is not defined.');
    return;
  }

  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const searchResults = document.getElementById('searchResultsHome');
  const searchHeading = document.getElementById('searchH2');
  searchHeading.textContent='Хайлтын илэрц';
  const filteredPromotionProducts = jsonData.promotionData.filter(product => {
    return product.name.toLowerCase().includes(searchInput);
  });

  const filteredProductData = jsonData.productData.filter(product => {
    return product.name.toLowerCase().includes(searchInput);
  });

  const filteredProducts = [...filteredPromotionProducts, ...filteredProductData];
  searchResults.className = 'products';
  searchResults.style.marginLeft = '10%';
  searchResults.style.marginRight = '10%';
  searchResults.style.marginBottom = '20px';
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
  searchURL('search', searchInput);
}
export {initializeSearch,searchProductsHome,searchProducts}