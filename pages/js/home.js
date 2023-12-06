
let currentSlide = 0;
const slides = [
    "assets/png/frontImage1.png",
    "assets/png/frontImage2.png",
    "assets/png/frontImage3.png",
];

function showSlide() {
    document.getElementById("slideshow").src = slides[currentSlide];
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
            <div id='${this.More}'>
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
                <div class="b-favouriteProduct"><button class="b">авах</button>
                <button class="favouriteProduct"><i class="fa fa-heart" class="fa fa-heart" aria-hidden="true"></i></button></div>
                <div class="b-productAdd"> <button class="b">Сагслах</button>
                <div class="productAdd">
                    <button>+</button>
                    <button>0</button>
                    <button>-</button>
                </div></div>
            </div>
        </article>
       
    </div>`
        return html

  
    
  }
}
document.addEventListener('DOMContentLoaded', function () {
  fetch('data.json')
      .then(response => response.json())
      .then(data => {

          const promotionProductsContainer = document.getElementById('promotionProducts');
          data.promotionData.forEach(productInfo => {
              const product = new Product(...Object.values(productInfo));
              promotionProductsContainer.insertAdjacentHTML('beforeend', product.generateHTML());
          });
          document.addEventListener('click', function (event) {
              if (event.target.classList.contains('popup-button')) {
                  const productId = event.target.id;
                  openPopup(productId);
              }
          });

          document.addEventListener('click', function (event) {
              if (event.target.classList.contains('close-popup')) {
                  ClosePopup();
              }
          });
      })
      .catch(error => console.error('Error fetching data:', error));
});
document.addEventListener('DOMContentLoaded', function () {
  fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const normalProductsContainer = document.getElementById('normalProducts');
        data.productData.forEach(productInfo => {
            const product = new Product(...Object.values(productInfo));
            normalProductsContainer.insertAdjacentHTML('beforeend', product.generateHTML());
        });
          document.addEventListener('click', function (event) {
              if (event.target.classList.contains('popup-button')) {
                  const productId = event.target.id;
                  openPopup(productId);
              }
          });

          document.addEventListener('click', function (event) {
              if (event.target.classList.contains('close-popup')) {
                  ClosePopup();
              }
          });
      })
      .catch(error => console.error('Error fetching data:', error));
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

        data.productDatas
          .filter(({ type, Price }) =>
            (selectedType === '' || type === selectedType) &&
            (selectedPrice === '' || (Price !== undefined && isPriceInRange(parseInt(Price.replace('₮', '')), selectedPrice)))
          ) // Filter based on selectedType and selectedPrice
          .forEach(productInfo => {
            const product = new Product(...Object.values(productInfo));
            ProductsContainer.insertAdjacentHTML('beforeend', product.generateHTML());
          });
      })
      .catch(error => console.error('Error fetching data:', error));
  });
});

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


