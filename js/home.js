
let currentSlide = 0;
const slides = [
  "assets/png/frontImage1.png",
  "assets/png/frontImage2.png",
  "assets/png/frontImage3.png",
];

function showSlide() {
  const slideshowImage = document.getElementById("slideshow");
  slideshowImage.style.opacity = 0; 
  setTimeout(() => {
    slideshowImage.src = slides[currentSlide];
    slideshowImage.style.opacity = 1; 
  }, 500); 
}

function plusSlides(n) {
  currentSlide += n;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  } else if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  showSlide();
}



class Product {
  constructor(name, description, Price, image, discount, discountingPrice, manufacturer, weight, expiration, ingredients, instructions, storage, More,type) {
    this.discount = discount || null;
    this.name = name;
    this.description = description;
    this.discount = discount;
    this.Price = Price || null;
    this.discountingPrice = discountingPrice;
    this.image = image;
    this.manufacturer = manufacturer;
    this.weight = weight;
    this.expiration = expiration;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.storage = storage;
    this.More = More;
    this.type = type||null;
  }

  generateHTML() {
    let html = `
          <article class="product" >
          `;
            
            if (this.discount != "") {
                html += `<span>${this.discount}</span>`;
              }
            html += `
            <div >
              <img src="assets/png/${this.image}" alt="${this.name}">
              <h3>${this.name}</h3>
            </div>
            <p>${this.description}</p>
            
            `;
      
        if (this.discountingPrice != "") {
          html += `<p class="discount">${this.discountingPrice}</p>`;
        }
      
        html += `
            <strong>${this.Price}</strong>
              <button class="popup-button" id="${this.More}">Үзэх</button>
          </article>
        `
        ;
        html +=`
        <div class="productGet" data-id="${this.More}">
        <div class="productExit">
            <span class="close-popup">&times;</span>
        </div>
        <figure>`
        if(this.discountingPrice != ""){
          html+=`<figcaption><span>${this.discount}</span></figcaption>`;
        }html+=`
        
        <img src="assets/png/${this.image}" alt="">
         
        </figure>
        <article class="productDescription">
          <h2>${this.name}</h2>
            <div class="productPrice">
                <h2 class="discountingPrice">${this.discountingPrice}</h2>
                <h2 class="normalPrice">${this.Price}</h2>
            </div>
            <div class="productDetails">
                <p>Үйлдвэрлэгч:${this.manufacturer}</p>
                <p>Жин:${this.weight}</p>
                <p>Дуусах хугацаа:${this.expiration}</p>
                <p>Орц:${this.ingredients}</p>
                <p>Хэргэлэх Заавар${this.instructions}</p>
                <p>Хадгалах горим:${this.storage}</p>
            </div>
            <div class="buttons">
                <div class="b-productAdd"> 
                <button class="b">Сагслах</button>
                <div class="productAdd">
                    <button onclick="updateCounter('increment',1)">+</button>
                    <p id="basketCount${this.More}">0</p>
                    <button onclick="updateCounter('decrement',1)">-</button>
                </div>
                </div>
            </div>
        </article>
       
    </div>`
        return html 
  }
  generateBasket(){
    html=`<div class="basketItem">
    <div class="itemDetails">
        <img src="assets/png/product2.png" alt="Bingsu">
        <article >
            <h3>Бингсү</h3>
            <p><span>5</span> x <span class="nogoon">7500₮</span></p>
        </article>
    </div>
    <div class="removeItem">&times;</div>
</div>`
    return html
  }


}
// var counter=0;
// function updateCounter(action,productId){
//   var counterElement=documnet.getElementById(productId);
//   if(action === 'increment'){
//     counter++;
//   }else if(action === 'decrement' && counter>0){
//     counter--;
//   }
//   counterElement.innerText=counter;
// }





document.addEventListener('DOMContentLoaded', async function () {
  try {
    const [promotionData, productData] = await Promise.all([
      fetch('data.json').then(response => response.json()),
      fetch('data.json').then(response => response.json())
    ]);

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

  } catch (error) {
    console.error('Error fetching data:', error);
  }
});


document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('filterButton').addEventListener('click', function () {
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

        addProductEventListeners(ProductsContainer);

        // Update URL with selected parameters
        updateURL(selectedType, selectedPrice);
      })
      .catch(error => console.error('Error fetching data:', error));
  });

  // Initial load without clicking the filter button
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const ProductsContainer = document.getElementById('Products');

      const allProductsHTML = data.productDatas.map(productInfo => {
        const product = new Product(...Object.values(productInfo));
        return product.generateHTML();
      })
      .join('');

      ProductsContainer.insertAdjacentHTML('beforeend', allProductsHTML);

      addProductEventListeners(ProductsContainer);

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
    })
    .catch(error => console.error('Error fetching data:', error));
});

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

