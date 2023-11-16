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
const promotionProductsData = [
    { discount: '50%', name: 'Choco melon', description: 'Double choco melon pan 100гр', originalPrice: '5500₮', discountedPrice: '2750₮', image: 'product5.png' },
    { discount: '1+1', name: 'Coffee cream pan', description: 'Coffee cream pan 100гр', originalPrice: '5500₮', discountedPrice: '5500₮', image: 'product6.png' },
    { discount: '30%', name: 'Мөстэй американо', description: 'CU 120гр', originalPrice: '4500₮', discountedPrice: '3150₮', image: 'Product7.png' },
    { discount: '1+1', name: 'Алаг донат', description: 'CU 80гр', originalPrice: '3500₮', discountedPrice: '3500₮', image: 'product8.png' },
];

// Function to generate product HTML
function generateProductHTML(product) {
    return `
        <article class="product">
            <span>${product.discount}</span>
            <a href="Product.html">
                <img src="assets/png/${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
            </a>
            <p>${product.description}</p>
            <p class="discount">${product.originalPrice}</p>
            <strong>${product.discountedPrice}</strong>
            <button>Сагслах</button>
        </article>
    `;
}

// Function to populate products in a given container
function populateProducts(containerId, productsData) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = productsData.map(generateProductHTML).join('');
    }
}

// Populate promotion products
populateProducts('promotionProducts', promotionProductsData);
