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
    {  name: 'Choco melon', description: 'Double choco melon pan 100гр',  Price: '2750₮', image: 'product5.png',discount: '50%',discountingPrice: '5500₮' },
    {  name: 'Coffee cream pan', description: 'Coffee cream pan 100гр', Price: '5500₮', image: 'product6.png',discount: '1+1' },
    { name: 'Мөстэй американо', description: 'CU 120гр', Price: '3150₮', image: 'Product7.png', discount: '30%', discountingPrice: '4500₮' },
    { name: 'Алаг донат', description: 'CU 80гр', discountedPrice: '3500₮', image: 'product8.png',discount: '1+1' },
];
const productData = [
    {  name: 'Choco melon', description: 'Double choco melon pan 100гр',  Price: '2750₮', image: 'product5.png',discount: '50%',discountingPrice: '5500₮' },
    {  name: 'Coffee cream pan', description: 'Coffee cream pan 100гр', Price: '5500₮', image: 'product6.png',discount: '1+1' },
    { name: 'Мөстэй американо', description: 'CU 120гр', Price: '3150₮', image: 'Product7.png', discount: '30%', discountingPrice: '4500₮' },
    { name: 'Алаг донат', description: 'CU 80гр', discountedPrice: '3500₮', image: 'product8.png',discount: '1+1' },
    {  name: 'Choco melon', description: 'Double choco melon pan 100гр',  Price: '2750₮', image: 'product5.png',discount: '50%',discountingPrice: '5500₮' },
    {  name: 'Coffee cream pan', description: 'Coffee cream pan 100гр', Price: '5500₮', image: 'product6.png',discount: '1+1' },
    { name: 'Мөстэй американо', description: 'CU 120гр', Price: '3150₮', image: 'Product7.png', discount: '30%', discountingPrice: '4500₮' },
    { name: 'Алаг донат', description: 'CU 80гр', discountedPrice: '3500₮', image: 'product8.png',discount: '1+1' },
];


class Product {
    constructor(name, description, Price, image, discount, discountingPrice) {
      this.discount = discount||null;
      this.name = name;
      this.description = description;
      this.discount = discount;
      this.Price = Price ||null;
      this.discountingPrice = discountingPrice;
      this.image = image;
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
        `;
      
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