function addProductEventListeners(container) {
  container.querySelectorAll('.b').forEach(button => {
    button.addEventListener('click', function (event) {
      // Your logic for handling '.b' class clicks
    });
  });
}

function getURLParameters() {
  const params = new URLSearchParams(window.location.search);
  const selectedType = params.get('type') || '';
  const selectedPrice = params.get('price') || '';

  return { selectedType, selectedPrice };
}

function isPriceInRange(productPrice, selectedPriceRange) {
  if (selectedPriceRange === '') {
    return true;
  }
  const [min, max] = selectedPriceRange.split('-').map(Number);
  return productPrice >= min && productPrice <= max;
}



// Helper function to check if the price is in the selected range
function isPriceInRange(productPrice, selectedPriceRange) {
  if (selectedPriceRange === '') {
    return true; // If "All Prices" is selected, don't filter by price
  }
  const [min, max] = selectedPriceRange.split('-').map(Number);
  return productPrice >= min && productPrice <= max;
}
  function openPopup(productId){
    const popup=document.querySelector(`.productGet[data-id="${productId}"]`);
    if(popup){
      popup.classList.add('active');
      backdrop.classList.add('show');
    }
  }
  function ClosePopup(){
    const activePopup=document.querySelector(`.productGet.active`);
    if(activePopup){
      activePopup.classList.remove('active');
      backdrop.classList.remove('show');
    }
  }
function productURL(productId) {
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

  document.addEventListener("DOMContentLoaded", function () {
        const carousel = document.querySelector(".carousel");
        let currentIndex = 0;

        function showImage(index) {
            const totalImages = document.querySelectorAll(".carousel img").length;
            index = (index + totalImages) % totalImages;
            const translateValue = -index * 100 + "%"; /* Change from 10% to 100% for proper image translation */
            carousel.style.transform = "translateX(" + translateValue + ")";
            currentIndex = index;
        }

        // Function to handle next button click
        function nextImage() {
            showImage(currentIndex + 1);
        }

        // Function to handle previous button click
        function prevImage() {
            showImage(currentIndex - 1);
        }

        // Set up event listeners for next and previous buttons
        document.querySelector(".nex").addEventListener("click", nextImage);
        document.querySelector(".pre").addEventListener("click", prevImage);
    });
//sagsand baraa hiih code 





// sagsni neegdej haagdah code
const openBtn=document.getElementById('openBasketBtn');
const basket=document.getElementById('sideBasket');
const closeBtn=document.getElementById('btnClose');
const backdrop=document.querySelector('.backDrop');

openBtn.addEventListener('click',openBasket);
closeBtn.addEventListener('click',closeBasket);

function openBasket(){
    basket.classList.add('open');
    backdrop.classList.add('show');
}

function closeBasket(){
    basket.classList.remove('open');
    backdrop.classList.remove('show');
}




let jsonData;

document.addEventListener('DOMContentLoaded', async function () {
  jsonData = await fetch('data.json').then(response => response.json());

});

function searchProducts() {
  if (!jsonData) {
    console.error('jsonData is not defined.');
    return;
  }
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const searchResults = document.getElementById('searchResults');
  const searchHeading = document.getElementById('searchH2');
  searchHeading.textContent = 'Хайлтын илэрц';
  searchResults.innerHTML = '';
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
  searchResults.innerHTML = filteredProductElements.join('');
}




function searchProductsHome() {
  if (!jsonData) {
    console.error('jsonData is not defined.');
    return;
  }

  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const searchResults = document.getElementById('searchResultsHome');
  const searchHeading = document.getElementById('searchH2');
  searchHeading.textContent = 'Хайлтын илэрц';
  searchResults.innerHTML = '';
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

  searchResults.innerHTML = filteredProductElements.join('');
  searchURL('search', searchInput);
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



// service svg nuud
document.addEventListener('DOMContentLoaded', function () {
  const carouselContainer = document.getElementById('serviceCarousel');
  const numImages = 5;
  const numRepeats = 4; // Number of times to repeat the images

  for (let i = 0; i < numRepeats; i++) {
    for (let j = 1; j <= numImages; j++) {
      const img = document.createElement('img');
      img.src = `assets/svg/service${j}.svg`;
      img.alt = `service${j}`;
      carouselContainer.appendChild(img);
    }
  }

  carouselContainer.classList.add('carousel'); // Add the carousel class

  // Optionally, you can add your carousel initialization logic here
});
