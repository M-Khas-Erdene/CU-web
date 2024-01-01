



function updateURL(selectedType, selectedPrice) {
    console.log('Updating URL for product:', selectedPrice);
    const params = new URLSearchParams(window.location.search);
  
    if (selectedType) {
      params.set('type', selectedType);
    } else {
      params.delete('type');
    }
  
    if (selectedPrice) {
      params.set('price', selectedPrice);
    } else {
      params.delete('price');
    }
  
    const newURL = `${window.location.pathname}?${params.toString()}`;
  
    history.pushState({}, '', newURL);
  }
function getURLParameters() {
    const params = new URLSearchParams(window.location.search);
    const selectedType = params.get('type') || '';
    const selectedPrice = params.get('price') || '';
  
    return { selectedType, selectedPrice };
  }

// neegdsn buteegdehuunii url uusgeh function
function productURL(productId){
    console.log('Updating URL for product:', productId);
const params = new URLSearchParams(window.location.search.slice(1));

if (productId) {
  params.set('product', productId);
} else {
  params.delete('product');
}

const newURL = `${window.location.pathname}?${params.toString()}`;

// Update the URL without triggering a page reload
history.pushState({}, '', newURL);
}
function searchURL(key, value) {
    const params = new URLSearchParams(window.location.search);
  
    // Update or add the search query to URL parameters
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  
    const newURL = `${window.location.pathname}?${params.toString()}`;
  
    // Update the URL without triggering a page reload
    history.pushState({}, '', newURL);
  }
  function getURLSearchParameters(){
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search') || '';
  
    return { search };
  }

  export {updateURL,productURL,searchURL,getURLSearchParameters,getURLParameters}