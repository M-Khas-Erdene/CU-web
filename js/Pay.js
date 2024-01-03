import BasketItem from './BasketItem.js';
import {calculateAndDisplayTotalPrice} from './totalPrice.js';
document.getElementById('paymentButton').addEventListener('click', function() {
  showCenteredAlert('Төлбөр амжилттай');
});

function showCenteredAlert(message) {
  var overlay = document.getElementById('overlay');
  var alertBox = document.getElementById('alertBox');
  var alertMessage = document.getElementById('alertMessage');
  var okButton = document.getElementById('okButton');

  alertMessage.innerHTML = message;
  overlay.style.display = 'flex';

  okButton.addEventListener('click', function() {
      window.location.href = 'index.html';
  });
}

document.getElementById('okButton').addEventListener('click', async function() {
  await deleteAllProducts();
  window.location.href = 'index.html';
});

async function deleteAllProducts() {
  try {
    const response = await fetch('http://localhost:5000/products/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('All products deleted successfully.');
    } else {
      console.error('Failed to delete all products. HTTP status:', response.status);
    }
  } catch (error) {
    console.error('Error deleting all products:', error);
  }
}
document.addEventListener('DOMContentLoaded', function () {
  const paymentButton = document.getElementById('paymentButton');
  paymentButton.addEventListener('click', getUserData);
  paymentData = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    eMail: '',
    address: '',
    description: '',
    concatenatedString:'',
    totalPrice: 0
};
});
let totalPrice = 0;
let paymentData;
let concatenatedString;
let products=[];
document.addEventListener('DOMContentLoaded',async function () {
  let basketContainer;
  let productsData;
  let productId;
  let formattedProducts;

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
    const product = {
      productName: itemData.name,
      productCount: itemData.count
    };

    products.push(product);
  });
  formattedProducts = products.map(product => {
    return `${product.productName} x ${product.productCount}`;
  });
  concatenatedString = formattedProducts.join(' ');
  console.log("concatenatedString",concatenatedString);
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
  async function getUserData() {
    var form = document.getElementById('orderForm');
    var formData = new FormData(form);

    paymentData.firstName = formData.get('firstName');
    paymentData.lastName = formData.get('lastName');
    paymentData.phoneNumber = formData.get('phoneNumber');
    paymentData.eMail = formData.get('eMail');
    paymentData.address = formData.get('address');
    paymentData.description = formData.get('description');
    paymentData.totalPrice = totalPrice;
    paymentData.concatenatedString = concatenatedString;
    try {
      const response = await fetch('http://localhost:5000/private', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
      });

      if (response.ok) {
          console.log('Payment data inserted successfully.');
      } else {
          console.error('Failed to insert payment data. HTTP status:', response.status);
      }
  } catch (error) {
      console.error('Error inserting payment data:', error);
  }
}