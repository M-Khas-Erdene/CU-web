const productQuantities = {};
function updateCounter(action, moreValue) {
  const countElement = document.querySelector(`[data-count="${moreValue}"]`);
  
  if (countElement) {
    let count = parseInt(countElement.textContent);

    if (action === 'increment') {
      count++;
    } else if (action === 'decrement' && count > 1) {
      count--;
    }
    countElement.textContent = count;

    // Update the global variable with the latest count
    productQuantities[moreValue] = count;
  }
}
function setCounter(productId){
    const countElement = document.querySelector(`[data-count="${productId}"]`);

    if(productId){
        let count=parseInt(countElement.textContent);
        count=1;
        countElement.textContent=count;
    }
}
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
let jsonData;

        document.addEventListener('DOMContentLoaded', async function () {
            try {
                // Fetch data from data.json
                const response = await fetch('data.json');
                jsonData = await response.json();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });

        function searchProductsHome() {
            if (!jsonData) {
                console.error('jsonData is not defined.');
                return;
            }

            const searchInput = document.getElementById('searchInput').value.toLowerCase();
            const searchResults = document.getElementById('searchResultsHome');
            const searchHeading = document.getElementById('searchH2');
            searchHeading.textContent = 'Хайлтын илэрц';

            // Filter products based on the search input
            const filteredProducts = jsonData.productData.filter(product => {
                return product.name.toLowerCase().includes(searchInput);
            });

            searchResults.className = 'products';
            searchResults.style.marginLeft = '10%';
            searchResults.style.marginRight = '10%';
            searchResults.style.marginBottom = '20px';

            // Generate HTML for filtered products
            const filteredProductElements = filteredProducts.map(productInfo => {
                const product = new Product(...Object.values(productInfo));
                return product.generateHTML();
            });

            // Display the results in the searchResultsHome container
            if (searchInput !== "") {
                searchResults.innerHTML = filteredProductElements.join('');
            } else {
                searchResults.innerHTML = '';
                searchHeading.textContent = '';
            }
        }
    