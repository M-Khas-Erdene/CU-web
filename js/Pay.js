let totalPrice = 0;
document.addEventListener('DOMContentLoaded', function () {
    displayProductsInSubbody();
});
export async function displayProductsInSubbody() {
  try {
    const response = await fetch('http://localhost:5000/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Products retrieved successfully.');
      const productsData = await response.json();
      displayProducts(productsData);
    } else {
      console.error('Failed to retrieve products. HTTP status:', response.status);
    }
  } catch (error) {
    console.error('Error retrieving products:', error);
  }
}

function displayProducts(productsData) {
  const subbodyContainer = document.querySelector('.subbody');
  totalPrice = 0;

  productsData.forEach(itemData => {
    const productHTML = createProductHTML(itemData);
    subbodyContainer.innerHTML += productHTML;
    const numericPrice = parseFloat(itemData.price.replace('₮', ''));
    totalPrice += numericPrice;
  });
  calculateTotalPrice();
}

function createProductHTML(itemData) {
  return `
    <div class="rowflex">
        <p><span>${itemData.name}</span></p>
        <p><span>${itemData.price}</span></p>

    </div>
  `;
}
function calculateTotalPrice() {
    const totalPriceElement = document.querySelector('.niit');
      totalPriceElement.textContent = totalPrice;
  }