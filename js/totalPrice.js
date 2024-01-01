 export function calculateAndDisplayTotalPrice() {
        
         
    const basketItems = document.querySelectorAll('.basketItem');
  
    const totalPriceElement = document.getElementById('totalPrice');
    const totalPrice = Array.from(basketItems).reduce((total, basketItem) => {
      const countElement = basketItem.querySelector('[data-count="basketCount"]');
      const priceElement = basketItem.querySelector('.nogoon');
      const count = countElement ? parseInt(countElement.textContent) || 0 : 0;
      const price = priceElement ? parseInt(priceElement.textContent) || 0 : 0;
  
      return total + count * price;
    }, 0);
  
    totalPriceElement.textContent = `${totalPrice}`;
  }