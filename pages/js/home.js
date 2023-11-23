
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

// Sample data for promotion products
const promotionData = [
  {  name: 'Choco melon', description: 'Double choco melon pan 100гр',  Price: '2750₮', image: 'product5.png',discount: '50%',discountingPrice: '5500₮',manufacturer:'apu',weight:'100гр',expiration:'unuudur',ingredients:'uzem talh',instructions:'unuuudur',storage:'udurtu herglne' },
  {  name: 'Coffee cream pan', description: 'Coffee cream pan 100гр', Price: '5500₮', image: 'product6.png',discount: '1+1',manufacturer:'apu',weight:'100гр',expiration:'unuudur',ingredients:'uzem talh',instructions:'unuuudur',storage:'udurtu herglne'  },
  { name: 'Мөстэй американо', description: 'CU 120гр', Price: '3150₮', image: 'Product7.png', discount: '30%', discountingPrice: '4500₮',manufacturer:'apu',weight:'100гр',expiration:'unuudur',ingredients:'uzem talh',instructions:'unuuudur',storage:'udurtu herglne'  },
  { name: 'Алаг донат', description: 'CU 80гр', discountedPrice: '3500₮', image: 'product8.png',discount: '1+1',manufacturer:'apu',weight:'100гр',expiration:'unuudur',ingredients:'uzem talh',instructions:'unuuudur',storage:'udurtu herglne'  },
];
const productData = [
  {  name: 'Choco melon', description: 'Double choco melon pan 100гр',  Price: '2750₮', image: 'product5.png',discount: '50%',discountingPrice: '5500₮' ,manufacturer:'apu',weight:'100гр',expiration:'unuudur',ingredients:'uzem talh',instructions:'unuuudur',storage:'udurtu herglne' },
  {  name: 'Coffee cream pan', description: 'Coffee cream pan 100гр', Price: '5500₮', image: 'product6.png',discount: '1+1',manufacturer:'apu',weight:'100гр',expiration:'unuudur',ingredients:'uzem talh',instructions:'unuuudur',storage:'udurtu herglne'  },
  { name: 'Мөстэй американо', description: 'CU 120гр', Price: '3150₮', image: 'Product7.png', discount: '30%', discountingPrice: '4500₮' ,manufacturer:'apu',weight:'100гр',expiration:'unuudur',ingredients:'uzem talh',instructions:'unuuudur',storage:'udurtu herglne' },
  { name: 'Алаг донат', description: 'CU 80гр', discountedPrice: '3500₮', image: 'product8.png',discount: '1+1',manufacturer:'apu',weight:'100гр',expiration:'unuudur',ingredients:'uzem talh',instructions:'unuuudur',storage:'udurtu herglne'  },
  {  name: 'Choco melon', description: 'Double choco melon pan 100гр',  Price: '2750₮', image: 'product5.png',discount: '50%',discountingPrice: '5500₮',manufacturer:'apu',weight:'100гр',expiration:'unuudur',ingredients:'uzem talh',instructions:'unuuudur',storage:'udurtu herglne'  },
  {  name: 'Coffee cream pan', description: 'Coffee cream pan 100гр', Price: '5500₮', image: 'product6.png',discount: '1+1' ,manufacturer:'apu',weight:'100гр',expiration:'unuudur',ingredients:'uzem talh',instructions:'unuuudur',storage:'udurtu herglne' },
  { name: 'Мөстэй американо', description: 'CU 120гр', Price: '3150₮', image: 'Product7.png', discount: '30%', discountingPrice: '4500₮',manufacturer:'apu',weight:'100гр',expiration:'unuudur',ingredients:'uzem talh',instructions:'unuuudur',storage:'udurtu herglne'  },
  { name: 'Алаг донат', description: 'CU 80гр', discountedPrice: '3500₮', image: 'product8.png',discount: '1+1',manufacturer:'apu',weight:'100гр',expiration:'unuudur',ingredients:'uzem talh',instructions:'unuuudur',storage:'udurtu herglne'  },
];

class Product {
    constructor(name, description, Price, image, discount, discountingPrice,manufacturer,weight,expiration,ingredients,instructions,storage) {
      this.discount = discount||null;
      this.name = name;
      this.description = description;
      this.discount = discount;
      this.Price = Price ||null;
      this.discountingPrice = discountingPrice;
      this.image = image;
      this.manufacturer=manufacturer;
      this.weight=weight;
      this.expiration=expiration;
      this.ingredients=ingredients;
      this.instructions=instructions;
      this.storage=storage;
    }
    


    generateHTML() {
        let html = `
          <article class="product">
          `;
            
            if (this.discount != null) {
                html += `<span>${this.discount}</span>`;
              }
            html += `
            <a href="Product.html">
              <img src="assets/png/${this.image}" alt="${this.name}">
              <h3>${this.name}</h3>
            </a>
            <p>${this.description}</p>
            
            `;
      
        if (this.discountingPrice != null) {
          html += `<p class="discount">${this.discountingPrice}</p>`;
        }
      
        html += `
            <strong>${this.Price}</strong>
            <button>Сагслах</button>
          </article>
          <div class="productGet">
          <div class="productExit">
              <span id="btnClose" class>&times;</span>
          </div>
          <article class="productDescription">
              <h2>${this.name}</h2>
              <div class="productPrice">
                  <h2>${this.Price}</h2>
                  <h2>${this.Price}</h2>
              </div>
              <div class="productDetails">
                  <p>${this.manufacturer}:</p>
                  <p>${this.weight}:</p>
                  <p>${this.expiration}:</p>
                  <p>${this.ingredients}:</p>
                  <p>${this.instructions}:</p>
                  <p>${this.storage}:</p>
              </div>
              <div class="buttons">
                  <button>авах</button>
                  <button>❤️</button>
                  <button>Сагслах</button>
                  <div class="productAdd">
                      <button>+</button>
                      <button>0</button>
                      <button>-</button>
                  </div>
              </div>
          </article>
          <figure><img src="assets/png/product1.png" alt=""></figure>
      </div>`
        ;
      
        return html;
      }
  }


  document.addEventListener('DOMContentLoaded', function () {
    const promotionProductsContainer = document.getElementById('promotionProducts');
      promotionData.forEach(productInfo => {
      const product = new Product(...Object.values(productInfo));
      promotionProductsContainer.insertAdjacentHTML('beforeend', product.generateHTML());
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    const promotionProductsContainer = document.getElementById('normalProducts');
    productData.forEach(productInfo => {
      const product = new Product(...Object.values(productInfo));
      promotionProductsContainer.insertAdjacentHTML('beforeend', product.generateHTML());
    });
  });


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